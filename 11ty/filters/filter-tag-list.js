function filterTagList(tags) {
  return (tags || []).filter(
    tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1
  ).sort((a, b) => a.localeCompare(b));
}

module.exports = filterTagList;
