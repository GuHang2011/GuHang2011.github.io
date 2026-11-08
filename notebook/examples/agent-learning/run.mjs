import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { AgentSession, scriptedModel } from './agent.mjs';

const session = new AgentSession({ model: scriptedModel });
const mode = process.argv[2] ?? '--preview';
if (!['--preview', '--interactive', '--deny'].includes(mode)) {
  console.error('Usage: node run.mjs [--preview|--interactive|--deny]');
  process.exitCode = 1;
} else {
  console.log('Offline teaching example. No LLM, network, disk write or GitHub publication.');
  let state = await session.run();
  console.log(JSON.stringify({ status: state.status, proposal: state.pending }, null, 2));
  if (state.pending && mode !== '--preview') {
    let allow = false;
    if (mode === '--interactive') {
      const cli = createInterface({ input: stdin, output: stdout });
      const inputController = new AbortController();
      const cancel = () => { session.cancel(); inputController.abort(); };
      cli.on('SIGINT', cancel);
      try {
        const answer = await cli.question('Save this exact draft in process memory? Type yes to approve: ', { signal: inputController.signal });
        allow = answer.trim() === 'yes';
      } catch (error) {
        if (!inputController.signal.aborted) throw error;
      } finally { cli.off('SIGINT', cancel); cli.close(); }
    }
    if (session.snapshot().status === 'awaiting_approval') session.decide(state.pending.id, allow);
    state = await session.run();
    console.log(JSON.stringify({ status: state.status, drafts: state.drafts, lastMessage: state.messages.at(-1), events: state.events }, null, 2));
  }
  if (mode === '--preview') console.log('Preview only. Run --interactive to review the decision, or --deny to exercise refusal.');
}
