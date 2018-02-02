// Step 2
/*
var sum = (arr) => arr.slice(2).reduce((x, y) => Number(x) + Number(y))
console.log(sum(process.argv))
*/

// Step 3
/*
var fs = require('fs')
var filePath = process.argv[2]
var buf = fs.readFileSync(filePath)
var arr = buf.toString().split('\n')
console.log(arr.length - 1)
*/
/*
// official solution
var fs = require('fs')
var contents = fs.readFileSync(process.argv[2])
var lines = contents.toString().split('\n').length - 1
console.log(lines)
// or
fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
*/

// Step4
/*
var fs = require('fs')
fs.readFile(process.argv[2], function callback(err, data) {
  if (err) return err
  console.log(data.toString().split('\n').length - 1)

});
*/
/*
// official solution
var fs = require('fs')
var file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) {
    return console.log(err)
  }
  // fs.readFile(file, 'utf8', callback) can also be used
  var lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
*/


// Step 5
/*
const fs = require('fs')
const path = require('path')
fs.readdir(process.argv[2], (err, list) => {
  list.map(file => {
    if (path.extname(file) === '.' + process.argv[3]) console.log(file)
  })
})
*/
/*
// official solution
var fs = require('fs')
var path = require('path')

var folder = process.argv[2]
var ext = '.' + process.argv[3]

fs.readdir(folder, function (err, files) {
  if (err) return console.error(err)
  files.forEach(function (file) {
    if (path.extname(file) === ext) {
      console.log(file)
    }
  })
})
*/

// Step 6