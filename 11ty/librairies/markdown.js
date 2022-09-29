const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// Customize Markdown library and settings:
function getMarkdownLibrary(eleventyConfig) {
  return markdown = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
      level: [1,2,3,4],
    }),
    slugify: eleventyConfig.getFilter("slug")
  });
}

module.exports = getMarkdownLibrary;