const Image = require('@11ty/eleventy-img');
const prod = process.env.ELEVENTY_ENV === 'prod';

async function img(src, alt) {
  return await getPictureTag({
    path: `img/${src}`,
    dimensions: [390, 780, 1560],
    lazy: true,
    sizes: "(max-width: 48em) 100vw, 48rem",
    alt
  });
}

async function getPictureTag(options) {
  const images = await Image(options.path, {
    widths: prod ? options.dimensions : [null],
    formats: prod ? ['avif', 'webp', 'jpeg'] : ['jpeg'],
    outputDir: '_site/img',
  });

  const url = images.jpeg[0].url;
  const sources = Object.values(images)
    .map((imageFormat) => getSourceTag(imageFormat, 1800, options.sizes))
    .join('\n');

  return `<picture>
    ${sources}
    <img
      src="${url}"
      alt="${options.alt}"
      ${options.lazy ? 'loading="lazy" decoding="async"': ''}
      width="${images.jpeg.at(0).width}"
    />
  </picture>`;
}

// Generate a <source> tag for the given image format
function getSourceTag(imageFormat, maxWidth, sizes) {
  const srcset = imageFormat
    .filter((format) => format.width <= maxWidth)
    .map((entry) => entry.srcset)
    .join(', ');

  return `<source
    type="${imageFormat[0].sourceType}"
    srcset="${srcset}"
    ${sizes ? `sizes="${sizes}"` : ''}
  >`;
}

module.exports = img;