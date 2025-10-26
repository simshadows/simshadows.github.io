# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

As a side-effect, it can be useful documentation for a human to understand the codebase! Though it's optimized to be read by Claude Code, so it intentionally has human-readability issues.


## Project Overview

This is the main personal website of someone who goes by *simshadows* on the internet, hosted on <https://www.simshadows.com/>. Its purpose is quite broad, but sim loves sharing any and all ideas and knowledge with the world. They are an obsessive notetaker and writer, and if they put in the work to create something, they may as well put in a bit of extra work to put it on the internet. The website can be described as a "monorepo of sim's knowledge and online identity" containing blog posts, curated content, cheatsheets, notes, and various personal pages.

The website is fully static, built using the Astro framework.


## Software Development Philosophy

This is intended to be a life-long personal project. All solutions must be easy to maintain, modify, and inevitably migrate to new frameworks/tools/techniques, or have a good reason for the design. With all proposed solutions and generated code, please include a discussion of these maintainability/flexibility tradeoffs, and if possible, provide alternative ideas and their tradeoffs.

We tend prefer minimizing dependencies. If you must import a new package, please justify it.

We want as much fail-fast as is reasonable on build-time to ensure the code works like we expect, and data is correct. Compiler warnings are set as aggressive as possible, and the code is littered with code made to throw an error and prevent a successful build if the smallest thing is wrong.

## Development Commands

### Core Development Workflow

- **Install dependencies**: `yarn install`
- **Start dev server**: `yarn start` (runs on port 8000)
- **Build for production**: `yarn build` (runs type checking, Astro check, then builds)

### Testing and Validation

- **Run tests**: `yarn test` (runs Jest test suite)
- **Type checking**: `yarn typecheck` (runs Astro check and TypeScript compiler)

### LaTeX Compilation

LaTeX is used only for rendering diagrams into SVGs. LaTeX compilation is done using makefiles that are placed near the LaTeX source files. The SVG artifacts are committed in the repo, so LaTeX compilation is only done on an as-needed basis. SVG artifacts are stored close to where they are used. It's a bit of a mess so you may need to dig around yourself and figure out which `*.svg` files go with what `*.tex` files (hint: look at the makefiles).

I'm avoiding adding new LaTeX diagrams since the way I'm doing it is such a pain to use and maintain.


## Directory Structure

- `content/`: All content collections (leveraging Astro content collections).
- `public/`: Files that are copied directly to the web server unmodified.
- `src/components/`: Reusable Preact/Astro components.
- `src/generic-images/`: Reusable images.
- `src/helpers/`: Reusable helper code. Notable files:
    - `./failfast-validation.ts`: Functions that handle type-narrowing and aggressively throw exceptions if something is wrong.
    - `./frontmatter.ts`: Convenient extraction and validation of common Markdown/MDX and Astro page frontmatter.
    - `./timezoneless-date.ts`: Custom timezoneless date class.
    - `./types.ts`: Typescript type helpers.
    - `./utils.ts`: General/uncategorized helper code.
- `src/latex-helpers/`: Reusable LaTeX helper code. Notable files:
    - `./rehype-plugin/`: A Rehype plugin for rendering LaTeX from code blocks using special code block "languages":
        - `latex-eq`: Standard equation rendering
        - `latex-eq-fleqn`: Left-aligned equation rendering
        - `latex-gather`: Gather environment
        - `latex-align`: Align environment
    - `./general.tex`: LaTeX common code imported by actual `.tex` files to build SVGs. It's not used directly by the static web app itself.
    - `./katex-config*.ts`: KaTeX config, including many LaTeX macros.
- `src/layouts/`: Astro layouts.
- `src/pages/`: The pages in the website. Notable sections/pages/files:
    - `./blog/`: Blog posts (using Astro content collections).
        - `./[...slug].astro`: Each blog post (from the Astro content collection) has a full dedicated route (page) here.
    - `./c/`: Computing/Programming. Has many technical cheatsheets and notes.
    - `./curation/`: A feed of curated internet content (using Astro content collections). Mostly YouTube videos.
        - Individual posts don't have their own routes, but rather they are rendered out in the paginated feed.
        - `./index.astro`: The first page of the feed.
        - `./[page].astro`: The subsequent pages of the feed. They're all just numbered pages.
    - `./food/`: Food. Has a food diary, recommendations, and a wishlist.
    - `./g/`: Gaming.
    - `./h/`: Miscellaneous hobbies that don't have their own dedicated section on my website.
    - `./list-of-awesome/`: My list of favourite YouTube channels, websites, etc.
    - `./personal-finance/`: Personal finance.
    - `./photography/`: Photography.
    - `./s/`: Math and science. Notably includes some migrated math cheatsheets.
    - `./tech/`: Consumer technology.
    - `./_index-links.astro`: The main site index (tree of links to pages throughout my website).
    - `./index.astro`: The front page! It's just shows the main site index.
    - `./experimental-glob.astro`: A WIP experimental page for developing a way to automate the site index so I don't have to maintain it by hand.
- `constants.ts`: All global constants.
- `content.config.ts`: Configures Astro content collections.
- `danger*.ts`: All functions that bypass Typescript's type-checking is centralized into this file. In most cases, it's necessary due to limitations with Typescript itself (e.g. type-narrowing unknowns into Arrays), or limitations with the tooling (e.g. Vite's `import.meta.glob` returning unknown types). I hate needing to bypass the type system, and this practice ensures that it is kept to a minimum, and it is easy to find and refactor the dangerous code.
- `tech-debt.ts`: All significant tech debt is put here to make it easy to find and refactor.
- `astro.config.mjs`: Astro config.
- `jest.config.js`: Jest config.
- `tsconfig.json`: Typescript config.


## Code Architecture Essentials

### Content

Most of the content is `src/pages/`. The files there are a mix of webpage content/text and code to get things working, so the files can get quite huge if there's a lot of stuff on a page.

The other location for content is `content/`.

### Content Collections

As defined in `src/content.config.ts`, there are two Astro content collections:
- `blog`: Blog posts loaded from `./content/blog/`
- `curation`: Curated content loaded from `./content/curation/`

`src/pages/` must never use the content collections directly. The respective helper files in `src/helpers/collections/` must be used. These helpers pre-process the collections, reducing duplicate code and helps ensure that `src/pages/` is mostly concerned with the rendering of the content rather than trying to read and validate it.

### CSS

- Global styles in `src/global.css`
- Normalize.css is used for CSS reset
- Component-specific CSS files are co-located with components

