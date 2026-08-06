# Memory

A classic memory card game for two players, built with TypeScript, SCSS and Vite.

## Features

- Two themes: **Code vibes** (web dev logos) and **Gaming vibes** (retro gaming motifs)
- Three board sizes: **16, 24 or 32 cards**
- Two players (blue and orange) with live score and turn indicator — a found pair keeps the turn, a miss passes it on
- Game over screen with winner or draw page per theme
- Settings are kept in `sessionStorage`, so the selection is restored when you come back from a game

## Project structure

```
index.html               Start page
html/
  settings.html          Theme / player / board size selection
  board-<theme>-<n>.html The six playing fields (code|gaming × 16|24|32)
  game-over-<theme>.html Final score screen
  win-<player>-<theme>.html, draw-<theme>.html   Result pages
src/
  settings.ts            Selection logic, saves to sessionStorage
  gameplay.ts            Shared game logic (shuffle, flip, match check, scoring)
  code_vibes_*.ts        Board setup for the code theme (16 / 24 / 32)
  gaming_vibes_*.ts      Board setup for the gaming theme (16 / 24 / 32)
  gameover*.ts           Final score screens
  styles/                SCSS, one file per page plus shared styles
public/images/           Card motifs and UI graphics
```

Each board file picks its motifs, doubles and shuffles them, renders the field
and then hands over to `init()` from `gameplay.ts` — the game logic itself lives
in one place for all six boards.

## Built with

TypeScript · SCSS · Vite · HTML
