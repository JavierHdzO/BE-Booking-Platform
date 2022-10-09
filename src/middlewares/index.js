const validateFields    = require('./validationFields');
const validateJWT       = require('./validateJWT');
const validateRole      = require('./validateRole');

module.exports = {
    validateFields,
    ...validateJWT,
    ...validateRole
}