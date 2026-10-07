# PhD Portfolio Review: What an Advisor Still Needs to See

This checklist is written from the perspective of a computer science PhD advisor reviewing a public GitHub portfolio. It separates presentation quality from research evidence: an attractive homepage gets attention, but reproducible evidence determines whether a project is credible.

## Priority 0: Make the research claim easy to verify

For each of the three or four pinned repositories, add a compact project card at the top of the README with the same fields:

- **Question**: what practical or research question does the project answer?
- **Role**: what did the author implement personally?
- **Data**: source, license, time span, sample count, and the anonymization rule.
- **Method**: baseline, proposed method, and the reason for choosing them.
- **Evidence**: one table or figure with the metric definition, split strategy, and result.
- **Limitations**: what the result does not establish.
- **Reproduce**: the exact command, environment, expected output, and approximate runtime.

Avoid descriptions such as “improves efficiency” unless the README provides a before/after measurement and explains how it was measured.

## Priority 1: Turn projects into research artifacts

The portfolio should expose a small, consistent evidence bundle for every serious project:

```text
project/
  README.md
  LICENSE
  CITATION.cff
  environment.yml or requirements.txt
  configs/example.yaml
  data/README.md
  src/
  tests/
  notebooks/01-eda.ipynb
  reports/figures/
  CHANGELOG.md
```

The data directory may contain only a schema, a tiny synthetic fixture, or a download script when the original data cannot be redistributed. Never publish student records, credentials, cookies, internal screenshots, or production exports.

Add one smoke test and one deterministic example output. A reviewer should be able to confirm that the project runs without guessing which file to open first.

## Priority 2: Strengthen the model and data-analysis evidence

For modeling notes and data projects, add the following details rather than more algorithm names:

- a naive baseline and a reason it is appropriate;
- train/validation/test or time-based split, including leakage prevention;
- metric definitions and why the metric matches the decision;
- error analysis by subgroup, class, or time period;
- an ablation or sensitivity check for the most important feature or parameter;
- random seed, software versions, and known sources of nondeterminism;
- a short section titled **What I would test next**.

For scraping and annotation examples, document robots.txt and terms-of-service checks, request rate limits, provenance fields, duplicate handling, annotation guidelines, label disagreement, and a small quality audit. A polished crawler without provenance and legal/ethical boundaries is a weak PhD signal.

## Priority 3: Make the GitHub surfaces work together

### Overview / profile README

Keep the profile README short enough to scan in one minute. The first screen should answer:

1. Who is this researcher/engineer?
2. What questions or systems does the person care about?
3. Which three projects demonstrate that ability?
4. Where are the CV, research notes, and contact links?

Use a “Selected work” table with project, research question, evidence, and online demo. Link to a one-page research statement and a public CV PDF with an explicit version date. Keep animated badges and decorative counters subordinate to the evidence.

### Repositories

Pin no more than four to six repositories. Order them by research signal, not by recency. Rename repositories so that the title explains the artifact (for example, `counselor-workflow-showcase` is clearer than an internal system name). Add accurate topics, a license, a release/tag for the reviewed version, and a concise repository description. Archive experiments that are no longer maintained instead of leaving many half-finished repositories visible.

### Projects

Create three GitHub Projects views with a clear purpose:

- **Research portfolio**: project, question, status, artifact link, next experiment.
- **Reproducibility queue**: missing data, environment, test, figure, or documentation.
- **Learning roadmap**: topic, source, implementation exercise, and evidence of completion.

Each card should link to an issue, commit, release, or report. Empty project boards do not help an evaluator, so fewer populated views are preferable.

## Priority 4: Add the signals an advisor uses during a quick review

- A dated timeline showing when each project was started, tested, and last updated.
- A `docs/decisions/` folder with short architecture decision records for consequential choices.
- A `ROADMAP.md` containing two near-term experiments and the criterion that would count as success.
- A `CONTRIBUTING.md` and issue templates if collaboration is claimed.
- A `SECURITY.md` or a clear statement that the repository is a teaching/demo artifact.
- A citation section and DOI/release link when an artifact is stable enough to cite.

Do not invent publications, users, performance gains, or deployment scale. State “demonstration,” “synthetic fixture,” or “design study” when that is what the evidence supports.

## Suggested review order for an advisor

An advisor will usually inspect the profile README, click two pinned repositories, scan the latest commit and README, try the demo or smoke test, then look for evidence that the author can define a problem and evaluate a method. Optimize those first five minutes before adding more tutorials.

## Final acceptance checklist

- [ ] Profile README names a coherent research direction and links to a dated CV.
- [ ] Four to six pinned repositories have consistent READMEs and licenses.
- [ ] Every showcase project states question, contribution, data, method, evidence, and limitations.
- [ ] At least one model project includes a baseline, split strategy, metric table, and error analysis.
- [ ] At least one data/annotation project includes provenance and quality checks.
- [ ] Public demos contain no secrets or identifiable data.
- [ ] A fresh clone can run a smoke test by following the README.
- [ ] GitHub Projects contain populated, linked cards with next experiments.
- [ ] The last reviewed release is tagged and dated.

## Concrete GitHub edits to make next

1. **Overview**: place a one-line research statement, a dated CV link, and a four-row selected-work table above the fold. Keep the interactive effects, but ensure the page remains readable with reduced motion and on mobile.
2. **Repositories**: pin the strongest four to six artifacts, add descriptions/topics/licenses, and create a release for each artifact that is ready for review. Use the release notes to state what was tested.
3. **Projects**: populate only the three views described above. Add one card per current experiment or documentation gap and link each card to a repository path, issue, or commit.
4. **Code quality**: add a single command for setup and a single command for the smoke test. Include an expected output block so a reviewer can tell whether the run succeeded.
5. **Research maturity**: add one negative result, limitation, or failed baseline to each major project. This is more persuasive than a page of unqualified success claims.
