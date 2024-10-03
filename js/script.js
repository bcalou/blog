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
  $mailLink.classList.add($mail.classList);
  $mail.parentNode.replaceChild($mailLink, $mail);
}

//******************//
// COMMENTS AJAXING //
//******************//
// from https://docs.netlify.com/forms/setup/#submit-html-forms-with-ajax

const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));
};

const $form = document.querySelector("form");
$form.addEventListener("submit", handleSubmit);

const $comments = document.querySelector(".comments");
const $answeringContent = document.querySelector(".comments__answeringContent");
const $answeringInput = $form.querySelector('[name="answering"]');

document.querySelectorAll("[data-answer-to]").forEach(($answerButton) =>
  $answerButton.addEventListener("click", () => {
    let comment = $answerButton.previousElementSibling.textContent;
    if (comment.length > 50) {
      comment = comment.slice(0, 50) + "...";
    }
    $answeringContent.innerHTML = comment;

    $answeringInput.value = $answerButton.getAttribute("data-answer-to");
    $comments.classList.add("comments--answering");

    $comments.scrollIntoView();
    setTimeout(() => {
      $form.querySelector("input").focus();
    }, 1000);
  })
);

document
  .querySelector(".comments__answeringCancel")
  .addEventListener("click", (event) => {
    event.preventDefault();
    $answeringInput.value = "";
    $comments.classList.remove("comments--answering");
  });
