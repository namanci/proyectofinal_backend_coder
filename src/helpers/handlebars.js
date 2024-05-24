const handlebars = require('handlebars')

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1.toString() == arg2.toString()) ? options.fn(this) : options.inverse(this)
})

handlebars.registerHelper('ifEqualsOrAdmin', function(arg1, arg2, role, options) {
    return (arg1.toString() == arg2.toString() || role == 'admin') ? options.fn(this) : options.inverse(this)
})