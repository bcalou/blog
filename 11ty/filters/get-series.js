// Get the posts matching the title of the given series
function getSeries(posts, series) {
  return series ? posts.filter(post => post.data.series === series) : [];
}

module.exports = getSeries;