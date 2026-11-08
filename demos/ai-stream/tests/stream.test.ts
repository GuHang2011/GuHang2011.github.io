import test from 'node:test';
import assert from 'node:assert/strict';
import { StreamSession, delay, type Options } from '../src/stream.ts';
const normal: Options = { topic: 'portfolio', mode: 'normal' };
const flush = () => new Promise<void>(resolve => setImmediate(resolve));
function harness() {
  const requests: { next(value: string): void; fail(): void; end(): void; signal: AbortSignal; options: Options }[] = [];
  const session = new StreamSession((options, signal) => {
    let resolve: (value: IteratorResult<string>) => void;
    let reject: (reason: Error) => void;
    requests.push({options,signal,next:value=>resolve({value,done:false}),end:()=>resolve({value:undefined,done:true}),fail:()=>reject(new Error('late error'))});
    return { [Symbol.asyncIterator]() { return { next: () => new Promise<IteratorResult<string>>((yes,no) => { resolve=yes;reject=no; }) }; } };
  });
  return {session,requests};
}
test('chunks are appended in order and completion keeps the complete answer',async()=>{
  const {session,requests}=harness();session.start(normal);assert.equal(session.getSnapshot().phase,'waiting');
  requests[0].next('第一');await flush();requests[0].next('段');await flush();requests[0].end();await flush();
  assert.equal(session.getSnapshot().phase,'done');assert.equal(session.getSnapshot().text,'第一段');
});
test('duplicate start during waiting and streaming creates only one request',async()=>{
  const {session,requests}=harness();assert.equal(session.start(normal),true);assert.equal(session.start(normal),false);
  requests[0].next('a');await flush();assert.equal(session.start(normal),false);assert.equal(requests.length,1);session.stop();
});
test('stop before the first chunk aborts and ignores a late success',async()=>{
  const {session,requests}=harness();session.start(normal);session.stop();assert.equal(requests[0].signal.aborted,true);
  requests[0].next('stale');await flush();assert.equal(session.getSnapshot().text,'');assert.equal(session.getSnapshot().phase,'stopped');
});
test('stop retains partial content and ignores a transport that rejects late',async()=>{
  const {session,requests}=harness();session.start(normal);requests[0].next('keep');await flush();session.stop();requests[0].fail();await flush();
  assert.equal(session.getSnapshot().text,'keep');assert.equal(session.getSnapshot().phase,'stopped');
});
test('reset then a new start ignores old data even when the old source ignores abort',async()=>{
  const {session,requests}=harness();session.start(normal);session.reset();session.start({...normal,topic:'form'});
  requests[1].next('new');await flush();requests[0].next('old');await flush();assert.equal(session.getSnapshot().text,'new');assert.equal(session.getSnapshot().options?.topic,'form');
});
test('failure retains text; retry restores the simulated connection and replaces it',async()=>{
  const {session,requests}=harness();session.start({...normal,mode:'failure'});requests[0].next('partial');await flush();requests[0].fail();await flush();
  assert.equal(session.getSnapshot().phase,'error');assert.equal(session.getSnapshot().text,'partial');assert.equal(session.retry(),true);
  assert.equal(session.getSnapshot().text,'');assert.equal(requests[1].options.mode,'normal');assert.equal(session.getSnapshot().attempt,2);
  requests[1].next('fresh');await flush();requests[1].end();await flush();assert.equal(session.getSnapshot().text,'fresh');
});
test('late completion after stop cannot finish a new attempt',async()=>{
  const {session,requests}=harness();session.start(normal);session.stop();session.retry();requests[0].end();await flush();assert.equal(session.getSnapshot().phase,'waiting');
});
test('retry is unavailable from idle, active or completed states',async()=>{
  const {session,requests}=harness();assert.equal(session.retry(),false);session.start(normal);assert.equal(session.retry(),false);requests[0].end();await flush();assert.equal(session.retry(),false);
});
test('dispose aborts and stops subscribers from receiving late updates',async()=>{
  const {session,requests}=harness();let calls=0;session.subscribe(()=>calls++);session.start(normal);session.dispose();requests[0].next('late');await flush();assert.equal(calls,1);assert.equal(requests[0].signal.aborted,true);
});
test('timed simulation responds to cancellation both before and during a delay',async()=>{
  const first=new AbortController();first.abort();await assert.rejects(delay(10000,first.signal));
  const second=new AbortController();const waiting=delay(10000,second.signal);second.abort();await assert.rejects(waiting);
});
