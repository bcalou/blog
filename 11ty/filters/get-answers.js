function getAnswers(comments, to) {
  return Array.isArray(comments)
    ? comments.filter((comment) => comment.data.answering === to).reverse()
    : [];
}

module.exports = getAnswers;
