const filemodule = require('./module')

filemodule(process.argv[2], process.argv[3], (err, list) => {
  if (err) console.log(err)
  else {
    list.map(e => console.log(e))
  }
})
/*
// official solution
var filterFn = require('./module')
var dir = process.argv[2]
var filterStr = process.argv[3]

filemodule(dir, filterStr, function (err, list) {
  if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach(function (file) {
    console.log(file)
  })
})

*/