#### 1 MONGOD
* 進階/環境變數

* /系統變數/Path/編輯/

* 新增`C:\Program Files\MongoDB\Server\3.6\bin`當作Path之一

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
$npm uninstall mongodb  
$ npm install mongodb@2.2.33
`