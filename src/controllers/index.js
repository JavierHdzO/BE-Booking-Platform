
const auth =  require('./auth.controller');
const users =  require('./users.controller');
const access =  require('./accesscode.controller');

module.exports = {
    ...auth,
    ...users,
    ...access
}