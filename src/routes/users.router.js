const express = require('express')
const UsersController = require('../controllers/users.controller.js')
const { checkRole } = require('../middlewares/checkRole.middleware.js')
const { isAuthenticated } = require('../middlewares/auth.middleware.js')
const router = express.Router()

router.post('/register', UsersController.register)
router.post('/login', UsersController.login)
router.get('/logout', UsersController.logout)
router.put('/update', isAuthenticated, UsersController.updateProfile)
router.put('/change-password', isAuthenticated, UsersController.changePassword)
router.get('/', isAuthenticated, checkRole(['admin']), UsersController.getAllUsers)
router.put('/role/:id', isAuthenticated, checkRole(['admin']), UsersController.updateUserRole)
router.delete('/delete/:id', isAuthenticated, checkRole(['admin']), UsersController.deleteUser)
router.get('/paginated', isAuthenticated, checkRole(['admin']), UsersController.getUsersPaginated)

module.exports = router