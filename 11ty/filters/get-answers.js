function getAnswers(comments, to) {
  console.log("getAnswers", comments);
  return Array.isArray(comments)
    ? comments.filter((comment) => comment.data.answering === to).reverse()
    : [];
}

module.exports = getAnswers;
