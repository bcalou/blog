//**********************//
// EMOJI BUSINESS LOGIC //
//**********************//

const emojis = [
  "💥",
  "💋",
  "🫀",
  "👓",
  "🐸",
  "👑",
  "🐰",
  "🐼",
  "👋",
  "🐤",
  "🐱",
  "🦊",
  "🐷",
  "🙈",
  "🐝",
  "🐌",
  "🐞",
  "🐠",
  "🐢",
  "🐫",
  "🦔",
  "🦚",
  "🌹",
  "🌼",
  "⭐️",
  "🔥",
  "👀",
  "🌈",
  "💧",
  "🍉",
  "🍓",
  "🍑",
  "🥝",
  "🍆",
  "🥦",
  "🥨",
  "🧀",
  "🍔",
  "🍕",
  "🍙",
  "🎂",
  "🍭",
  "🍿",
  "🍩",
  "🍺",
  "🍹",
  "🏀",
  "🥋",
  "🏆",
  "🎟",
  "🎭",
  "🎨",
  "🎬",
  "🎹",
  "🥁",
  "🎷",
  "🎸",
  "🪗",
  "🎲",
  "🎯",
  "🎰",
  "🎳",
  "🚨",
  "🚇",
  "🚀",
  "🛸",
  "🛟",
  "🗺",
  "⛱",
  "🌋",
  "💻",
  "🖨",
  "💾",
  "🕹",
  "💿",
  "📼",
  "📸",
  "📽",
  "📠",
  "📺",
  "🧭",
  "⏰",
  "⏳",
  "💡",
  "💵",
  "💰",
  "💎",
  "🔮",
  "🧬",
  "🧻",
  "🎁",
  "🎈",
  "🎉",
  "🪩",
  "📫",
  "📚",
  "🔎",
  "🩵",
  "💯",
  "🔔",
  "👁‍🗨",
];

let mouseMoved = false;

function onMouseMove() {
  mouseMoved = true;
  window.removeEventListener("mousemove", onMouseMove);
}

const $headerImage = document.querySelector("#headerImage");

function setRandomEmoji() {
  if (!mouseMoved) return;

  $headerImage.style.setProperty(
    "--emoji",
    `"${emojis[Math.floor(Math.random() * emojis.length)]}" / ""`
  );
}

function setEmoji(emoji) {
  $headerImage.style.setProperty("--emoji", `"${emoji}" / ""`);
}

if ($headerImage) {
  if (window?.performance?.getEntries()[0]?.responseStatus === 404) {
    setEmoji("❌");
    $headerImage.dataset.forceEmojis = "true";
  } else {
    window.addEventListener("mousemove", onMouseMove);
    $headerImage.addEventListener("mouseenter", setRandomEmoji);
    setRandomEmoji();
  }
}

//******************//
// MAIL DARK MAGIC™ //
//******************//

const mail = atob("YmFzdGllbi5jYWxvdUBnbWFpbC5jb20=");
const $mail = document.querySelector("#mail");

if ($mail) {
  const $mailLink = document.createElement("a");
  $mailLink.innerHTML = $mail.innerHTML;
  $mailLink.setAttribute("href", "mailto:" + mail);
  $mail.parentNode.replaceChild($mailLink, $mail);
}
