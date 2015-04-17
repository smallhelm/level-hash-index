# What it does

Store any string into level, and get a collision free hash of that value that you can use in an index or something.

For example if you put in the values `hello`, `world`, `some very long string`, `hello`, `hello`, and `some very long string`. What ends up being stored in level is this:

| Key | Value |
| --- | ----- |
| 23a4 | hello |
| r2d2 | world |
| d59c | some very long string |

As you noticed, although some values were put in multiple times, they are only stored once. Each value is given a unique, collision free hash.

## Why is this a good idea?

When making a query engine of some kind you often want to create indexes that stores the same values in several different arrangements. So instead of storing the full values multiple times in the indexes, you can instead just store the hashes, thus keeping the indexes from ballooning up in size.

# How to use it
```js
var HashIndex = require('level-hash-index');
var h = HashIndex(db);// db is anything that exposes the levelUp API

h.putAndWrite("hello", function(err, hash){
  // hash === "23a4..."
  // ...
  // ...
  h.getHash(hash, function(err, val){
    // val === "hello"
  });
});
```

## h = HashIndex(db, options)
 * _db_ is your levelup db (i.e. level, sublevel, multilevel etc... )
 * _options.hashFn_ any hash function that takes in a string and returns a string
 * _options.hash\_seq\_length_ the number of base 36 digits to use in the hash collision seq number (default is 2)
 * _options.index\_prefix_ the level key = index\_prefix + hash (default prefix is "hash!")


## h.put(val, callback(err, data))
Given a value, get it's unique hash. The callback data is one of these two
 * `{hash: hash}` - the hash of the value that's persisted to the db
 * `{hash: hash, is_new: true, key: db_key}` - the hash of the value and it's raw db key that hasn't yet been persisted, but is the hash that will be used once it is persisted.

## h.putAndWrite(val, callback(err, hash))
Given a value, get it's hash, and write to the db if it hasn't yet been persisted.

## h.getHash(val, callback(err, hash))
Given a value, get the hash for that value, if it has been persisted to the db. Uses level's NotFoundError if not found.

## h.get(hash, callback(err, val))
Given a hash get the value. Uses level's NotFoundError if not found.

# License

The MIT License (MIT)

Copyright (c) 2015 Small Helm LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
