function countComments(comments, page) {
  return comments.filter((comment) => comment.data.referrer.includes(page.url))
    .length;
}

module.exports = countComments;
