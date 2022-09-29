function filterTagList(tags) {
  return (tags || []).filter(
    tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1
  );
}

module.exports = filterTagList;
