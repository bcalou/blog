function getComments(comments, page) {
  return comments
    .filter(
      (comment) =>
        comment.data.referrer.includes(page.url) && !comment.data.answering
    )
    .reverse();

  // pageComments.forEach((comment) => {
  //   if (comment.data.answering) {
  //     const to = pageComments.find(
  //       (comment) => comment.id === comment.data.answering
  //     );
  //     if (to) {
  //       if (!to.answers) {
  //         to.answers = [];
  //       }
  //       to.answers.push(comment);
  //     }
  //   }
  // });
}

module.exports = getComments;
