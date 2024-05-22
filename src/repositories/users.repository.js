const userModel = require('../models/user.model.js')
const { hashPassword } = require('../utils/hashPassword.js')

class UsersRepository {
    // Crear un nuevo usuario
    async createUser(userData) {
        try {
            const user = new userModel(userData)
            await user.save()
            return user
        } catch (error) {
            throw new Error('Error creating user: ' + error.message)
        }
    }

    // Obtener todos los usuarios
    async getUsers() {
        try {
            return await userModel.find({}).lean().exec()
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message)
        }
    }

    // Obtener una lista de usuarios con paginación
    async getUsersPaginated(page, limit) {
        try {
            const options = {
                page: page || 1,
                limit: limit || 10,
            }
            return await userModel.paginate({}, options)
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message)
        }
    }

    // Obtener un usuario por un filtro (ID, Email, etc)
    async getUserBy(filter) {
        try {
            return await userModel.findOne(filter).lean().exec()
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message)
        }
    }

    // Actualizar un usuario por su ID
    async updateUserById(userId, updateData) {
        try {
            return await userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec()
        } catch (error) {
            throw new Error('Error updating user: ' + error.message)
        }
    }

    // Actualizar el rol de un usuario por su ID
    async updateUserRole(userId, newRole) {
        try {
            return await userModel.findByIdAndUpdate(userId, { role: newRole }, { new: true }).exec()
        } catch (error) {
            throw new Error('Error updating user role: ' + error.message)
        }
    }

    // Actualizar la contraseña de un usuario por su ID
    async updateUserPassword(userId, newPassword) {
        try {
            const hashedPassword = await hashPassword(newPassword)
            return await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true }).exec()
        } catch (error) {
            throw new Error('Error updating user password: ' + error.message)
        }
    }

    // Eliminar un usuario por su ID
    async deleteUser(userId) {
        try {
            return await userModel.findByIdAndDelete(userId).exec()
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message)
        }
    }
}

module.exports = new UsersRepository()