---
title: "Code test"
date: 2019-06-26
layout: layouts/post.njk
---

CSS / SCSS

```scss
.book {
  /* The books will be contained inside a square of this dimension */
  --base-size: 250;
  --base-size-rem: calc(var(--base-size) * 0.0625rem);

  @include medium {
    --base-size: 350;
  }
}
```

```css
.book {
  --is-portrait: clamp(
    0,
    calc((var(--height) - var(--width)) * 999),
    1
  );
}
```


```css
clamp(0, 0.2, 1); /* 0.2, car c'est entre les bornes */
clamp(0, -15, 1); /* 0, car le chiffre du milieu est trop petit */
clamp(0, 4, 1); /* 1, car le chiffre du milieu est trop grand */
```

```css
.book {
  /* Height is base size if portrait, based on size ratio otherwise */
  --height-rem: clamp(
    calc(var(--is-portrait) * var(--base-size-rem)),
    calc(var(--base-size-rem) / (var(--width) / var(--height))),
    var(--base-size-rem)
  );
}
```

```css
var(--is-portrait) * var(--base-size-rem)
```

```css
var(--base-size-rem) / (var(--width) / var(--height))
```

```scss
@mixin supports-clamp {
  @supports (width: clamp(0px, 1px, 2px)) {
    @content;
  }
}
```

```scss
@mixin supports-clamp {
  @supports (width: clamp(0px, 1px, 2px)) {
    @content;
  }
}
```

```css
ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  margin-right: 2em;
}
```

```css
li:not(:last-child) {
  margin-right: 2em;
}
```

```css
li:not(:first-child) {
  margin-left: 2em;
}
```

```css
li:not(:first-flex-row-item) {
  /* N'existe pas */
}
```

```css
li {
  margin-left: 2em;
}
```

```css
ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: -2em;
}

li {
  margin-left: 2em;
}
```

```css
li {
  margin-left: 2em;
  margin-top: 1em;
}
```

```css
ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: -2em;
  margin-top: -1em;
}
```

```css
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1em 2em; /* row-gap + column-gap */
}

/* Plus de style sur les items eux-mêmes */
```

```css
@supports (gap: 1em 2em) {
  /* Désactiver les astuces et utiliser la solution propre */
}
```


```css
:root {
  accent-color: crimson;
}
```

