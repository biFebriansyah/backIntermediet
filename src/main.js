const express = require("express") //import module / atau file js
const routes = express.Router()
const product = require("./Routes/product")
const users = require("./Routes/users")
const auth = require("./Routes/auth")
const { cloudinaryConfig } = require("./Configs/cloudINary")

routes.use("*", cloudinaryConfig)
routes.use("/product", product)
routes.use("/users", users)
routes.use("/auth", auth)


module.exports = routes
