const Image = require("@11ty/eleventy-img");
const prod = process.env.ELEVENTY_ENV === "prod";

async function img(src, alt, ctx) {
  const context = ctx || this.ctx;
  const filePathStem = context.page.filePathStem;
  const fileDirectory = filePathStem.substr(1, filePathStem.lastIndexOf("/"));
  const path = fileDirectory + src;

  return await getPictureTag({
    path,
    dimensions: [390, 780, 1560],
    lazy: true,
    sizes: "(max-width: 48em) 100vw, 48rem",
    animated: src.includes("gif"),
    alt,
  });
}

async function getPictureTag(options) {
  const images = await Image(options.path, {
    widths: prod ? options.dimensions : [null],
    formats: getFormats(options.animated),
    outputDir: "_site/img",
    sharpOptions: {
      animated: options.animated,
    },
  });

  const referenceImg = options.animated
    ? images.gif[0]
    : prod
    ? images.webp[0]
    : images.jpeg[0];
  const sources = Object.values(images)
    .map((imageFormat) => getSourceTag(imageFormat, 1800, options.sizes))
    .join("\n");

  return `<picture class="picture">
    ${sources}
    <img
      src="${referenceImg.url}"
      alt="${options.alt}"
      ${options.lazy ? 'loading="lazy" decoding="async"' : ""}
    />
  </picture>`;
}

function getFormats(isAnimated) {
  if (isAnimated) {
    return prod ? ["webp", "gif"] : ["gif"];
  } else {
    return prod ? ["avif", "webp"] : ["jpeg"];
  }
}

// Generate a <source> tag for the given image format
function getSourceTag(imageFormat, maxWidth, sizes) {
  const srcset = imageFormat
    .filter((format) => format.width <= maxWidth)
    .map((entry) => entry.srcset)
    .join(", ");

  return `<source
    type="${imageFormat[0].sourceType}"
    srcset="${srcset}"
    ${sizes ? `sizes="${sizes}"` : ""}
  >`;
}

module.exports = img;
