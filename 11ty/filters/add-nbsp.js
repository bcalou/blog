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
    .replace(new RegExp(/\s\Ko/, "g"), "&nbsp;Ko")
    .replace(new RegExp(/(\d)\s(\d\d\d)/, "g"), "$1&nbsp;$2");
}

module.exports = addNbsp;
