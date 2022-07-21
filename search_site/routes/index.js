//引入express模块，引入mysql.js 注意，这个mysql.js在上层文件夹中，所以要用 ../
var express = require('express');
var router = express.Router();
var mysql = require('../mysql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/process_get', function(request, response) {
  //sql字符串和参数,和前面一样，搜索我们需要的东西
  var fetchSql = "select url, title, keywords, author, publish_date, source_name " +
      "from news where title like '%" + request.query.title + "%'" +
      "and keywords like '%" + request.query.keywords + "%'" +
      "and source_name like '%" + request.query.source_name + "%';";

  mysql.query(fetchSql, function(err, result, fields) {
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.write(JSON.stringify(result));
    response.end();
  });
});

router.get('/keywords_get', function (request, response) {
  //sql字符串和参数
  var fetchSql = "select publish_date from news where keywords like" + "'%" + request.query.keywords + "%'";

  mysql.query(fetchSql, function (err, result, fields) {
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.write(JSON.stringify(result));
    response.end();
  });
});

module.exports = router;