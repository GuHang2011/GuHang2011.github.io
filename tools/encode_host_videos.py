"""Encode the public browser replay frames with FFmpeg, plus posters and captions."""
import argparse
import json
from pathlib import Path
import subprocess

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--site',type=Path,default=Path('.'))
parser.add_argument('--frames',type=Path,default=Path('output/playwright/host-frames'))
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
for name,prefix,duration,audio in [('virtual-host-showcase','showcase',data['duration'],True),('virtual-host-workflow','workflow',22,False)]:
    inputs=['-framerate','24','-i',frames/(prefix+'-%04d.jpg')]
    if audio:inputs+=['-i',site/'demos/virtual-host/narration.mp3']
    opts=['-c:v','libx264','-crf','23','-preset','medium','-pix_fmt','yuv420p','-movflags','+faststart','-t',duration]
    opts+=['-c:a','aac','-b:a','128k'] if audio else ['-an']
    run(*inputs,*opts,out/(name+'.mp4'))
    run('-ss',2,'-i',out/(name+'.mp4'),'-frames:v',1,'-q:v',2,out/(name+'.jpg'))
    records.append({'file':name+'.mp4','duration':duration,'audio':audio,'width':1280,'height':720,'fps':24,'bytes':(out/(name+'.mp4')).stat().st_size})
    cues=[(s['start'],s['start']+s['duration'],s) for s in data['segments']] if audio else [
        (0,4,{'zh':'开始讲解：角色、字幕和进度联动。','en':'Start narration: character, captions and progress move together.'}),
        (4,7,{'zh':'暂停：保留当前播放位置。','en':'Pause and retain the current position.'}),
        (7,11,{'zh':'选择第二章，直接定位商品讲解。','en':'Select chapter two and seek to the product explanation.'}),
        (11,15,{'zh':'继续播放，从选定章节开始。','en':'Resume from the selected chapter.'}),
        (15,19,{'zh':'定位第三章，切换手势和讲稿。','en':'Select chapter three to change the gesture and script.'}),
        (19,22,{'zh':'重播，从讲解起点开始。','en':'Replay from the beginning.'})]
    for lang in ['zh','en']:
        vtt='WEBVTT\n\n'+'\n\n'.join(f'{stamp(a)} --> {stamp(b)}\n{s[lang]}' for a,b,s in cues)+'\n'
        (out/(name+'.'+lang+'.vtt')).write_text(vtt,encoding='utf-8')
(out/'virtual-host-metadata.json').write_text(json.dumps({'created':'2026-10-20','kind':'Deterministic replay of public 2D component demo; not a production stream','voice':data['voice'],'files':records},indent=2),encoding='utf-8')
print(json.dumps(records,indent=2))
