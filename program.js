const mongo = require('mongodb').MongoClient
const age = process.argv[2]

const url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, (err, db) => {
  if (err) console.log(err)
  const parrots = db
  parrots.find({
    age: {
      $gt: +age
    }
  }).toArray((err, docs) => {
    if (err) console.log(err)
    console.log(docs)
    db.close()
  })
})
