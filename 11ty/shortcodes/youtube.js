function youtube(url) {
  const params = new URL(url).searchParams;

  let src = `https://www.youtube.com/embed/${params.get('v')}`;

  if (params.has('t')) {
    src += `?start=${params.get('t').replace('s', '')}`;
  }

  return `<iframe
    class="youtube"
    src="${src}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>`;
}

module.exports = youtube;
