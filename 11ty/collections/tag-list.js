// Create an array of all tags
function getTagListCollection(filterTagList) {
  return tagList = (collection) => {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  }
}

module.exports = getTagListCollection;