```css
body {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

```css
div {
  --size: 2em;
  width: calc(-1 * var(--size)); /* -2em */
}
```

```css
body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```
```css
my-component::before {
  content: "";
}
```


```css
my-component {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

```css
.u-flex {
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--row-gap));
  margin-left: calc(-1 * var(--column-gap));
}

.u-flex > * {
  margin-top: var(--row-gap);
  margin-left: var(--column-gap);
}
```

```css
:root {
  --row-gap: 1em;
  --column-gap: 2em;
}
```


```css
my-component {
  display: contents;
}
```

```css
html,
body {
  background-color: white;
}
```

```css
html {
  background-color: rgba(255, 255, 255, 0.01);
}

body {
  background-color: white;
}
```


```css
body {
  background-color: white;
}

h1 {
  color: green;
  mix-blend-mode: difference;
}
```

```css
my-component {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

main {
  margin: auto 0;
}
```

```css
button:active {
  background-color: black;
  color: white;
}
```

```css
} /* h1.title, h2.title, h3.title */
.title:is(h1, h2, h3) { }

/* exclusions multiples */
.title:not(h1, h2) { }

/* sélecteur de parent */
section:has(img, figure) { }
```

```css
button:active {
  background-color: black;
  color: white;
}

button:focus-visible {
  background-color: black;
  color: white;
}
```

```css
.covfefe:not(div),
h1 {
  color: red;
}
```

```css
button:active,
button:focus-visible {
  background-color: black;
  color: white;
}
```

```css
body {
  background-color: yellow;
}
```

```css
html {
  background-color: green;
}

body {
  background-color: yellow;
}
```

```css
h1 {
  color: green;
  mix-blend-mode: difference;
}
```

```css
body {
  background-color: white;
}
```

```css
html,
body {
  border: 3px dashed black;
}
```

```css
body {
  background-color: lightblue;
}
```

```css
body {
  background-color: white;
}
```


```css
h1::after {
  content: "Hello from the other side";
  position: absolute;
  bottom: 50px;
  right: 50px;
}
```


```css
ul {
  --row-gap: 1em;
  --column-gap: 2em;
}
```


JS

```js
const images = await Image(`src/img/${book.fileSlug}.jpg`, {
  widths: [350, 700, null],
  formats: ["avif", "webp", "jpeg"],
  outputDir: "_site/img",
});
```

```js
return `<picture class="book__cover">
  ${sources}
  <img
    src="${url}"
    alt="${alt}"
    loading="lazy"
    decoding="async"
  />
</picture>`;
```


```js
if (prod) {
  eleventyConfig.addPlugin(criticalCss, {
    assetPaths: ["_site/index.html"],
    minify: true,
  });
}
```

```js
return `<picture class="book__cover">
  ${sources}
  <img
    src="${url}"
    alt="${alt}"
    loading="lazy"
    decoding="async"
  />
</picture>`;
```


```js
eleventyConfig.addLiquidShortcode("bookImage", bookImage);

async function bookImage(book) {
  return "<p>Hello world !</p>";
}
```

```js
eleventyConfig.addCollection("itemsAscending", (collection) =>
  collection.getFilteredByGlob("src/items/*.md").sort((a, b) => {
    if (a.data.title > b.data.title) return 1;
    else if (a.data.title < b.data.title) return -1;
    else return 0;
  })
);
```

```js
const prod = process.env.ELEVENTY_ENV === "prod";

eleventyConfig.addPlugin(sass, {
  watch: "src/styles/**/*.scss",
  outputDir: "_site/css",
  cleanCSS: prod,
  sourcemaps: !prod,
});
```

```js
eleventyConfig.addPlugin(babel, {
  watch: "src/js/script.js",
  outputDir: "_site/js",
  uglify: prod,
});
```

MD

```yaml
---
width: 17
height: 23.5
pages: 488
offset: true
---
```

```yaml
---
tags: book
title: Dune
author: Frank Herbert
year: 1965
width: 10
height: 17
pages: 896
color: "#cf5441"
publisher: Pocket
link: https://www.lisez.com/livre-de-poche/dune/9782266320481
description: Ce pavé a la réputation d'être un peu chiant, et oui, bon, peut-être, faut rentrer dedans comme on dit...
---
```

LIQUID / HTML

```liquid
{% raw %}<img style="width: {{ item.data.width * 10 }}px" />{% endraw %}
```

```liquid
{% raw %}<div
  class="book {% if item.data.offset %}book--offset{% endif %}"
  style="
      --width: {{ item.data.width }};
      --height: {{ item.data.height }};
      --pages: {{ item.data.pages }};
    "
></div>
{% endraw %}
```

```liquid
{% raw %}<main class="items">
  {%- for item in collections.itemsAscending -%}
    {% include src/partials/item %}
  {%- endfor -%}
</main>{% endraw %}
```

```liquid
{% raw %}<h2 class="item__title">{{ item.data.title }}</h2>
{% if item.data.subtitle %}
  <h3 class="item__subtitle">{{ item.data.subtitle }}</h3>
{% endif %}{% endraw %}
```

```html
<article>
  <h1>Hello World</h1>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>Front-end dev</li>
    <li>Web</li>
  </ul>
  <p>Lorem ipsum...</p>
</article>
```

```html
<ul class="u-flex">
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Front-end dev</li>
  <li>Web</li>
</ul>
```

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>
```

```html
<details>
  <summary>HTML</summary>
  HTML is an acronym for HyperText Markup Language.
  It was created by Tim Berners-Lee in 1989.
</details>
```




```html
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

```html
<body>
  <header></header>
  <my-component>
    <main></main>
    <footer></footer>
  </my-component>
</body>
```


```html
<body>
  <header></header>
  <!-- <my-component> -->
  <main></main>
  <footer></footer>
  <!-- </my-component> -->
</body>
```

```html
<img loading="lazy" />
```

```html
<img loading="lazy" decoding="async" />
```

```html
<picture class="book__cover">
  <source
    type="image/avif"
    srcset="dist/smile_350.avif 350w, dist/smile_700.avif 700w"
    sizes="(min-width: 32em) 21.875rem, 15.625rem"
  />
  <source
    type="image/webp"
    srcset="dist/smile_350.webp 350w, dist/smile_700.webp 700w"
    sizes="(min-width: 32em) 21.875rem, 15.625rem"
  />
  <source
    type="image/jpeg"
    srcset="dist/smile_350.jpg 350w, dist/smile_700.jpg 700w"
    sizes="(min-width: 32em) 21.875rem, 15.625rem"
  />
  <img
    loading="lazy"
    decoding="async"
    src="dist/smile_350.jpg"
    alt="Couverture de Smile"
  />
</picture>
```

```liquid
{% raw %}{% bookImage item %}{% endraw %}
```


```html
<link
  href="./css/styles.css"
  rel="stylesheet"
  media="print"
  onload="this.media='all'"
/>
```


```html
<script async src="./dist/script.js"></script>
```

```css
body {
  background-color: white;
}
```

```css
body {
  background-color: white;
  color: black;
}
```

```html
<button>Click me</button>
```

```html
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

```html
<iframe src="..." width="100%" height="300px"></iframe>
```
