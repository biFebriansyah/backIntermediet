const db = require("../Configs/db")

class Users {
    async add(data) {
        return new Promise((resole, reject) => {
            db.query(
                `INSERT INTO public.users (name, email, "password") VALUES('${data.name}', '${data.email}', '${data.password}')`
            )
                .then((res) => {
                    if (res.rows.length == 0) {
                        resole({ msg: "Data kosong" })
                    } else {
                        resole(res.rows)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    async getAll() {
        return new Promise((resole, reject) => {
            db.query(`SELECT * FROM public.users ORDER BY id ASC`)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resole({ msg: "Data kosong" })
                    } else {
                        resole(res.rows)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async getByEmail(email) {
        return new Promise((resole, reject) => {
            db.query(`SELECT * FROM public.users WHERE email='${email}'`)
                .then((res) => {
                    resole(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = new Users()
