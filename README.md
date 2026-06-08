# Sim's Pages

## How do I use this?

### Prerequisites

You should be able to run everything on Linux, MacOS, and Windows.

You'll need to ensure these are installed and set up:

- [Podman](https://podman.io/)
- [GNU Make](https://www.gnu.org/software/make/)

### How to run the dev server?

Run `make`.

### How do I build the site so I can deploy to Prod?

Run `make all-release`. The resulting artifacts will be written to `./dist/`.

### Can I do everything without containers?

Yep! You'll just need to install [Node.js](https://nodejs.org/) and [Yarn Berry](https://yarnpkg.com/), then run whatever combination of commands you need to get something done, like `yarn install`, `yarn start`, and `yarn build`.


## Other development tools

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

