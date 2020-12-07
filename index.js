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
    if (sortQuery.sort) {
      return sortQuery.sort.split(",").join(" ");
    }
  },
  select: (selectQuery) => {
    if (selectQuery.select) {
      return selectQuery.select.split(",").join(" ");
    }
  },
};

const random = {
  num: (from, to) => {
    return Math.round(Math.random() * (to - from) + from);
  },
  char: (length, isCapital) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return isCapital ? result.toUpperCase() : result;
  },
};

const hash = {
  sign: (char, num) => {
    let fakeNumber = "abcdefghijklmnopqrstuvwxyz";
    let letters = "abcdefghijklmnopqrstuvwxyz" + fakeNumber.slice(0, num);
    let lenthOfChar = char.length;
    let arrayOfChar = [];
    let result = num + "";

    for (let i = 0; i < lenthOfChar; i++) {
      arrayOfChar.push(char[i]);
    }

    for (let z = 0; z < arrayOfChar.length; z++) {
      for (let j = 0; j < letters.length - num; j++) {
        if (arrayOfChar[z] == letters[j]) {
          result += letters[j + num];
        }
      }
    }
    return result;
  },

  design: (char) => {
    hashNum = parseInt(char[0], 10);
    let fakeNumber = "abcdefghijklmnopqrstuvwxyz";
    let letters = fakeNumber.slice(-hashNum) + "abcdefghijklmnopqrstuvwxyz";
    let lenthOfChar = char.length;
    let arrayOfChar = [];
    let result = "";
    console.log(letters);
    for (let i = 0; i < lenthOfChar; i++) {
      arrayOfChar.push(char[i]);
    }

    for (let z = 0; z < arrayOfChar.length; z++) {
      for (let j = 0; j < letters.length + hashNum; j++) {
        if (arrayOfChar[z] == letters[j]) {
          result += letters[j - hashNum];
        }
      }
    }
    return result;
  },
};

console.log(hash.design("3ghylonlqjgrp"));

module.exports = { isEmpty, paginateIt, handler, random };
