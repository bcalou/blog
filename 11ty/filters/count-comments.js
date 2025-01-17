function countComments(comments, page) {
  return Array.isArray(comments)
    ? comments.filter((comment) => comment.data.referrer.includes(page.url))
        .length
    : 0;
}

module.exports = countComments;
