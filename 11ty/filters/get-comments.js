function getComments(comments, page) {
  return Array.isArray(comments)
    ? comments
        .filter(
          (comment) =>
            comment.data.referrer.includes(page.url) && !comment.data.answering
        )
        .reverse()
    : [];
}

module.exports = getComments;
