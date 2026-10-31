"""Build the public six-chapter narration and measured amplitude envelope.

Requires edge-tts, Pillow and FFmpeg. No project account or API key is read.
"""
import argparse,asyncio,array,json,math,subprocess
from pathlib import Path

CHAPTERS=[
 {'title':'认识卡通主播','titleEn':'Meet the presenter','gesture':'welcome',
  'zh':'你好，欢迎来到丝路智链。现在出场的是卡通主播 Mao，形象来自 Live2D 官方示例。这个演示把人物动作、合成语音、双语字幕和播放控制连接起来。',
  'en':'Welcome to Silk Road Intelligence. Meet Mao, an official Live2D sample character. This demo connects character motion, synthesized narration, bilingual captions and playback controls.'},
 {'title':'先核对商品信息','titleEn':'Verify product details','gesture':'present',
  'zh':'以草原蜂蜜教学样品为例，先核对名称、规格和产地，再决定哪些内容可以讲。这里使用的是合成商品，不涉及真实交易。没有确认的信息应保留为空，不让主播凭空补充。',
  'en':'Start with a synthetic honey sample: verify its name, specification and origin before writing. No real transaction is involved. Leave unverified details blank instead of inventing them.'},
 {'title':'组织讲稿与素材','titleEn':'Prepare script and media','gesture':'present',
  'zh':'讲稿按章节组织，每段对应一个主题。语音负责提供播放时钟，字幕跟随章节定位，角色依据音量做嘴部动作。视频和插图作为辅助材料，重点是让信息清楚、步骤可以复查。',
  'en':'Each chapter covers one topic. Audio supplies the playback clock, captions follow chapter positions, and measured volume drives the mouth. Media supports a clear, reviewable explanation.'},
 {'title':'保留人工检查','titleEn':'Keep human review','gesture':'nod',
  'zh':'生成内容之后，还需要人工检查。核对商品描述是否准确，字幕是否容易阅读，素材是否标明来源，再决定是否展示。当前口型由音量驱动，不代表已经实现音素级同步或实时模型推理。',
  'en':'Review generated content before showing it: check descriptions, caption readability and asset attribution. Mouth movement is amplitude-driven; it is not phoneme alignment or real-time model inference.'},
 {'title':'控制播放节奏','titleEn':'Control the playback','gesture':'welcome',
  'zh':'你可以暂停讲解、拖动进度或直接跳到某个章节，也可以切换回小林角色比较表现。暂停时声音和动作一起停止，离开标签页也会暂停。减少动作模式适合更安静的阅读环境。',
  'en':'Pause, seek, jump to a chapter, or switch to Lin to compare presenters. Sound and motion pause together, including when the tab is hidden. Reduced motion supports quieter viewing.'},
 {'title':'从展示走向验证','titleEn':'From demo to verification','gesture':'nod',
  'zh':'这段演示关注的是工程集成：让角色、声音、字幕与控制状态保持一致。接下来可以继续验证口型对齐、低网速恢复和不同设备的表现。你也可以打开项目代码，复查每一步的实现。',
  'en':'The focus is engineering integration: consistent character, audio, captions and control state. Next steps include phoneme alignment, slow-network recovery and device testing. The implementation is available for inspection.'}
]

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site',type=Path,default=Path('.'))
    parser.add_argument('--cache',type=Path,default=Path('output/presenter-voice'))
    parser.add_argument('--ffmpeg',default='ffmpeg')
    parser.add_argument('--deps',type=Path)
    args=parser.parse_args()
    if args.deps:
        import sys
        sys.path.insert(0,str(args.deps))
    import edge_tts
    args.cache.mkdir(parents=True,exist_ok=True)
    out=args.site/'demos/virtual-host'
    async def build():
        cursor=0;pieces=[];segments=[]
        for i,cue in enumerate(CHAPTERS):
            import hashlib
            key=hashlib.sha256(cue['zh'].encode()).hexdigest()[:12]
            clip=args.cache/f'{i+1}-{key}.mp3'
            if not clip.exists():await edge_tts.Communicate(cue['zh'],'zh-CN-XiaoxiaoNeural',rate='+5%').save(str(clip))
            pcm=subprocess.check_output([args.ffmpeg,'-v','error','-i',str(clip),'-f','s16le','-ar','24000','-ac','1','-'])
            pcm+=b'\0'*24000  # Half a second between topics for readable chapter transitions.
            duration=len(pcm)/48000;segments.append({**cue,'start':cursor,'duration':duration});cursor+=duration;pieces.append(pcm)
            print('Narration chapter',i+1,'seconds',round(duration,2),flush=True)
        pcm=b''.join(pieces)
        subprocess.run([args.ffmpeg,'-y','-v','error','-f','s16le','-ar','24000','-ac','1','-i','-','-c:a','libmp3lame','-b:a','96k',str(out/'narration.mp3')],input=pcm,check=True)
        samples=array.array('h',pcm)
        levels=[min(1,math.sqrt(sum(v*v for v in samples[i:i+1000])/len(samples[i:i+1000]))/6500) for i in range(0,len(samples),1000)]
        data={'voice':'zh-CN-XiaoxiaoNeural','audioSource':'Microsoft Edge TTS; synthetic voice, no voice cloning','duration':cursor,'envelopeFps':24,'levels':[round(x,3) for x in levels],'segments':segments}
        (out/'script.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
        print('Total seconds:',cursor,flush=True)
    asyncio.run(build())
if __name__=='__main__':main()
