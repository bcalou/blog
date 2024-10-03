function comment(text) {
  const urlPattern = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  return text.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
}

module.exports = comment;
