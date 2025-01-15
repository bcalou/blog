function getAnswers(comments, to) {
  return (
    comments?.filter((comment) => comment.data.answering === to).reverse() || []
  );
}

module.exports = getAnswers;
