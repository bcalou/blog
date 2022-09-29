  // Return the smallest number argument
function min(...numbers) {
  return Math.min.apply(null, numbers)
}

module.exports = min;