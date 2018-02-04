const http = require('http')
const bl = require('bl')
const results = []
let count = 0;
let countURL = 0;
var httpGet = i => {
  http.get(process.argv[2 + i], res => {
    res.pipe(bl((err, data) => {
      if (err) console.log(err)

      results[i] = data.toString()
      count++

      if (count === 3) results.map(result => {
        console.log(result)
      })
    }))
  })
}

while (countURL < 3) {
  httpGet(countURL)
  countURL++
}