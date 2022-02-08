const jwt = require('jsonwebtoken')

exports.verify = function (req, res, next) {
	try {
		const token = req.headers["authorization"].split(" ")[1];
		if (!token) {
			return res.send({ errorMessage: "No token", status: 1 })
		} else {
			jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
				if (error) {
					return res.send({ errorMessage: "Wrong token", status: 1 })

				} else {
					if (data) {
						next()
					} else {
						return res.send({ errorMessage: "No data", status: 1 })

					}
				}
			})
		}
	} catch (error) {
		res.send(404, error)
	}
}

exports.author = function (req, res, next) {
	try {
		const token = req.headers["authorization"].split(" ")[1];
		// console.log(req.headers,'l');
		if (!token) {
			return res.send({ errorMessage: "No token", status: 1 })
		} else {
			jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
				if (error) {
					return res.send({ errorMessage: "Wrong token", status: 1 })

				} else {
					if (data.tokenData.role == "admin") {
						next()
					} else {
						return res.send({ errorMessage: "Not authorized", status: 1 })

					}
				}
			})
		}
	} catch (error) {
		res.send(404, error)
	}
}