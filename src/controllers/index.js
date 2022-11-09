
const auth =  require('./auth.controller');
const users =  require('./users.controller');
const access =  require('./accesscode.controller');
const projects = require('./projects.controller');

module.exports = {
    ...auth,
    ...users,
    ...access,
    ...projects
}