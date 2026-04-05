# Sim's Pages

## How do I host this locally myself? (Linux/Mac)

This codebase uses the [Astro web framework](https://astro.build/) and is entirely static.

### How to run the dev server?

I recommend installing [Podman](https://podman.io/), then running my script [`./tooling/podman-all.sh`](./tooling/podman-all.sh). Once the dev server is running, visit <http://localhost:8000/> in your web browser.

(The script is made up of individual script invocations, which you can read if you want to learn some more about how this containerized development workflow works.)

### How do I build the site so I can deploy to Prod?

Run these two commands:

```bash
./tooling/podman-build.sh
./tooling/podman-start.sh
./tooling/podman-attach.sh yarn install
./tooling/podman-attach.sh yarn build
```

The resulting artifacts will be written to `./dist/`.

### Can I do everything without containers?

Yep!

You'll just need to install [Node.js](https://nodejs.org/) and [Yarn Berry](https://yarnpkg.com/), then run whatever combination of commands you need to get something done, like:

```bash
yarn install
yarn start
yarn build
```


## Other development tools

### Claude Code

A `CLAUDE.md` file is included.

### LaTeX

To compile the LaTeX documents, you will need:

- a `make` utility (such as *GNU make*),
- a LaTeX distribution that can support all the packages required,
- `latexmk`, and
- `pdf2svg`.

On a fresh Ubuntu system, I used this to install most of these tools:

```
$ sudo apt-get install texlive-full latexmk pdf2svg
```


## License

All original content is licensed under the [*Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA-4.0)*](http://creativecommons.org/licenses/by-sa/4.0/) license.

