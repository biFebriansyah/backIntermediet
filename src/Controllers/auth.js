const bcr = require("bcrypt")
const model = require("../Models/users")
const respon = require("../Helpers/respon")
const jwt = require("jsonwebtoken")

class Auth {
    login = async (req, res) => {
        try {
            const passDB = await model.getByEmail(req.body.email)
            const passUser = req.body.password

            if (passDB.length <= 0) {
                return respon(res, 200, { msg: "Email tidak terdaftar" })
            }

            const cek = await bcr.compare(passUser, passDB[0].password) // sama atau gk passwrodnya

            if (cek) {
                const result = await this.setToken(req.body.email)
                return respon(res, 200, result)
            } else {
                return respon(res, 200, { msg: "Check password anda" })
            }
        } catch (error) {
            return respon(res, 500, error)
        }
    }

    setToken = async (email) => {
        try {
            const payload = {
                email: email,
                role: "admin",
            }

            const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: "1d" })

            const result = {
                msg: "Token created",
                token: token,
            }
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Auth()
