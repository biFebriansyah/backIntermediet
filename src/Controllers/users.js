const model = require("../Models/users")
const respon = require("../Helpers/respon")
const hashPassword = require("../Helpers/hash")

class Users {
    async add(req, res) {
        try {
            const check = model.getByEmail(req.body.email)
            
            if (check.length > 0) {
                return respon(res, 401, { msg: "email sudah terdaftar" })
            }

            const newPassword = await hashPassword(req.body.password)
            const users = {
                name: req.body.name,
                email: req.body.email,
                password: newPassword,
            }

            const data = await model.add(users)
            return respon(res, 200, data)
        } catch (error) {
            return respon(res, 500, error)
        }
    }

    async getAll(req, res) {
        try {
            const result = await model.getAll()
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error)
        }
    }
}

module.exports = new Users()
