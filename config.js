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
    db: 'mongodb://mongo-server:27017/geolocator-development'
  },

  test: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'geolocator'
    },
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatorToken",
    db: 'mongodb://localhost:27017/geolocator-test'
  },

  production: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'geolocator'
    },
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatorToken",
    db: 'mongodb://mongo-server:27017/geolocator-production'
  }
};

module.exports = config[env];