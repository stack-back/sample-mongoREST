const requireAll = require("require-all")

module.exports = app => {

    const routes = requireAll({
		dirname	: __dirname,
		filter	: /^(?!index\.js)(.+)/,
    });
    
    Object.values(routes).forEach(route => {
        route(app)
    })
}