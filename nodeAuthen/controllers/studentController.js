const studentModel = require('../models/studentModel')
const accountModel = require('../models/accountModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()

exports.getStudent = async (req, res, next) => {
	try {
		const getStudent = await studentModel.find()
		res.send({ studentData: getStudent })
	} catch (error) {
		res.send(404, error)
	}
}

exports.updateStudent = async (req, res, next) => {
	try {
		const id = req.params.id
		const name = req.body.name
		const updateStudent = await studentModel.findByIdAndUpdate(id, { name })
		res.send({ studentData: updateStudent })
	} catch (error) {
		res.send(404, error)
	}
}

exports.deleteStudent = async (req, res, next) => {
	try {
		const id = req.params.id
		const deleteStudent = await studentModel.findByIdAndDelete(id)
		res.send({ studentData: deleteStudent })
	} catch (error) {
		res.send(404, error)
	}
}

exports.addStudent = async (req, res, next) => {
	try {
		const name = req.body.name
		const addStudent = await studentModel.create({ name })
		res.send({ studentData: addStudent })
	} catch (error) {
		res.send(404, error)
	}
}

exports.registerStudent = async (req, res, next) => {
	try {
		const username = req.body.username
		const password = req.body.password
		const checkAccount = await accountModel.findOne({ username })
		if (checkAccount) {
			return res.send({ errorMessage: "Duplicate Account", status: 1 })
		} else {
			const encryptedPassword = await bcrypt.hash(password, 10)
			const addAccount = await accountModel.create({ username, password: encryptedPassword })
			const tokenData = await accountModel.findOne({ username }).select(["-password"])
			const token = jwt.sign(
				{ tokenData },
				process.env.SECRET_KEY,
				{ expiresIn: "1d" }
			)
			return res.send({ token, accountData: tokenData, status: 0 })
		}

	} catch (error) {
		res.send(404, error)
	}
}

exports.recoverPassword = async (req, res, next) => {
	try {
		const username = req.body.username
		const password = req.body.password
		// console.log(password, 'uername');
		const checkAccount = await accountModel.findOne({ username })
		// console.log(checkAccount, 'll');
		if (!checkAccount) {
			return res.send({ errorMessage: "Invalid Account", status: 1 })
		} else {
			const comparePassword = await bcrypt.compare(password, checkAccount.password)
			if (comparePassword) {
				return res.send({ errorMessage: "Duplicate old password", status: 1 })
			} else {
				// console.log('3');
				const encryptedPassword = await bcrypt.hash(password,10)
				// console.log(checkAccount._id, 'id');
				const updateAccount = await accountModel.findByIdAndUpdate(checkAccount._id, { password: encryptedPassword })
				// console.log(updateAccount,'update');
				const tokenData = await accountModel.findOne({ username }).select(["-password"])
				const token = jwt.sign(
					{ tokenData },
					process.env.SECRET_KEY,
					{ expiresIn: "1d" }
				)
				return res.send({ token, accountData: tokenData, status: 0 })
			}

		}

	} catch (error) {
		res.send(404, error)
	}
}

exports.loginStudent = async (req, res, next) => {
	try {
		const username = req.body.username
		const password = req.body.password
		const checkAccount = await accountModel.findOne({ username })
		// console.log(checkAccount);
		if (!checkAccount) {
			return res.send({ errorMessage: "Invalid Account", status: 1 })
		} else {
			const comparePassword = await bcrypt.compare(password, checkAccount.password)
			if (comparePassword) {
				const tokenData = await accountModel.findOne({ username }).select(["-password"])
				const token = jwt.sign(
					{ tokenData },
					process.env.SECRET_KEY,
					{ expiresIn: "1d" }
				)
				return res.send({ token, accountData: tokenData, status: 0 })
			} else {
				return res.send({ errorMessage: "Invalid Account", status: 1 })

			}

		}

	} catch (error) {
		res.send(404, error)
	}
}