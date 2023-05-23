function link(label, href) {
  // const external = !href.startsWith("https://bastiencalou.fr");
  // const target = external ? 'target="_blank"' : '';
  return `<a href="${href}">${label}</a>`;
}

module.exports = link;
