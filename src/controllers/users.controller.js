const UsersService = require('../services/users.service.js')

class UsersController {
    async register(req, res, next) {
        try {
            const userData = req.body
            const newUser = await UsersService.registerUser(userData)
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const { user, token } = await UsersService.loginUser(email, password)

            req.login(user, { session: true }, (err) => {
                if (err) {
                    return next(err)
                }
                res.cookie('token', token, { httpOnly: true })
                res.status(200).json(user)
            })
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            req.logout((err) => {
                if (err) {
                    return next(err)
                }
                req.session.destroy((err) => {
                    if (err) {
                        return next(err)
                    }
                    res.clearCookie('connect.sid')
                    res.clearCookie('token')
                    res.status(200).json({ message: 'Logout successful' })
                })
            })
        } catch (error) {
            next(error)
        }
    }

    async updateProfile(req, res, next) {
        try {
            const userId = req.user._id
            const updateData = req.body
            const updatedUser = await UsersService.updateUserProfile(userId, updateData)
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async changePassword(req, res, next) {
        try {
            const userId = req.user._id
            const { newPassword } = req.body
            const updatedUser = await UsersService.changeUserPassword(userId, newPassword)
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await UsersService.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    async updateUserRole(req, res, next) {
        try {
            const userId = req.params.id
            const { newRole } = req.body
            const updatedUser = await UsersService.updateUserRole(userId, newRole)
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async getUsersPaginated(req, res, next) {
        try {
            const { page, limit } = req.query
            const paginatedUsers = await UsersService.getUsersPaginated(page, limit)
            res.status(200).json(paginatedUsers)
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            await UsersService.deleteUser(id)
            res.status(200).json({ message: 'User deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UsersController()