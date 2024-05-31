const UsersRepository = require('../repositories/users.repository.js')
const jwt = require('jsonwebtoken')
const { cfgObj } = require('../config/configObject.js')
const { verifyPassword } = require('../utils/hashPassword.js')

class UsersService {
    async registerUser(userData) {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await UsersRepository.getUserBy({ email: userData.email })
            if (existingUser) {
                throw new Error('Email already in use')
            }

            // Crear y guardar el nuevo usuario
            const user = await UsersRepository.createUser(userData)
            return user
        } catch (error) {
            throw new Error('Error registering user: ' + error.message)
        }
    }

    async loginUser(email, password) {
        try {
            const user = await UsersRepository.getUserBy({ email })
            if (!user) {
                throw new Error('Invalid email or password')
            }

            // Verificar la contraseña
            const passwordMatches = await verifyPassword(password, user.password)
            if (!passwordMatches) {
                throw new Error('Invalid email or password')
            }

            // Generar el token JWT
            const token = jwt.sign({ id: user._id, role: user.role }, cfgObj.jwt_secret, {
                expiresIn: '1h',
            })

            return { user, token }
        } catch (error) {
            throw new Error('Error logging in: ' + error.message)
        }
    }

    async updateUserProfile(userId, updateData) {
        try {
            const updatedUser = await UsersRepository.updateUserById(userId, updateData)
            return updatedUser
        } catch (error) {
            throw new Error('Error updating user profile: ' + error.message)
        }
    }

    async changeUserPassword(userId, newPassword) {
        try {
            const updatedUser = await UsersRepository.updateUserPassword(userId, newPassword)
            return updatedUser
        } catch (error) {
            throw new Error('Error changing user password: ' + error.message)
        }
    }

    async getAllUsers() {
        try {
            const users = await UsersRepository.getUsers()
            return users
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message)
        }
    }

    async updateUserRole(userId, newRole) {
        try {
            const updatedUser = await UsersRepository.updateUserRole(userId, newRole)
            return updatedUser
        } catch (error) {
            throw new Error('Error updating user role: ' + error.message)
        }
    }

    async getUsersPaginated(page, limit) {
        try {
            const paginatedUsers = await UsersRepository.getUsersPaginated(page, limit)
            return paginatedUsers
        } catch (error) {
            throw new Error('Error fetching paginated users: ' + error.message)
        }
    }

    async deleteUser(userId) {
        try {
            const result = await UsersRepository.deleteUser(userId)
            if (!result) {
                throw new Error('User not found')
            }
            return { message: 'User deleted successfully' }
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message)
        }
    }
}

module.exports = new UsersService()