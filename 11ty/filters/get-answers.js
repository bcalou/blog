function getAnswers(comments, to) {
  console.log(comments);
  return (
    comments?.filter((comment) => comment.data.answering === to).reverse() || []
  );
}

module.exports = getAnswers;
