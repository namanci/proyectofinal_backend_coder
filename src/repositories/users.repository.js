const userModel = require('../models/user.model.js')
const { hashPassword } = require('../utils/hashPassword.js')

class UsersRepository {
    async createUser(userData) {
        try {
            const user = new userModel(userData)
            await user.save()
            return user
        } catch (error) {
            throw new Error('Error creating user: ' + error.message)
        }
    }

    async getUsers() {
        try {
            return await userModel.find({}).lean()
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message)
        }
    }

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

    async getUserBy(filter) {
        try {
            return await userModel.findOne(filter).lean()
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message)
        }
    }

    async updateUserById(userId, updateData) {
        try {
            return await userModel.findByIdAndUpdate(userId, updateData, { new: true })
        } catch (error) {
            throw new Error('Error updating user: ' + error.message)
        }
    }

    async updateUserRole(userId, newRole) {
        try {
            return await userModel.findByIdAndUpdate(userId, { role: newRole }, { new: true })
        } catch (error) {
            throw new Error('Error updating user role: ' + error.message)
        }
    }

    async updateUserPassword(userId, newPassword) {
        try {
            const hashedPassword = await hashPassword(newPassword)
            return await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true })
        } catch (error) {
            throw new Error('Error updating user password: ' + error.message)
        }
    }

    async deleteUser(userId) {
        try {
            return await userModel.findByIdAndDelete(userId)
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message)
        }
    }
}

module.exports = new UsersRepository()