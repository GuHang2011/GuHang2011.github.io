export type Phase = 'idle' | 'waiting' | 'streaming' | 'stopped' | 'error' | 'done';
export type Options = { topic: 'portfolio' | 'form'; mode: 'normal' | 'slow' | 'failure' };
export type Snapshot = { phase: Phase; text: string; attempt: number; options: Options | null };
export type Transport = (options: Options, signal: AbortSignal) => AsyncIterable<string>;

// Every callback belongs to one attempt, including transports that ignore abort.
export class StreamSession {
  private snapshot: Snapshot = { phase: 'idle', text: '', attempt: 0, options: null };
  private listeners = new Set<() => void>();
  private generation = 0;
  private controller: AbortController | null = null;
  private transport: Transport;
  constructor(transport: Transport) { this.transport = transport; }
  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private set(snapshot: Snapshot) { this.snapshot = snapshot; this.listeners.forEach(fn => fn()); }
  private invalidate() { this.generation += 1; this.controller?.abort(); this.controller = null; }
  start(options: Options): boolean {
    if (['waiting', 'streaming'].includes(this.snapshot.phase)) return false;
    this.invalidate();
    const id = this.generation;
    const controller = new AbortController();
    this.controller = controller;
    const copy = { ...options };
    this.set({ phase: 'waiting', text: '', attempt: this.snapshot.attempt + 1, options: copy });
    void this.consume(id, copy, controller.signal);
    return true;
  }
  private async consume(id: number, options: Options, signal: AbortSignal) {
    try {
      for await (const chunk of this.transport(options, signal)) {
        if (id !== this.generation) return;
        this.set({ ...this.snapshot, phase: 'streaming', text: this.snapshot.text + chunk });
      }
      if (id === this.generation) { this.controller = null; this.set({ ...this.snapshot, phase: 'done' }); }
    } catch {
      if (id === this.generation) { this.controller = null; this.set({ ...this.snapshot, phase: 'error' }); }
    }
  }
  stop() {
    if (!['waiting', 'streaming'].includes(this.snapshot.phase)) return;
    this.invalidate();
    this.set({ ...this.snapshot, phase: 'stopped' });
  }
  retry(): boolean {
    if (!['stopped', 'error'].includes(this.snapshot.phase) || !this.snapshot.options) return false;
    // This demo explicitly restores the simulated connection; it starts from zero.
    return this.start({ ...this.snapshot.options, mode: 'normal' });
  }
  reset() { this.invalidate(); this.set({ phase: 'idle', text: '', attempt: 0, options: null }); }
  dispose() { this.invalidate(); this.listeners.clear(); }
}

export const responses = {
  portfolio: '先让读者看清楚你做了什么。\n\n首页保留少量代表项目，每个项目给出一个清楚的入口：能操作的演示、实现说明和对应源码。长篇技术细节可以放进独立页面。\n\n正文需要在手机上读得清楚。标题、说明和辅助文字拉开层级，颜色负责区分重点，不必让每张卡片都抢着说话。\n\n做完后沿着真实的阅读路径走一遍：从首页找到项目，打开演示，返回笔记。也试试键盘、窄屏和加载失败的情况。\n\n这段文字是本地预设示例，用于观察分段显示和中途停止的行为。',
  form: '报名表可以先从姓名、参与场次和联系方式开始。\n\n配置字段时给每个字段一个稳定标识；用户填写的值单独保存，避免修改标签时连输入内容也被清空。\n\n提交前显示具体的校验原因。例如必填项为空，提示应靠近相应字段；数值 0 不能直接被当成空值。\n\n网络失败后保留填写内容，恢复操作要让用户看得见。涉及名额与重复报名时，还需要服务端校验。\n\n这段文字是本地预设示例，没有提交报名数据，也没有调用语言模型。'
};

export function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new Error('aborted')); return; }
    const abort = () => { clearTimeout(timer); signal.removeEventListener('abort', abort); reject(new Error('aborted')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, ms);
    signal.addEventListener('abort', abort, { once: true });
  });
}

export async function* simulate(options: Options, signal: AbortSignal) {
  await delay(options.mode === 'slow' ? 1600 : 500, signal);
  const chars = Array.from(responses[options.topic]);
  for (let offset = 0; offset < chars.length; offset += 4) {
    await delay(options.mode === 'slow' ? 240 : 75, signal);
    if (options.mode === 'failure' && offset >= 52) throw new Error('simulated interruption');
    yield chars.slice(offset, offset + 4).join('');
  }
}
