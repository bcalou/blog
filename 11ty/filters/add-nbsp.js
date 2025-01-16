// Add non breakable spaces where necessary
function addNbsp(text) {
  if (!text) {
    return undefined;
  }

  return text
    .replace(new RegExp(/\s\!/, "g"), "&nbsp;!")
    .replace(new RegExp(/\s\?/, "g"), "&nbsp;?")
    .replace(new RegExp(/\s\:/, "g"), "&nbsp;:")
    .replace(new RegExp(/\s\;/, "g"), "&nbsp;;")
    .replace(new RegExp(/\«\s/, "g"), "«&nbsp;")
    .replace(new RegExp(/\s\»/, "g"), "&nbsp;»")
    .replace(new RegExp(/\s\%/, "g"), "&nbsp;%")
    .replace(new RegExp(/\s\Ko/, "g"), "&nbsp;Ko");
}

module.exports = addNbsp;
