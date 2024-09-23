function codeLanguage(text) {
  if (!text) return;

  return text.replace(new RegExp(/\<code/, "g"), '<code lang="en"');
}

module.exports = codeLanguage;
