# Memory

A classic memory card game for two players, built with TypeScript, SCSS and Vite.

## Features

- Two themes: **Code vibes** (web dev logos) and **Gaming vibes** (retro gaming motifs)
- Three board sizes: **16, 24 or 32 cards**
- Two players (blue and orange) with live score and turn indicator — a found pair keeps the turn, a miss passes it on
- Game over screen with winner or draw page per theme
- Settings are kept in `sessionStorage`, so the selection is restored when you come back from a game

## Getting started

**Prerequisites:** Node.js `^20.19.0 || >=22.12.0` (required by Vite 8) and npm.

```bash
git clone https://github.com/PfeiferFelix/Memory.git
cd Memory
npm install
npm run dev
```

The dev server prints a URL — note that the app is served under the `/Memory/`
sub-path, so the start page is `http://localhost:5173/Memory/`.

No `.env` file and no further configuration are needed. The project has no
backend, no API keys and no environment-specific values — see
[Configuration](#configuration) if you want to know why.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Type-checks with `tsc --noEmit`, then builds to `dist/` |
| `npm run preview` | Serves the built `dist/` locally to check the production build |

## Configuration

The only build setting that matters is `base` in `vite.config.mjs`:

```js
base: '/Memory/',
```

This is the sub-path the app is deployed under — GitHub Pages serves the repo
at `https://pfeiferfelix.github.io/Memory/`. Vite exposes the value as the
built-in variable `import.meta.env.BASE_URL` and inlines it at build time.

That distinction matters for how you write asset paths:

- **In HTML** write root-absolute paths — `<img src="/images/foo.png">`. Vite
  rewrites them to `/Memory/images/foo.png` during the build.
- **In TypeScript** prefix them yourself — `` `${import.meta.env.BASE_URL}images/foo.png` ``.
  Strings built at runtime never pass through Vite's asset pipeline, so without
  the prefix they would break on the deployed sub-path.
- **Never** reference the `public/` folder by path (`../public/images/foo.png`).
  Its contents are copied to the root of `dist/`, so a path reference makes Vite
  bundle a second, duplicate copy of the file.

`BASE_URL` cannot be set through a `.env` file — it is a built-in Vite variable
that is always derived from the `base` option above. Custom variables in a
`.env` would need a `VITE_` prefix to reach browser code at all, and this
project has none.

`vite.config.mjs` also picks up every `.html` file in `html/` automatically, so
a new page only needs to be dropped into that folder.

## Deployment

```bash
npm run build
```

The build writes a fully static site to `dist/`, ready to be served by any
static host. If you deploy somewhere other than `https://<user>.github.io/Memory/`,
adjust `base` in `vite.config.mjs` to match the new sub-path — everything else
follows from it.

## Project structure

```
index.html                       Start page
vite.config.mjs                  Base path + multi-page build config
html/
  settings.html                  Theme / player / board size selection
  board-<theme>-<n>.html         The six playing fields (code|gaming × 16|24|32)
  game-over-<theme>.html         Final score screen
  win-<player>-<theme>.html      Winner pages
  draw-<theme>.html              Draw pages
src/
  gameplay.ts                    Shared game logic (shuffle, flip, match check, scoring)
  settings.ts                    Selection logic, saves to sessionStorage
  code-vibes-16|24|32.ts         Board setup for the code theme
  game-vibes-16.ts, game-vibes24.ts, game-vibes-32.ts
                                 Board setup for the gaming theme
  code-vibes-gameover.ts         Final score screen, code theme
  game-vibes-gameover.ts         Final score screen, gaming theme
  styles/
    variables.scss, mixins.scss  Colours, fonts and shared mixins
    card.scss, popup.scss        Shared components
    endscreen.scss               Shared base for all result pages
    style.scss, settings.scss    Start page and settings page
    code-vibes/                  Code theme styles, one file per page
    gaming-vibes/                Gaming theme styles, one file per page
public/images/                   Card motifs and UI graphics
```

Each board file picks its motifs, doubles and shuffles them, renders the field
and then hands over to `init()` from `gameplay.ts` — the game logic itself lives
in one place for all six boards.

## Built with

TypeScript · SCSS · Vite · HTML
