// Convert ' apostrophe to curved, french ’
function apostrophe(text) {
  if (!text) return;

  return text.replace(/(?:<code\b[^>]*>.*?<\/code>|')/gs, (match) => {
    if (match.startsWith("<code")) {
      return match; // Return the <code> block unchanged, even with attributes
    }
    return "’"; // Replace single quote with apostrophe
  });
}

module.exports = apostrophe;
