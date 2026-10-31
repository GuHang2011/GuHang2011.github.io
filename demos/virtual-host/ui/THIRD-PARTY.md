# UI dependencies

The interactive controls use Vue 3.5.44 and Element Plus 2.14.7 (MIT).
The exact dependency graph is pinned in package-lock.json. UI sources are compiled
locally with Vite; the published page does not load these packages from a CDN.

Vue: https://github.com/vuejs/core

Element Plus: https://github.com/element-plus/element-plus

The bundled dependency license texts are preserved in `../ui-dist/THIRD-PARTY-LICENSES.txt`.
Live2D and character licenses remain separate; see `../LIVE2D-NOTICE.md`.
