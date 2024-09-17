const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const iterator = require("markdown-it-for-inline");

// Customize Markdown library and settings:
function getMarkdownLibrary(eleventyConfig) {
  const markdown = markdownIt({
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
  });

  const fenceRenderer = markdown.renderer.rules.fence;
  markdown.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const result = fenceRenderer(tokens, idx, options, env, self);

    return result.replace("<code", '<code tabindex="0"');
  };

  return markdown;
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
