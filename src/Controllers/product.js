const products = {}
const model = require("../Models/product")
const respon = require("../Helpers/respon")
const cloudUpload = require("../Helpers/cloudUpload")
const { redisdb } = require("../Configs/redis")

products.get = async (req, res) => {
    try {
        const result = await model.get()
        const saveReedis = JSON.stringify(result)
        redisdb.setex("products", 60, saveReedis)
        console.log("dari postgresql")
        
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 200, error)
    }
}

products.add = async (req, res) => {
    try {
        if (req.file === undefined) {
            return respon(res, 500, { msg: "Image harus disi" })
        }
        const image_url = await cloudUpload(req.file.path)
        const result = await model.addProd(req.body, image_url)
        redisdb.del("products")
        return respon(res, 201, result)
    } catch (error) {
        return respon(res, 200, error)
    }
}

products.getID = (req, res) => {
    res.send("Hallo from controller")
}

products.update = async (req, res) => {
    try {
        const result = await model.updateProd(req.body)
        redisdb.del("products")
        return respon(res, 201, result)
    } catch (error) {
        return respon(res, 200, error)
    }
}

products.del = async (req, res) => {
    try {
        const result = await model.delProd(req.params.id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}

module.exports = products
