env = process.env.NODE_ENV || 'test';

var config = {
  
  development: {
    db: 'mongodb://mongo-server:27017/geolocator',
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatortoken"
  },

  test: {
    db: 'mongodb://localhost:27017/geolocator',
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatortoken"
  },

  production: {
    db: 'mongodb://mongo-server:27017/geolocator',
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "geolocatortoken"
  }

};

module.exports = config[env];
