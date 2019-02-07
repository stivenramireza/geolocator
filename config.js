var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'geolocator'
    },
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatorToken",
    db: 'mongodb://mongo-server/geolocator-development'
  },

  test: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'geolocator'
    },
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatorToken",
    db: 'mongodb://localhost/geolocator-test'
  },

  production: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'geolocator'
    },
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatorToken",
    db: 'mongodb://sramir70:*******@ds163397.mlab.com:63397/sramir70'
  }
};

module.exports = config[env];