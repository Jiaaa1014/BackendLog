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