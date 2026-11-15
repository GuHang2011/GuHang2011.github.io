"""Local HTTP behavior tests; run: python check-public-assets-test.py"""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import importlib.util
from pathlib import Path
import threading
import unittest

spec = importlib.util.spec_from_file_location("asset_check", Path(__file__).with_name("check-public-assets.py"))
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class Handler(BaseHTTPRequestHandler):
    calls = []

    def do_GET(self):
        self.calls.append(self.path)
        routes = {
            "/good/": (200, "text/html", b'<img src="/image.svg#first"><img src="/image.svg#second"><script src="/app.js"></script><link rel="stylesheet" href="/style.css"><img src="https://external.invalid/never-request">'),
            "/bad/": (200, "text/html", b'<img src="/missing.png"><link rel="stylesheet" href="/fallback.css">'),
            "/with-base/": (200, "text/html", b'<base href="/nested/"><img src="image.svg">'),
            "/oversize/": (200, "text/html", b"x" * (checker.MAX_HTML_BYTES + 1)),
            "/image.svg": (200, "image/svg+xml", b'<svg xmlns="http://www.w3.org/2000/svg"/>'),
            "/nested/image.svg": (200, "image/svg+xml", b'<svg xmlns="http://www.w3.org/2000/svg"/>'),
            "/app.js": (200, "text/javascript", b"void 0;"),
            "/style.css": (200, "text/css", b"body{color:black}"),
            "/fallback.css": (200, "text/html", b"<html>fallback</html>"),
        }
        if self.path == "/redirect/":
            self.send_response(302)
            self.send_header("Location", "https://external.invalid/not-followed")
            self.end_headers()
            return
        status, mime, data = routes.get(self.path, (404, "text/plain", b"missing"))
        self.send_response(status)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        try:
            self.wfile.write(data)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def log_message(self, *args):
        pass


class AssetCheckTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        cls.worker = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.worker.start()
        cls.base = f"http://127.0.0.1:{cls.server.server_port}/"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.worker.join()

    def setUp(self):
        Handler.calls.clear()

    def test_deduplicates_assets_and_skips_other_origins(self):
        report = checker.audit(self.base, ["good/", "good/#anchor"])
        self.assertTrue(report["passed"])
        self.assertEqual(len(report["pages"]), 1)
        self.assertEqual(len(report["assets"]), 3)
        self.assertEqual(Handler.calls.count("/image.svg"), 1)
        self.assertEqual(report["skipped"][0]["reason"], "outside selected origin")

    def test_catches_missing_file_and_html_fallback(self):
        report = checker.audit(self.base, ["bad/"])
        self.assertFalse(report["passed"])
        self.assertEqual(len(report["failures"]), 2)
        self.assertEqual(report["assets"][0]["status"], 404)
        self.assertIn("fallback", report["assets"][1]["error"])

    def test_resolves_base_element(self):
        report = checker.audit(self.base, ["with-base/"])
        self.assertTrue(report["passed"])
        self.assertTrue(report["assets"][0]["url"].endswith("/nested/image.svg"))

    def test_rejects_cross_origin_redirect_without_following_it(self):
        report = checker.audit(self.base, ["redirect/"])
        self.assertFalse(report["passed"])
        self.assertIn("Cross-origin redirect", report["pages"][0]["error"])
        self.assertEqual(Handler.calls, ["/redirect/"])

    def test_rejects_large_html_and_outside_page(self):
        report = checker.audit(self.base, ["oversize/"])
        self.assertFalse(report["passed"])
        self.assertIn("1 MB", report["pages"][0]["error"])
        with self.assertRaises(ValueError):
            checker.audit(self.base, ["https://external.invalid/"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
