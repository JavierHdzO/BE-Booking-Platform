const generateJWT = require('./generateJWT');
const db_validator = require('./db-validator');

module.exports = {
    generateJWT,
    ...db_validator
}