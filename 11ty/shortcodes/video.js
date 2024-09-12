function video(src) {
  return `<video
    class="picture"
    autoplay
    loop
    muted
    playsinline
    src="./${src}"
    aria-label="text alternative goes here"
  ></video>`;
}

module.exports = video;
