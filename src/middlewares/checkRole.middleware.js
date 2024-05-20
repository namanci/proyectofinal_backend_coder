const checkRole = (roles) => (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
        return next()
    } else if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
}

module.exports = { checkRole }