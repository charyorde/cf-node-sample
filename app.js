var config = require('./config')()
var app = require('./server').app
var cors = require('cors');
var redisClient = require('./redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cfenv = require('./config').cfenv

app.use(cors());

// connect to redis
var redisSessionStore = redisClient.redisSessionStore;

var sess = {
  store: redisSessionStore,
  secret: 'cf-node-sample',
  cookie: {
    expires: false,
  }
}

app.get('/', function(req, res) {
  res.send("Cloud Foundry Node.js. We are live!")
})

app.get('/vcap_application', function(req, res) {
  res.json(cfenv.app)
})

app.get('/vcap_services', function(req, res) {
  res.json(cfenv.services)
})
