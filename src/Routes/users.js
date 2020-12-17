const express = require("express") //import module / atau file js
const routes = express.Router()
const ctrl = require("../Controllers/users")
const validate = require("../middleware/validate")

routes.get("/", validate(["admin"]), ctrl.getAll)
routes.post("/", ctrl.add)

module.exports = routes
