const express = require('express')
const UsertCtrl = require("../controllers/userCtrl")
const api  = express.Router()
const auth = require('../middlewares/auth')

api.post("/signup", UsertCtrl.signup)
api.post("/addInfoGps", auth, UsertCtrl.addInfoGps)
api.post('/login', UsertCtrl.login)
api.get("/getUserRouteGps", auth, UsertCtrl.getExtraInfo)
api.delete("/deleteRouteFromAccount", auth, UsertCtrl.deleteExtraInfo)

module.exports = api