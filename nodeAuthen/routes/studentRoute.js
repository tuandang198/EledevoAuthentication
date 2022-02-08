const controller = require('../controllers/studentController')
const auth = require('../middleware/jwt')
const route = (app) => {
	app.get('/student',auth.verify, controller.getStudent)
	app.put('/student/:id',auth.author, controller.updateStudent)
	app.delete('/student/:id',auth.author, controller.deleteStudent)
	app.post('/student',auth.author, controller.addStudent)
	app.post('/register', controller.registerStudent)
	app.post('/login', controller.loginStudent)
	app.post('/recoverPassword', controller.recoverPassword)
}

module.exports = route