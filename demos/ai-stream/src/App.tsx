import { useEffect, useState, useSyncExternalStore } from 'react';
import { Alert, Button, ConfigProvider, Radio, Select } from 'antd';
import { StreamSession, simulate, type Options, type Phase } from './stream';

const titles: Record<Phase, string> = { idle: '准备好了', waiting: '正在等待第一段', streaming: '正在输出', stopped: '已停止', error: '连接中断', done: '输出完成' };
const descriptions: Record<Phase, string> = {
  idle: '选一个话题，开始观察回答怎样出现。', waiting: '尚未收到正文，现在也可以停止。', streaming: '正文会逐段出现，可以随时停止。',
  stopped: '已保留收到的文字。重新生成会从头开始。', error: '保留已收到的文字。重试将恢复模拟连接，并从头生成。', done: '本次输出结束，可以换个场景再试一次。'
};

export function App() {
  const [session] = useState(() => new StreamSession(simulate));
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const [topic, setTopic] = useState<Options['topic']>('portfolio');
  const [mode, setMode] = useState<Options['mode']>('normal');
  const [copied, setCopied] = useState('');
  const [reduceMotion, setReduceMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const change = () => setReduceMotion(media.matches); media.addEventListener('change', change); return () => media.removeEventListener('change', change); }, []);
  const active = state.phase === 'waiting' || state.phase === 'streaming';
  useEffect(() => { const leave = () => session.stop(); window.addEventListener('pagehide', leave); return () => { window.removeEventListener('pagehide', leave); session.dispose(); }; }, [session]);
  useEffect(() => { setCopied(''); }, [state.attempt, state.phase]);
  const start = () => { session.start({ topic, mode }); };
  const retry = () => { if (session.retry()) setMode('normal'); };
  const copy = async () => { try { await navigator.clipboard.writeText(state.text); setCopied('已复制'); } catch { setCopied('复制不可用，可在正文中选择文字复制'); } };
  return <ConfigProvider theme={{ token: { motion: !reduceMotion, colorPrimary: '#155f56', colorInfo: '#155f56', colorError: '#a52a32', borderRadius: 7, fontSize: 16, controlHeight: 44, fontFamily: '"IBM Plex Sans", "Microsoft YaHei", sans-serif' } }}>
    <div className="studio">
      <aside className="controls" aria-label="演示设置">
        <p className="overline">01 / 选择场景</p>
        <h2>先试一次正常输出。</h2>
        <p className="muted">再切换到慢速或中断，看看界面如何回应。</p>
        <label htmlFor="topic">预设话题</label>
        <Select id="topic" aria-label="预设话题" value={topic} disabled={active} onChange={setTopic} virtual={false} options={[{ value: 'portfolio', label: '怎样整理个人项目主页？' }, { value: 'form', label: '怎样设计一张报名表？' }]} />
        <fieldset><legend>模拟连接</legend><Radio.Group aria-label="模拟连接" value={mode} disabled={active} onChange={event => setMode(event.target.value)}>
          <Radio value="normal">正常输出</Radio><Radio value="slow">慢速连接</Radio><Radio value="failure">中途断开</Radio>
        </Radio.Group></fieldset>
        <div className="primary-actions"><Button type="primary" disabled={active} onClick={start}>开始演示</Button><Button danger disabled={!active} onClick={() => session.stop()}>停止输出</Button></div>
        <Button type="text" onClick={() => { session.reset(); setCopied(''); }}>清空本次内容</Button>
        <div className="experiment-tip"><span>可以这样试</span><p>选择“中途断开”，等待错误出现，再点击“恢复连接并重试”。旧文字会清空，新尝试独立开始。</p></div>
      </aside>
      <section className="output" aria-labelledby="output-title">
        <div className="output-heading"><div><p className="overline">02 / 观察过程</p><h2 id="output-title">回答工作区</h2></div><span className="attempt">尝试 {state.attempt.toString().padStart(2, '0')}</span></div>
        <div className="status-line" role="status" aria-live="polite" aria-atomic="true" data-phase={state.phase}><span className={`status-dot ${active ? 'active' : ''}`} aria-hidden="true" /><strong>{titles[state.phase]}</strong><span>{descriptions[state.phase]}</span></div>
        <div className="answer" data-testid="answer" tabIndex={0} aria-label="预设回答正文" aria-busy={active}>
          {state.text ? <p>{state.text}</p> : <div className="empty"><span aria-hidden="true">Aa</span><p>{state.phase === 'idle' ? '一段回答，也是一串需要处理的状态。' : state.phase === 'stopped' ? '已在收到正文前停止。' : '等待第一段文字……'}</p><small>预设文本 · 本地模拟</small></div>}
          {state.phase === 'streaming' && <span className="cursor" aria-hidden="true" />}
        </div>
        {(state.phase === 'error' || state.phase === 'stopped') && <div className="recovery"><Alert type={state.phase === 'error' ? 'error' : 'info'} showIcon title={state.phase === 'error' ? '本次模拟在收到部分文字后中断' : '本次输出已由你停止'} description="重新开始不会续写旧内容，也不会自动重复提交。" /><Button onClick={retry}>{state.phase === 'error' ? '恢复连接并重试' : '重新生成'}</Button></div>}
        <div className="output-footer"><span>{Array.from(state.text).length} 字符<span className="muted"> · 仅统计本次已显示内容</span></span><Button disabled={!state.text || active} onClick={copy}>复制文字</Button></div>
        <p className="copy-status" role="status">{copied}</p>
      </section>
    </div>
  </ConfigProvider>;
}
