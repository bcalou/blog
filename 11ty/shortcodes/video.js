function video(src, figcaption) {
  return `<figure class="figure">
    <video
      class="picture"
      controls
      playsinline
      data-src="./${src}"
    ></video>
    <figcaption>
      Vidéo : ${figcaption.charAt(0).toLowerCase() + figcaption.slice(1)}
    </figcaption>
  </figure>`;
}

module.exports = video;
