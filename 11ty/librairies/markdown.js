const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const iterator = require("markdown-it-for-inline");

// Customize Markdown library and settings:
function getMarkdownLibrary(eleventyConfig) {
  return (markdown = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink({
      placement: "after",
      class: "directLink",
      symbol: "#",
      level: [1, 2, 3, 4],
    }),
    slugify: eleventyConfig.getFilter("slug"),
  }));
  // .use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
  //   const aIndex = tokens[idx].attrIndex('target');
  //   const href = tokens[idx].attrs.find(attr => attr[0] === "href")[1];

  //   if (!href.startsWith('https://bastiencalou.fr') && !href.startsWith('#')) {
  //     if (aIndex < 0) {
  //       tokens[idx].attrPush(['target', '_blank']);
  //     } else {
  //       tokens[idx].attrs[aIndex][1] = '_blank';
  //     }
  //   }
  // })
}

module.exports = getMarkdownLibrary;
