#### 1 MONGOD
* 進階/環境變數

* /系統變數/Path/編輯/新增`C:\Program Files\MongoDB\Server\3.6\bin`當作Path之一

<!-- 關卡沒有要求以下步驟， -->
參考：[here](https://ithelp.ithome.com.tw/articles/10186324)
3. 複製`C:\Program Files\MongoDB\Server\3.6\bin`資料夾至`D:\MongoDB\data\mydb`
4. 複製`C:\Program Files\MongoDB\Server\3.6\bin`資料夾至`C:\`

```bash
$ mongod --version

# db version v3.6.2
# git version: 489d177dbd0f0420a8ca04d39fd78d0a2c539420
# OpenSSL version: OpenSSL 1.0.1u-fips  22 Sep 2016
# allocator: tcmalloc
# modules: none
# build environment:
#     distmod: 2008plus-ssl
#     distarch: x86_64
#     target_arch: x86_64
```

### 2 CONNECT

0. mkdir data

1. mongod --port 27017 --dbpath=./data.

2. run npm install mongodb.

3. 先mongod再mongo

### C9 online


### 3 FIND
執行code得到`db.collection is not a function`
`bash
$ npm uninstall mongodb  
$ npm install mongodb@2.2.33
`
```js
const mongo = require('mongodb').MongoClient
const age = process.argv[2]

const url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  db.collection('parrots')
  .find({
    age: {
      $gt: +age // + operator is used to turn it into num
    }
  }).toArray((err, docs) => {
    if (err) console.log(err)
    console.log(docs)
    db.close()
  })
})
```

### 4 FIND PROJECT
```js
const mongo = require('mongodb').MongoClient
const age = process.argv[2]

const url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  db.collection('parrots')
  .find({
    age: {
      $gt: + age // + operator is used to turn it into num
    }
  }, { // "0" means no need
      name: 1,
      age: 1,
      _id: 0
    }).toArray((err, docs) => {
      if (err) console.log(err)
      console.log(docs)
      db.close()
    })
})
```
### 5 INSERT
```js
const mongo = require('mongodb').MongoClient
const age = process.argv[2]

const url = 'mongodb://localhost:27017/learnyoumongo'
const insertObj = { firstName: process.argv[2], lastName: process.argv[3] }
mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  db.collection('docs')
  .insert(insertObj, (err, data) => {
      if (err) console.log(err)
      console.log(JSON.stringify(insertObj))
      db.close()
  })
})
```
### 6 UPDATE
```js
const mongo = require('mongodb').MongoClient
const url = `mongodb://localhost:27017/${process.argv[2]}`

mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  db.collection('users').update({ 
      username: "tinatime"       
  }, {
      $set: {
          age: 40
      }
      
  }, (err, data) => {
      if(err) throw err
    //   console.log(data)
      db.close()
  })
})
```
### 7 REMOVE
```js
const mongo = require('mongodb').MongoClient
const url = `mongodb://localhost:27017/${process.argv[2]}`

mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  db.collection(process.argv[3]).remove({
      _id: process.argv[4]
  }, (err, data) => {
      if(err) throw err;
      db.close()
  })
})
```
### 8 COUNT
```js
const mongo = require('mongodb').MongoClient
const url = `mongodb://localhost:27017/learnyoumongo`

mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  db.collection('parrots').count({
      age: {
          $gt: +process.argv[2]
      }
  }, (err, data) => {
      if(err) throw err;
      console.log(data)
      db.close()
  })
})
```

### 9 AGGREGATE
```js
const mongo = require('mongodb').MongoClient
const url = `mongodb://localhost:27017/learnyoumongo`

mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  db.collection('prices').aggregate([
      { $match: { size: process.argv[2] }},
      { $group: {
        _id: 'average', 
       average: {
          $avg: '$price'
        }
      }}
    ]).toArray((err, data) => {
      if(err) throw err
      console.log(Number(data[0].average).toFixed(2))
    })
    db.close()
})

// official solution
var mongo = require('mongodb').MongoClient
var size = process.argv[2]

var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
  if (err) throw err
  var prices = db.collection('prices')
  prices.aggregate([
    { $match: {
      size: size
    }}
  , { $group: {
      _id: 'average'
    , average: {
        $avg: '$price'
      }
    }}
  ]).toArray(function(err, results) {
    if (err) throw err
    if (!results.length) {
      throw new Error('No results found')
    }
    var o = results[0]
    console.log(Number(o.average).toFixed(2))
    db.close()
  })
})

```