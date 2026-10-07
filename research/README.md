# Research Portfolio | 研究作品集

This page is a reading guide for academic reviewers. It connects the public projects on this profile with the engineering and data-analysis questions they make visible.

## Research interests

- Human-centred information systems for education and public services
- Reliable front-end workflows: state modelling, error recovery, accessibility, and offline or weak-network behaviour
- Data analysis pipelines: SQL window functions, partition design, skew diagnosis, data quality, and reproducible reporting
- Translating operational problems into auditable software and measurable experiments

## Evidence map

| Question | Public evidence | What to inspect |
| --- | --- | --- |
| Can a complex workflow be explained clearly? | [Counselor Workflow Showcase](https://github.com/GuHang2011/counselor-workflow-showcase) | Role model, state transitions, API contract, architecture notes |
| Can the interface remain understandable when requests fail? | [Frontend & Data Lab](https://github.com/GuHang2011/frontend-data-lab) | State notes, error contracts, accessibility and performance demos |
| Can data work be made reproducible? | [Frontend & Data Lab notes](https://github.com/GuHang2011/frontend-data-lab/tree/main/docs) | SQL window examples, partition/skew notes, data-quality checklist |
| Can implementation decisions be communicated to another reader? | Project READMEs and reading notes | Scope, assumptions, limitations, and verification steps |

## How to evaluate the projects

1. Start with the live demo when available.
2. Read the project README for scope, data boundaries, and limitations.
3. Open the architecture and reading notes to see the reasoning behind the implementation.
4. Inspect the small source files and examples rather than treating screenshots as the primary evidence.

## Research questions to develop

These are working questions rather than claims of completed research:

- How can workflow systems expose uncertainty and responsibility without increasing cognitive load?
- Which interface states best help users recover from partial failure in administrative tasks?
- How should data-quality checks be surfaced so that an analyst can distinguish a real trend from a pipeline defect?
- What evidence is sufficient to reproduce a small applied data-analysis result across machines?

## Reproducibility and ethics

The public examples use synthetic or redacted content. They do not contain student records, contact details, credentials, production databases, uploaded files, logs, or institution-specific confidential information. Any future case study should document its data source, transformation steps, evaluation criteria, and known limitations before publication.

## Suggested next additions

- Add a short experiment card for each analysis: question, dataset, method, result, limitation.
- Attach a dated changelog to substantial project milestones.
- Add tests or executable notebooks when a result depends on a non-trivial transformation.
- Replace generic claims with measured evidence such as load time, error recovery rate, query cost, or reproducibility checks.
