// Create an array grouping the posts by year of publication
function getPostByYearCollection() {
  return (postsByYear = (collection) => {
    const years = [];
    let currentYear;

    collection
      .getAllSorted()
      .reverse()
      .forEach((post) => {
        if (post.data.tags) {
          const year = post.date.getFullYear();

          if (year !== currentYear) {
            years.push({ posts: [], tags: [] });
            currentYear = year;
          }

          years.at(-1).posts.push(post);
          years.at(-1).tags.push(...post.data.tags);
        }
      });

    return years;
  });
}

module.exports = getPostByYearCollection;
