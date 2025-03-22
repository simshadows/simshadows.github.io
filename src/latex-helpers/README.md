# latex-helpers

There are two ways to render a Latex equation:

**Option 1:** Through code blocks such as:

````markdown
```latex-eq
a^2 + b^2 = c^2
```
````

**Option 2:** Through JSX components such as:

```javascript
<DisplayLatex code="
    a^2 + b^2 = c^2
" />
```

Both continue to be supported since code blocks are much cleaner, but JSX components are more flexible in allowing more parameters and are more convenient in other context such as within other components. The JSX components can also import image assets thanks to Vite, which is necessary for some Latex macros.
