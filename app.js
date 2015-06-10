var config = require('./config')()
var app = require('./server').app
var cors = require('cors');

app.use(cors());

app.get('/', function(req, res) {
  res.send("Cloud Foundry Node.js. We are live!")
})

app.get('/vcap_application', function(req, res) {
  res.send(cfenv.app)
})

app.get('/vcap_services', function(req, res) {
  res.send(cfenv.services)
}
