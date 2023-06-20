function readableDate(date) {
  if (!date) {
    return;
  }

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

module.exports = readableDate;
