const fs = require('fs')
const path = require('path')

module.exports = function (dir, ext, callback) {
  var list = []

  fs.readdir(dir, (err, files) => {
    if (err) return callback(err)
    else {
      files.map(file => {
        if (path.extname(file) === '.' + ext) list.push(file)
      })
    }
    return callback(null, list)
  })
}
/*
// official solution
var fs = require("fs");
var path = require("path");

module.exports = function (dirname, extension, callback) {
  var list = [];

  fs.readdir(dirname, function (err, files) {
    if (err) {
      return callback(err);
    }
    else {
      extension = '.' + extension
      files.forEach(function (fileName) {
        if (path.extname(fileName) === extension) {
          list.push(fileName);
        }
      })
    }
    return callback(null, list);
  })
};
*/