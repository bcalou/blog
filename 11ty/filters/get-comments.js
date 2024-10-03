function getComments(comments, page) {
  return comments.filter(comment => comment.data.referrer.includes(page.url)).reverse();
}

module.exports = getComments;
