const prod = process.env.ELEVENTY_ENV === 'prod';

function figure(src, figcaption) {
  return `<figure>
    <img src="/img/${src}" loading="lazy" decoding="async" />
    <figcaption>${figcaption}</figcaption>
  </figure>`;
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
      height="${images.jpeg.at(0).height}"
    />
  </picture>`;
}

module.exports = figure;
