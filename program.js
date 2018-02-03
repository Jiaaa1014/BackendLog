// 2 BABY STEPS
/*
const sum = (arr) => arr.slice(2).reduce((x, y) => Number(x) + Number(y))
console.log(sum(process.argv))
*/

// 3 MY FIRST I/O
/*
const fs = require('fs')
const filePath = process.argv[2]
const buf = fs.readFileSync(filePath)
const arr = buf.toString().split('\n')
console.log(arr.length - 1)
*/
/*
// official solution
const fs = require('fs')
const contents = fs.readFileSync(process.argv[2])
const lines = contents.toString().split('\n').length - 1
console.log(lines)
// or
fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
*/

// 4 MY FIRST ASYNC I/O
/*
const fs = require('fs')
fs.readFile(process.argv[2], function callback(err, data) {
  if (err) return err
  console.log(data.toString().split('\n').length - 1)

});
*/
/*
// official solution
const fs = require('fs')
const file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) {
    return console.log(err)
  }
  // fs.readFile(file, 'utf8', callback) can also be used
  const lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
*/


// 5 FILTERD LS
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
const fs = require('fs')
const path = require('path')

const folder = process.argv[2]
const ext = '.' + process.argv[3]

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
/*
module.js
main.js
*/

// 7 HTTP CLIENT

const http = require('http');
http.get(process.argv[2], res => {
  // not setDefaultEncoding
  // https://blog.ernest.me/post/python-setdefaultencoding-unicode-bytes
  res.setEncoding('utf8')
  res.on('data', console.log)
  res.on('error', console.error)
})
/*
// official solution
var http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
}).on('error', console.error)

*/

// Step 8
// I cannot find bl package
/*
var http = require('http')
var bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err) return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})
*/