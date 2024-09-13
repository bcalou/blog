const img = require('./img');
const link = require('./link');

async function figure(src, alt, figcaption, href, lazy) {
  return `<figure class="figure">
    ${await img(src, alt, lazy, this.ctx)}
    <figcaption>
      ${href ? `Source : ${link(figcaption, href)}` : figcaption}
    </figcaption>
  </figure>`;
}

module.exports = figure;
