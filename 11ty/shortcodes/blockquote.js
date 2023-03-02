const link = require("./link");

function blockquote(quote, author, source, href) {
  const blockquote = `<blockquote>
    <p>${quote}</p>
  </blockquote>`;

  if (author || source) {
    return `<figure class="blockquote">
      ${blockquote}
      ${getFigCaptionTag(author, source, href)}
    </figure>`
  }

  return blockquote;
}

// Generate a <figcaption> tag for the given infos
function getFigCaptionTag(author, source, href) {
  let figCaption = '';

  if (author) {
    figCaption += author;

    if (source) {
      figCaption += ', ';
    }
  }

  if (source) {
    figCaption += getCiteTag(source, href);
  }

  return `<figcaption>${figCaption}</figcaption>`;
}

// Generate a <cite> tag with an optional url associated
function getCiteTag(source, href) {
  if (href) {
    return `<cite>${link(source, href)}<cite>`
  }

  return `<cite>${source}</cite>`
}

module.exports = blockquote;
