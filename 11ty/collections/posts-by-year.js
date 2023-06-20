// Create an array grouping the posts by year of publication
function getPostByYearCollection() {
  return postsByYear = (collection) => {
    const years = [];
    let currentYear;

    collection.getAllSorted().reverse().forEach(post => {
      if (post.data.tags) {

        const year = post.date.getFullYear();
        if (year !== currentYear) {
          years.push([]);
          currentYear = year;
        }

        years.at(-1).push(post);
      }
    });

    return years;
  }
}

module.exports = getPostByYearCollection;
