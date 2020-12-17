const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname + "/.env") })
const express = require("express") //import module / atau file js
const server = express()
const routes = require("./src/main")
const db = require("./src/Configs/db")
const bodyPars = require("body-parser")
const morgan = require("morgan")
const redis = require("./src/Configs/redis")

server.use(bodyPars.urlencoded({ extended: false }))
server.use(bodyPars.json())
server.use(morgan("dev"))
server.use("/public", express.static("public"))
server.use(routes)

db.connect()
    .then((res) => {
        console.log("Database Connect")
    })
    .catch((err) => {
        console.log("Database not Connected")
        console.log(err)
    })

redis
    .redisCheck()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

server.listen(9000, () => {
    console.log("Service running on port 9000")
})
