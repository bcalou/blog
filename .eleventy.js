const fs = require("fs");
const prod = process.env.ELEVENTY_ENV === "prod";

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginSass = require("eleventy-sass");
const criticalCss = require("eleventy-critical-css");
const EleventyPluginOgImage = require("eleventy-plugin-og-image");

const aside = require("./11ty/shortcodes/aside");
const blockquote = require("./11ty/shortcodes/blockquote");
const codepen = require("./11ty/shortcodes/codepen");
const figure = require("./11ty/shortcodes/figure");
const img = require("./11ty/shortcodes/img");
const link = require("./11ty/shortcodes/link");
const soundcloud = require("./11ty/shortcodes/soundcloud");
const video = require("./11ty/shortcodes/video");
const youtube = require("./11ty/shortcodes/youtube");

const addNbsp = require("./11ty/filters/add-nbsp");
const apostrophes = require("./11ty/filters/apostrophes");
const codeLanguage = require("./11ty/filters/code-language");
const countComments = require("./11ty/filters/count-comments");
const comment = require("./11ty/filters/comment");
const filterTagList = require("./11ty/filters/filter-tag-list");
const getAnswers = require("./11ty/filters/get-answers");
const getComments = require("./11ty/filters/get-comments");
const getSeries = require("./11ty/filters/get-series");
const head = require("./11ty/filters/head");
const htmlDateString = require("./11ty/filters/html-date-string");
const min = require("./11ty/filters/min");
const readableDate = require("./11ty/filters/readable-date");

const getTagListCollection = require("./11ty/collections/tag-list");
const getPostsByYearCollection = require("./11ty/collections/posts-by-year");

const getMarkdownLibrary = require("./11ty/librairies/markdown");

const browserConfig = require("./11ty/browser-config");

module.exports = function (eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSass, {
    sass: {
      style: prod ? "compressed" : "expanded",
    },
  });
  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    generateHTML: (outputUrl) =>
      `<meta property="og:image" content="https://bastiencalou.fr${outputUrl}" /><meta name="twitter:image" content="https://bastiencalou.fr${outputUrl}" />`,
    satoriOptions: {
      fonts: [
        {
          name: "Euclid",
          data: fs.readFileSync(
            "./assets/fonts/EuclidCircularB-Semibold-WebS.ttf"
          ),
        },
      ],
    },
  });
  if (prod) {
    eleventyConfig.addPlugin(criticalCss, {
      height: 1080,
      width: 1920,
    });
  }

  // Add shortcodes
  eleventyConfig.addPairedShortcode("aside", aside);
  eleventyConfig.addShortcode("blockquote", blockquote);
  eleventyConfig.addShortcode("codepen", codepen);
  eleventyConfig.addNunjucksAsyncShortcode("figure", figure);
  eleventyConfig.addNunjucksAsyncShortcode("img", img);
  eleventyConfig.addShortcode("link", link);
  eleventyConfig.addShortcode("soundcloud", soundcloud);
  eleventyConfig.addShortcode("video", video);
  eleventyConfig.addShortcode("youtube", youtube);

  eleventyConfig.addAsyncShortcode(`inlineImage`, async (path) => {
    let extension = path.extname(path).slice(1);
    let imgPath = path.join(config.dir.input, path);
    let base64Image = await fs.readFile(imgPath, `base64`);

    if (extension === `svg`) {
      extension = `svg+xml`;
    }

    return `data:image/${extension};base64,${base64Image}`;
  });

  // Add filters
  eleventyConfig.addFilter("addNbsp", addNbsp);
  eleventyConfig.addFilter("apostrophes", apostrophes);
  eleventyConfig.addFilter("codeLanguage", codeLanguage);
  eleventyConfig.addFilter("comment", comment);
  eleventyConfig.addFilter("countComments", countComments);
  eleventyConfig.addFilter("filterTagList", filterTagList);
  eleventyConfig.addFilter("getAnswers", getAnswers);
  eleventyConfig.addFilter("getComments", getComments);
  eleventyConfig.addFilter("getSeries", getSeries);
  eleventyConfig.addFilter("head", head);
  eleventyConfig.addFilter("htmlDateString", htmlDateString);
  eleventyConfig.addFilter("min", min);
  eleventyConfig.addFilter("readableDate", readableDate);

  // Add collections
  eleventyConfig.addCollection("tagList", getTagListCollection(filterTagList));
  eleventyConfig.addCollection("postsByYear", getPostsByYearCollection());

  // Add librairies
  eleventyConfig.setLibrary("md", getMarkdownLibrary(eleventyConfig));

  // Add copies
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy({ "blog/**/*.webm": "webm" });

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig(browserConfig);

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

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
      output: "_site",
    },
  };
};
