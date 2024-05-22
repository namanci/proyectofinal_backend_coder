const express = require('express')
const UsersController = require('../controllers/users.controller.js')
const { checkRole } = require('../middlewares/checkRole.middleware.js')
const { isAuthenticated } = require('../middlewares/auth.middleware.js')
const router = express.Router()

// Ruta para el registro de usuarios
router.post('/register', UsersController.register)

// Ruta para el inicio de sesión
router.post('/login', UsersController.login)

// Ruta para el cierre de sesión (logout)
router.get('/logout', UsersController.logout)

// Ruta para actualizar el perfil del usuario autenticado
router.put('/update', isAuthenticated, UsersController.updateProfile)

// Ruta para cambiar la contraseña del usuario autenticado
router.put('/change-password', isAuthenticated, UsersController.changePassword)

// Ruta para obtener todos los usuarios (solo accesible para administradores)
router.get('/', isAuthenticated, checkRole(['admin']), UsersController.getAllUsers)

// Ruta para actualizar el rol del usuario (solo accesible para administradores)
router.put('/role/:id', isAuthenticated, checkRole(['admin']), UsersController.updateUserRole)

//router.put('/edit/:id', isAuthenticated, checkRole(['admin']), UsersController.editUser)

//Ruta para eliminar un usuario por ID (solo accesible para administradores)
router.delete('/delete/:id', isAuthenticated, checkRole(['admin']), UsersController.deleteUser)

// Ruta para obtener usuarios con paginación (solo accesible para administradores)
router.get('/paginated', isAuthenticated, checkRole(['admin']), UsersController.getUsersPaginated)

module.exports = router