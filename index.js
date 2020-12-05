// check if array is empty
const isEmpty = (array) => {
  if (array === undefined || array.length == 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isEmpty };
