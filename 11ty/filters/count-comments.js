function countComments(comments, page) {
  console.log(comments);
  return (
    comments?.filter((comment) => comment.data.referrer.includes(page.url))
      .length || 0
  );
}

module.exports = countComments;
