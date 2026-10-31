"""Encode the public browser replay frames with FFmpeg, plus posters and captions."""
import argparse
import json
from pathlib import Path
import subprocess

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--site',type=Path,default=Path('.'))
parser.add_argument('--frames',type=Path,default=Path('output/playwright/presenter-frames'))
parser.add_argument('--ffmpeg',default='ffmpeg')
args=parser.parse_args()
site=args.site.resolve(); frames=args.frames.resolve(); out=site/'assets/videos'
data=json.loads((site/'demos/virtual-host/script.json').read_text(encoding='utf-8'))
out.mkdir(parents=True,exist_ok=True)
def run(*cmd):subprocess.run([args.ffmpeg,'-y','-v','error',*map(str,cmd)],check=True)
def stamp(t):
    ms=round(t*1000)
    return f'00:{ms//60000:02d}:{ms//1000%60:02d}.{ms%1000:03d}'
records=[]
for name,prefix,duration,audio in [('virtual-host-showcase','showcase',data['duration'],True),('virtual-host-workflow','workflow',60,False)]:
    inputs=['-framerate','24','-i',frames/(prefix+'-%04d.jpg')]
    if audio:inputs+=['-i',site/'demos/virtual-host/narration.mp3']
    opts=['-c:v','libx264','-crf','23','-preset','medium','-pix_fmt','yuv420p','-movflags','+faststart','-t',duration]
    opts+=['-c:a','aac','-b:a','128k'] if audio else ['-an']
    run(*inputs,*opts,out/(name+'.mp4'))
    run('-ss',3,'-i',out/(name+'.mp4'),'-frames:v',1,'-q:v',2,out/(name+'.jpg'))
    records.append({'file':name+'.mp4','duration':duration,'audio':audio,'width':1280,'height':720,'fps':24,'bytes':(out/(name+'.mp4')).stat().st_size})
    cues=[(s['start'],s['start']+s['duration'],s) for s in data['segments']] if audio else [
        (0,8,{'zh':'开始讲解：Mao 动作、字幕和进度联动。','en':'Start: Mao, captions and playback progress move together.'}),
        (8,14,{'zh':'暂停：声音、角色和进度一起停止。','en':'Pause: audio, character motion and the timeline stop together.'}),
        (14,24,{'zh':'选择第二章，定位商品信息核对。','en':'Select chapter two to review product information.'}),
        (24,34,{'zh':'切换小林，在同一讲稿中比较另一种角色。','en':'Switch to Lin to compare another presenter using the same script.'}),
        (34,44,{'zh':'切换回 Mao，查看人工检查章节。','en':'Return to Mao and review the human-checking chapter.'}),
        (44,52,{'zh':'减少动作，保留字幕和播放进度。','en':'Reduce movement while keeping captions and playback progress.'}),
        (52,60,{'zh':'从头开始，回到第一章。','en':'Restart from the first chapter.'})]
    for lang in ['zh','en']:
        vtt='WEBVTT\n\n'+'\n\n'.join(f'{stamp(a)} --> {stamp(b)}\n{s[lang]}' for a,b,s in cues)+'\n'
        (out/(name+'.'+lang+'.vtt')).write_text(vtt,encoding='utf-8')
(out/'virtual-host-metadata.json').write_text(json.dumps({'created':'2026-11-01','kind':'Recorded public demo with Mao Live2D sample and Lin SVG; not a production stream','voice':data['voice'],'attribution':'This content uses sample data owned and copyrighted by Live2D Inc.','files':records},indent=2),encoding='utf-8')
print(json.dumps(records,indent=2))
