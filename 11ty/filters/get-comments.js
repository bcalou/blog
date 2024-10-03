function getComments(comments, page) {
  return comments.filter(comment => comment.data.referrer.includes(page.url));
}

module.exports = getComments;
