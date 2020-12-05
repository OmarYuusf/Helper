// check if array is empty
const isEmpty = (array) => {
  if (array === undefined || array.length == 0) {
    return true;
  } else {
    return false;
  }
};

const paginateIt = async (page, limit, model) => {
  var page = parseInt(page, 10) || 1;
  var limit = parseInt(limit, 10) || 10;
  var startIndex = (page - 1) * limit;

  var endIndex = page * limit;
  var total = await model.countDocuments();

  var pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  return { pagination, startIndex, limit };
};

const handler = {
  sort: (sortQuery) => {
    if (sortQuery) {
      return sortQuery.select.split(",").join(" ");
    }
  },
  select: (selectQuery) => {
    if (selectQuery) {
      return selectQuery.select.split(",").join(" ");
    }
  },
};

module.exports = { isEmpty, paginateIt, handler };
