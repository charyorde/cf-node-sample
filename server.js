var config = require('./config')()
var express = require('express')
var app = express()

// start http server
var server = app.listen(config.port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Running in ' + config.mode + ' environment.')
  console.log('Serving static files at http://%s:%s', host, port)

})

exports = module.exports = {}
exports.express = express
exports.app = app
exports.server = server
