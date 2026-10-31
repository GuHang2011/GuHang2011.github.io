"""Local static preview with byte ranges, matching GitHub Pages media seeking."""
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def end_headers(self):
        self.send_header('Cache-Control','no-store');self.send_header('Accept-Ranges','bytes');super().end_headers()
    def send_head(self):
        self.byte_count=None
        path=Path(self.translate_path(self.path))
        requested=self.headers.get('Range','')
        if not requested or not path.is_file():return super().send_head()
        match=re.fullmatch(r'bytes=(\d*)-(\d*)',requested)
        size=path.stat().st_size
        if not match or not size:self.send_error(416);return None
        a,b=match.groups();start=int(a) if a else max(0,size-int(b));end=min(int(b),size-1) if a and b else size-1
        if start>end or start>=size:self.send_error(416);return None
        stream=path.open('rb');stream.seek(start);self.byte_count=end-start+1
        self.send_response(206);self.send_header('Content-Type',self.guess_type(str(path)));self.send_header('Content-Range',f'bytes {start}-{end}/{size}');self.send_header('Content-Length',str(self.byte_count));self.end_headers();return stream
    def copyfile(self,source,output):
        try:
            if self.byte_count is None:return super().copyfile(source,output)
            remaining=self.byte_count
            while remaining:
                chunk=source.read(min(65536,remaining))
                if not chunk:break
                output.write(chunk);remaining-=len(chunk)
        except (BrokenPipeError,ConnectionResetError):pass
ThreadingHTTPServer(('127.0.0.1',8778),Handler).serve_forever()
