function readableDate(date, hour) {
  if (!date) {
    return;
  }

  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: hour ? "numeric" : undefined,
    minute: hour ? "numeric" : undefined,
  });
}

module.exports = readableDate;
