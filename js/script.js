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

function isValidURL(url) {
  const regex = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
}

let submitted = false;

const handleSubmit = (event) => {
  event.preventDefault();
  submitted = true;

  const myForm = event.target;
  const formData = new FormData(myForm);

  const [name, comment, url] = [
    validateRequired(myForm.querySelector("[name=name]")),
    validateRequired(myForm.querySelector("[name=comment]")),
    validateUrl(myForm.querySelector("[name=url]")),
  ];

  if (!name || !comment || !url) {
    $form.querySelector("[aria-invalid=true]").focus();

    return false;
  }

  $form.setAttribute("aria-busy", "true");
  $form.setAttribute("inert", "true");

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      console.log("Form successfully submitted");
      $comments.classList.add("comments--success");
      Array.from($form.querySelectorAll("input, textarea"))
        .filter((input) => !["test", "form-name"].includes(input.name))
        .forEach((input) => (input.value = ""));
    })
    .catch((error) => {
      console.error(error);
      $comments.classList.add("comments--error");
    })
    .finally(() => {
      $form.removeAttribute("aria-busy");
      $form.removeAttribute("inert");
      $comments.classList.remove("comments--answering");
      $comments.scrollIntoView();
      submitted = false;
    });
};

const validateRequired = (input, errorId) => {
  if (input.value.trim().length === 0) {
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", errorId);
    return false;
  } else {
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
    return true;
  }
};

const validateUrl = (input) => {
  if (!submitted) return true;

  if (input.value.trim().length > 0 && !isValidURL(input.value.trim())) {
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", "url-format");
    return false;
  } else {
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
    return true;
  }
};

const $comments = document.querySelector(".comments");
const $form = document.querySelector("form");

if ($form) {
  $form.setAttribute("novalidate", "novalidate");
  $form.addEventListener("submit", handleSubmit);
  $comments.classList.add("comments--canAnswer");

  $form
    .querySelector("[name=name]")
    .addEventListener("input", (event) =>
      validateRequired(event.target, "name-required")
    );

  $form
    .querySelector("[name=comment]")
    .addEventListener("input", (event) =>
      validateRequired(event.target, "comment-required")
    );

  $form
    .querySelector("[name=url]")
    .addEventListener("input", (event) => validateUrl(event.target));
}

const $answeringContent = document.querySelector(".comments__answeringContent");
const $answeringInput = document.querySelector('[name="answering"]');

document.querySelectorAll("[data-answer-to]").forEach(($answerButton) =>
  $answerButton.addEventListener("click", () => {
    let comment = $answerButton.previousElementSibling.textContent;
    if (comment.length > 50) {
      comment = comment.slice(0, 50) + "...";
    }
    $answeringContent.innerHTML = comment;

    $answeringInput.value = $answerButton.getAttribute("data-answer-to");
    $comments.classList.add("comments--answering");
    $comments.classList.remove("comments--success");
    $comments.classList.remove("comments--error");

    $form.querySelector('[name="name"]').focus();
  })
);

const $answeringCancel = document.querySelector(".comments__answeringCancel");
if ($answeringCancel) {
  $answeringCancel.addEventListener("click", (event) => {
    event.preventDefault();
    $answeringInput.value = "";
    $comments.classList.remove("comments--answering");
  });
}
