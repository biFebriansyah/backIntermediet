const express = require("express") //import module / atau file js
const routes = express.Router()
const ctrl = require("../Controllers/product")
const validate = require("../middleware/validate")
const upload = require("../middleware/Multer")
const cache = require("../middleware/cache")

routes.get("/", validate(["admin", "user"]), cache, ctrl.get)
routes.post("/", upload.single("image"), ctrl.add)
routes.put("/", validate(["admin"]), ctrl.update)
routes.delete("/:id", validate(["admin"]), ctrl.del)

module.exports = routes
