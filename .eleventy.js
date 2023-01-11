const prod = process.env.ELEVENTY_ENV === 'prod';

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const cssBrowserSupport = require("@11tyrocks/eleventy-plugin-css-browser-support");
const pluginSass = require('eleventy-sass');
const embedTwitter = require("eleventy-plugin-embed-twitter");

const blockquote = require("./11ty/shortcodes/blockquote");
const codepen = require("./11ty/shortcodes/codepen");
const figure = require("./11ty/shortcodes/figure");
const img = require("./11ty/shortcodes/img");
const link = require("./11ty/shortcodes/link");
const soundcloud = require("./11ty/shortcodes/soundcloud");
const youtube = require("./11ty/shortcodes/youtube");

const addNbsp = require("./11ty/filters/add-nbsp");
const filterTagList = require("./11ty/filters/filter-tag-list");
const getSeries = require("./11ty/filters/get-series");
const head = require("./11ty/filters/head");
const htmlDateString = require("./11ty/filters/html-date-string");
const min = require("./11ty/filters/min");
const readableDate = require("./11ty/filters/readable-date");

const getTagListCollection = require('./11ty/collections/tag-list')

const getMarkdownLibrary = require('./11ty/librairies/markdown');

const browserConfig = require('./11ty/browser-config');

module.exports = function(eleventyConfig) {

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSass, {
    sass: {
      style: prod ? "compressed" : "expanded"
    }
  });
  eleventyConfig.addPlugin(embedTwitter);
  eleventyConfig.addPlugin(cssBrowserSupport);

  // Add shortcodes
  eleventyConfig.addShortcode("blockquote", blockquote);
  eleventyConfig.addShortcode("codepen", codepen);
  eleventyConfig.addNunjucksAsyncShortcode("figure", figure);
  eleventyConfig.addNunjucksAsyncShortcode("img", img);
  eleventyConfig.addShortcode("link", link);
  eleventyConfig.addShortcode("soundcloud", soundcloud);
  eleventyConfig.addShortcode("youtube", youtube);

  // Add filters
  eleventyConfig.addFilter("addNbsp", addNbsp);
  eleventyConfig.addFilter("filterTagList", filterTagList)
  eleventyConfig.addFilter("getSeries", getSeries);
  eleventyConfig.addFilter('head', head);
  eleventyConfig.addFilter('htmlDateString', htmlDateString);
  eleventyConfig.addFilter('min', min);
  eleventyConfig.addFilter("readableDate", readableDate);

  // Add collections
  eleventyConfig.addCollection("tagList", getTagListCollection(filterTagList));

  // Add librairies
  eleventyConfig.setLibrary("md", getMarkdownLibrary(eleventyConfig));

  // Add copies
  eleventyConfig.addPassthroughCopy("assets");

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig(browserConfig);

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
