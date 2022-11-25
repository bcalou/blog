function filterTagList(tags) {
  return (tags || []).filter(
    tag => ["all", "nav", "blog"].indexOf(tag) === -1
  ).sort((a, b) => a.localeCompare(b));
}

module.exports = filterTagList;
