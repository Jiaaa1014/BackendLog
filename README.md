
```js
// 1 HELLO WORLD
console.log('HELLO WORLD')
```

```js
// 2 BABY STEPS
const sum = (arr) => arr.slice(2).reduce((x, y) => Number(x) + Number(y))
console.log(sum(process.argv))
```

```js
// 3 MY FIRST I/O
// utf8 is optional
const fs = require('fs')
console.log(fs.readFileSync(process.argv[2], 'utf8').toString().split('\n').length - 1)

// official solution
const fs = require('fs')
const contents = fs.readFileSync(process.argv[2])
const lines = contents.toString().split('\n').length - 1
console.log(lines)
```

```js
// 4 MY FIRST ASYNC I/O
const fs = require('fs')
fs.readFile(process.argv[2], 'utf-8', function callback(err, data) {
  if (err) return err
  console.log(data.toString().split('\n').length - 1)
});

// official solution
const fs = require('fs')
const file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) return console.log(err)
  // fs.readFile(file, 'utf8', callback) can also be used
  const lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
```

```js
// 5 FILTERD LS
const fs = require('fs')
const path = require('path')
fs.readdir(process.argv[2], (err, list) => {
  list.map(file => {
    if (path.extname(file) === '.' + process.argv[3]) console.log(file)
  })
})

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
```

```
// 6 MAKE IT MODULAR 
learnyounode challenge6
 |
 --module.js
 --main.js
```

```js
// 7 HTTP CLIENT
const http = require('http');
http.get(process.argv[2], res => {
  // not setDefaultEncoding
  // https://blog.ernest.me/post/python-setdefaultencoding-unicode-bytes
  res.setEncoding('utf8')
  res.on('data', console.log)
  res.on('error', console.error)
})
// official solution
var http = require('http')
http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
}).on('error', console.error)
```

```js
// 8 HTTP COLLECT
var http = require('http')
var bl = require('bl')
http.get(process.argv[2], (res) => {
  res.pipe(bl(function (err, data) {
    if (err) return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})
```

```js
// 9 JUGGLING ASYNC
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
      count ++

      if (count === 3) results.map(result => console.log(result))
    }))
  })
}

while (countURL < 3) {
  httpGet(countURL)
  countURL ++
}

// official solution
var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++) {
    console.log(results[i])
  }
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err)
      }

      results[index] = data.toString()
      count++

      if (count === 3) {
        printResults()
      }
    }))
  })
}

for (var i = 0; i < 3; i++) {
  httpGet(i)
}
```

```js
// 10  TIME SERVER 
const net = require('net')

const complementZero = num => {
  return num < 10 ? '0' + num : num
}

const time = new Date();
const mnth = complementZero(time.getMonth() + 1)
const date = complementZero(time.getDate())
const hors = complementZero(time.getHours())
const mins = complementZero(time.getMinutes())

const putTogether = time.getFullYear() + `-${mnth}-${date} ${hors}:${mins}`


net.createServer(socket => {
  socket.write(putTogether)
  socket.end('\n')
}).on('error', err => console.warn(err)).listen(process.argv[2])

// official solution
var net = require('net')
function zeroFill (i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  var d = new Date()
  return d.getFullYear() + '-' +
    zeroFill(d.getMonth() + 1) + '-' +
    zeroFill(d.getDate()) + ' ' +
    zeroFill(d.getHours()) + ':' +
    zeroFill(d.getMinutes())
}

var server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))
```

```js
// 11  HTTP FILE SERVER
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  fs.createReadStream(process.argv[3]).pipe(res)
}).listen(process.argv[2])

// official solution
var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))
```

```js
// 12 HTTP UPPERCASERER
const map = require('through2-map')
const http = require('http')
http.createServer((req, res) => {
  return req.pipe(map(data => data.toString().toUpperCase())).pipe(res)
}).listen(process.argv[2])

// other's solution
// https://gist.github.com/nobitagit/bd4c0aa185926056873af47fa266650d
const http = require('http');
const map = require('through2-map');

const PORT = process.argv[2];

const uppercase = map(str => str.toString().toUpperCase());

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(uppercase).pipe(res);
  }  else {
    res.end();
  }

});

server.listen(PORT);


// official solution
var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n')
  }

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))
```

```js
// 13  HTTP JSON API SERVER
const http = require('http')
const url = require('url')

const routes = {
  parseTime: '/api/parsetime',
  unixTime: '/api/unixtime'
}
const response = {
  hors: 0,
  mins: 0,
  secs: 0
}

http.createServer((req, res) => {
  if (req.method !== 'GET') res.end()

  const reqURL = url.parse(req.url, true)
  const date = new Date(reqURL.query.iso)

  if (reqURL.pathname === routes.parseTime) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      // hors mins secs cannot work
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }))
    return;
  }

  if (reqURL.pathname === routes.unixTime) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      // return secondssss 
      unixtime: date.getTime()
    }))
    return;
  }

  res.end()
}).listen(process.argv[2])

// official solution

var http = require('http')
var url = require('url')

function parsetime(time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime(time) {
  return { unixtime: time.getTime() }
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)
  var result

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
```