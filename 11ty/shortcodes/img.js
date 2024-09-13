const Image = require("@11ty/eleventy-img");
const prod = process.env.ELEVENTY_ENV === "prod";

async function img(src, alt, ctx) {
  const context = ctx || this.ctx;
  const filePathStem = context.page.filePathStem;
  const fileDirectory = filePathStem.substr(1, filePathStem.lastIndexOf("/"));
  const path = fileDirectory + src;

  return await getPictureTag({
    path,
    dimensions: src.includes("gif") ? [390, 780] : [390, 780, 1560],
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
    ? images.gif
    : prod
    ? images.webp
    : images.jpeg;

  const sources = Object.values(images)
    .map((imageFormat) => getSourceTag(imageFormat, 1800, options.sizes))
    .join("\n");

  const ratio = referenceImg.at(-1).width / referenceImg.at(-1).height;
  const width = Math.min(referenceImg.at(-1).width / 2, 780)
  const height = Math.round(width / ratio);

  return `<picture class="picture">
    ${sources}
    <img
      src="${referenceImg[0].url}"
      alt="${options.alt}"
      ${options.lazy ? 'loading="lazy" decoding="async"' : ""}
      width="${width}"
      height="${height}"
    />
  </picture>`;
}

function getFormats(isAnimated) {
  if (isAnimated) {
    return prod ? ["gif", "webp"] : ["gif"];
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
