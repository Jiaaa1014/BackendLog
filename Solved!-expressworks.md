```js
// 1 HELLO WORLD
const express = require('express')
const app = express()

app.get('/home', (req, res) => {
  res.end('Hello World!')
}).listen(process.argv[2])
```

```js
// 2 STATIC
const express = require('express')
const path = require("path")
const app = express()
// resolve() or join()
// 放靜態檔案的資料夾位子，argv[3]沒有則設定路徑為"./public"
app.use(express.static(process.argv[3] || path.resolve(__dirname, 'public')))
  .listen(process.argv[2])
```

```js
// 3 PUG
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.get('/home', (req, res) => {
  res.render(process.argv[3], { date: new Date().toDateString() })
}).listen(process.argv[2])

// official solution
var express = require('express')
var app = express()
app.set('view engine', 'pug')
app.set('views', process.argv[3])
app.get('/home', function(req, res) {
  res.render('index', {date: new Date().toDateString()})
})
app.listen(process.argv[2]
```

```js
// 4 GOOD OLD FORM
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.post('/form', (req, res) => {
  res.send(req.body.str.split('').reverse().join(''))
}).listen(process.argv[2])
```

```js
// 5 STYLISH CSS
const express = require('express')
const app = express()
const stylus = require('stylus')

app.use(stylus.middleware(process.argv[3]), express.static(process.argv[3])).listen(process.argv[2])
```

```js
// 6 PARAM PAM PAM
const express = require('express')
const crypto = require('crypto')
const app = express()

app.put('/message/:id', (req, res) => {
  const id = req.params.id
  res.send(crypto.createHash('sha1').update(new Date().toDateString() + id).digest('hex'))
}).listen(process.argv[2])

```

```js
// 7 WHAT'S IN QUERY
const express = require('express')
const app = express()

app.get('/search', (req, res) => {
  return res.send(req.query)
  // res.end()
}).listen(process.argv[2])
```

```js
// 8 JSON ME
const express = require('express')
const fs = require('fs')
const app = express()

app.get('/books', (req, res) => {
  fs.readFile(process.argv[3], (error, data) => {
    if (error) return res.sendStatus(500)
    res.json(JSON.parse(data))
  })
}).listen(process.argv[2])

// official solution
var express = require('express')
var app = express()
var fs = require('fs')

app.get('/books', function (req, res) {
  var filename = process.argv[3]
  fs.readFile(filename, function (e, data) {
    if (e) return res.sendStatus(500)
    try {
      books = JSON.parse(data)
    } catch (e) {
      res.sendStatus(500)
    }
    res.json(books)
  })
})

app.listen(process.argv[2])
```
