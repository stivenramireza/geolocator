
  env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    db: 'mongodb://mongo-server:27017/geolocator',
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "tokenGeolocator"
  },
  test: {
    //    baseUrl: "/nodeArticulos/",
    db: 'mongodb://localhost:27017/geolocator',
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "tokenGeolocator"
  },
  production: {
    db: 'mongodb://mongo-server:27017/geolocator',
    port: process.env.PORT || 3000,
    SECRET_TOKEN: "tokenGeolocator"
  }
};

module.exports = config[env];
