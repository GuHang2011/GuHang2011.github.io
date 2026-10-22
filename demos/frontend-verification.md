# React and low-code examples: verification record

Verified locally on **2026-10-22** on Windows with Node.js **25.2.1**. These are AI-assisted learning examples using synthetic records. This record describes checks of the public examples, not production-system certification or research results.

## Reproduce the core checks

Clone this website repository, then run:

```bash
cd demos/react-workflow
npm ci
npm test
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/demos/react-workflow/`. Shared styles are resolved from the website root; clone the full repository. The committed `assets/workflow.js` is built from the published React/TypeScript sources. The build is needed after source edits.

In a second terminal, from the repository root:

```bash
node --test demos/low-code-form/schema.test.mjs
```

The same preview server serves `http://127.0.0.1:4173/demos/low-code-form/`.

## Results and scope

| Area | Checks | Result |
| --- | --- | --- |
| React state model | 8 tests: valid transitions, role constraints, pending operations, retry, conflicts and obsolete responses | Passed |
| Form schema and validation | 10 tests: schema validation, unique keys, import boundaries and input validation | Passed |
| TypeScript and bundle | `npm run build` with the committed lockfile | Passed |
| Dependencies | `npm audit` against the installed React example dependencies | 0 reported vulnerabilities at check time |
| Existing homepage | 26 local regression checks covering project filtering, reader controls, films and learning notes | Passed |
| Browser exercises | Chromium interactions, English/Chinese, keyboard and focus, reduced motion; 1440, 1024, 768, 390 and 320 px widths | Passed; no page errors or failed requests during the exercised flows |

The 26 homepage checks are part of the local portfolio maintenance harness. The 18 new project unit tests are included in these public directories. Browser observations cover the flows below; they do not imply complete assistive-technology or cross-browser certification.

## Browser walkthrough

### React workflow

1. As reviewer, approve a task and inspect its new column and version.
2. Reset, choose a simulated network error, submit an action, switch the response to normal and retry.
3. Choose a version conflict, then refresh the snapshot before confirming again.
4. Reset while a request is pending and wait: the old callback must not overwrite the reset board.
5. Switch role and inspect available actions; operate with the keyboard and check that focus returns to the task after movement.

### Configurable form

1. Validate the empty form; check inline errors and first-error focus.
2. Fill the example fields, reorder them and change language: inputs should remain attached to their field keys.
3. Add/remove fields, including a number with value `0`, and test invalid dates.
4. Try invalid JSON or duplicate keys: the working form must remain unchanged.
5. Apply a valid schema: the form changes and its preview inputs are explicitly reset. Copy JSON and inspect the feedback.

## Boundaries

- React roles and version conflicts are simulated in the client. There is no backend authorization or database transaction.
- The form uses a custom application schema v1, not the JSON Schema standard. It creates supported native controls and does not execute supplied HTML or scripts.
- Screenshots show the actual browser UI. No private business records, credentials or project datasets are included.
- No usability study, load test, production SLA or empirical research-performance claim is made.
