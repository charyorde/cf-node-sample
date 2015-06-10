var cfenv = require("cfenv")
var appEnv = cfenv.getAppEnv()
var config = {
  local: {
    appname: 'cf-node-sample',
    mode: 'local',
    port: process.env.VCAP_APP_PORT || 3005,
    protocol: 'http',
    uri: 'http://localhost:3005',
    redis: {
      host: '127.0.0.1',
      port: 6379,
    }
  },
  dev: {
    appname: appEnv ? appEnv.name : 'cf-node-sample',
    mode: appEnv ? appEnv.app.space_name : 'dev',
    port: process.env.VCAP_APP_PORT || process.env.PORT,
    protocol: 'http',
    uri: appEnv ? appEnv.url : undefined,
    redis: {
      host: !appEnv.isLocal ? appEnv.services.redis28[0].credentials.hostname : undefined,
      port: !appEnv.isLocal ? appEnv.services.redis28[0].credentials.port : undefined,
      password: !appEnv.isLocal ? appEnv.services.redis28[0].credentials.password : undefined
    }
  },
  production: {
    appname: appEnv ? appEnv.name : 'cf-node-sample',
    mode: appEnv ? appEnv.app.space_name : 'dev',
    port: process.env.VCAP_APP_PORT || process.env.PORT,
    protocol: 'http',
    uri: appEnv ? appEnv.url : undefined,
    redis: {
      host: !appEnv.isLocal ? appEnv.services.redis28[0].credentials.hostname : undefined,
      port: !appEnv.isLocal ? appEnv.services.redis28[0].credentials.port : undefined,
      password: !appEnv.isLocal ? appEnv.services.redis28[0].credentials.password : undefined
    },
  }
};
module.exports = function(mode) {
  var env = !appEnv.isLocal ? appEnv.app.space_name : 'local'
  return config[mode || env || 'local'] || config.local;
};
module.exports.cfenv = appEnv
