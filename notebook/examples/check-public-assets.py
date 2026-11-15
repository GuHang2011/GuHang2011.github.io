"""Check direct same-origin assets in explicitly selected public HTML pages.

Python 3.10+, standard library only. No recursive crawling or JavaScript execution.
Examples:
  python check-public-assets.py projects.html cases/ai-office/
  python check-public-assets.py --base http://127.0.0.1:8000/ index.html
  python check-public-assets.py https://guhang2011.github.io/project-screenshots.html

Exit codes: 0 = checks passed, 1 = page/asset failure, 2 = invalid arguments.
Responses are sampled, not fully downloaded. CSS imports, srcset, JavaScript-created
URLs, linked pages and media decoding are outside this example's scope.
"""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
import json
from urllib.error import HTTPError, URLError
from urllib.parse import urldefrag, urljoin, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

DEFAULT_BASE = "https://guhang2011.github.io/"
MAX_PAGES = 10
MAX_ASSETS = 200
MAX_HTML_BYTES = 1_000_000
SAMPLE_BYTES = 1024
TIMEOUT_SECONDS = 12


def origin(url: str) -> tuple[str, str, int]:
    parsed = urlsplit(url)
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        raise ValueError("Use an explicit HTTP(S) URL or a page path under --base.")
    if parsed.username or parsed.password:
        raise ValueError("URLs containing credentials are not supported.")
    return parsed.scheme, parsed.hostname.lower(), parsed.port or (443 if parsed.scheme == "https" else 80)


class SameOriginRedirect(HTTPRedirectHandler):
    def __init__(self, allowed: tuple[str, str, int]):
        self.allowed = allowed

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if origin(newurl) != self.allowed:
            raise ValueError("Cross-origin redirect blocked; select that origin explicitly if intended.")
        return super().redirect_request(req, fp, code, msg, headers, newurl)


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.assets: list[tuple[str, str]] = []
        self.base_href: str | None = None

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "base" and self.base_href is None and values.get("href"):
            self.base_href = values["href"]
        if tag in ("img", "script", "source") and values.get("src"):
            self.assets.append((tag, values["src"]))
        if tag == "link" and "stylesheet" in (values.get("rel") or "").lower().split() and values.get("href"):
            self.assets.append(("stylesheet", values["href"]))

    handle_startendtag = handle_starttag


def fetch(opener, url: str, kind: str) -> dict:
    result = {"url": url, "kind": kind, "ok": False}
    request = Request(url, headers={"User-Agent": "portfolio-public-asset-example/1.0", "Cache-Control": "no-cache"})
    try:
        with opener.open(request, timeout=TIMEOUT_SECONDS) as response:
            result["status"] = response.status
            mime = response.headers.get_content_type()
            result["content_type"] = mime
            limit = MAX_HTML_BYTES + 1 if kind == "page" else SAMPLE_BYTES
            data = response.read(limit)
            if kind == "page":
                if len(data) > MAX_HTML_BYTES:
                    raise ValueError("HTML exceeds the 1 MB example limit.")
                if mime not in ("text/html", "application/xhtml+xml"):
                    raise ValueError("Selected page did not return HTML.")
                result["html"] = data.decode(response.headers.get_content_charset() or "utf-8", errors="replace")
                result["final_url"] = response.url
            else:
                if not data:
                    raise ValueError("Empty asset response.")
                if mime in ("text/html", "application/xhtml+xml"):
                    raise ValueError("Asset returned HTML; this can be a fallback page.")
                if kind == "img" and not mime.startswith("image/"):
                    raise ValueError("Image response has an unexpected Content-Type.")
                if kind == "stylesheet" and mime != "text/css":
                    raise ValueError("Stylesheet response is not text/css.")
                result["sampled_bytes"] = len(data)
            result["ok"] = 200 <= response.status < 300
    except HTTPError as exc:
        result.update(status=exc.code, error=f"HTTP {exc.code}")
        exc.close()
    except (URLError, OSError, ValueError, LookupError) as exc:
        result["error"] = str(exc)
    return result


def audit(base: str, pages: list[str]) -> dict:
    allowed = origin(base)
    if not 1 <= len(pages) <= MAX_PAGES:
        raise ValueError(f"Choose between 1 and {MAX_PAGES} pages.")
    selected = list(dict.fromkeys(urldefrag(urljoin(base, page))[0] for page in pages))
    if any(origin(url) != allowed for url in selected):
        raise ValueError("All selected pages must share the --base origin.")
    opener = build_opener(SameOriginRedirect(allowed))
    report = {"base": base, "pages": [], "assets": [], "skipped": [], "failures": []}
    found: dict[str, dict] = {}
    for page in selected:
        result = fetch(opener, page, "page")
        markup = result.pop("html", "")
        report["pages"].append(result)
        if not result["ok"]:
            report["failures"].append(page)
            continue
        parser = AssetParser()
        parser.feed(markup)
        document_base = urljoin(result["final_url"], parser.base_href or "")
        for kind, value in parser.assets:
            if value.startswith(("data:", "blob:", "#")):
                report["skipped"].append({"page": page, "reason": "inline/fragment", "kind": kind})
                continue
            url = urldefrag(urljoin(document_base, value))[0]
            try:
                same_origin = origin(url) == allowed
            except ValueError:
                same_origin = False
            if not same_origin:
                report["skipped"].append({"page": page, "url": url, "reason": "outside selected origin"})
                continue
            if url not in found:
                if len(found) >= MAX_ASSETS:
                    report["failures"].append(f"Asset limit ({MAX_ASSETS}) exceeded; narrow the selected pages.")
                    continue
                found[url] = {"kind": kind, "referenced_by": []}
            if page not in found[url]["referenced_by"]:
                found[url]["referenced_by"].append(page)
    for url, item in found.items():
        result = fetch(opener, url, item["kind"])
        result["referenced_by"] = item["referenced_by"]
        report["assets"].append(result)
        if not result["ok"]:
            report["failures"].append(url)
    report["passed"] = not report["failures"]
    report["scope"] = "Direct HTML asset URLs only; same origin; 1 KB samples; no recursive CSS or browser interaction checks."
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("pages", nargs="*", default=["projects.html", "cases/ai-office/"], help="Explicit public page URLs or paths")
    parser.add_argument("--base", default=DEFAULT_BASE, help="Allowed origin and base URL; localhost is supported for your own preview")
    args = parser.parse_args()
    try:
        report = audit(args.base, args.pages)
    except ValueError as exc:
        parser.error(str(exc))
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
