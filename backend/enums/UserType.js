var Enum = require('enum');

const UserType = new Enum([
    'HOMEOWNER',
    'INSPECTOR',
    'CONTRACTOR'
]);

module.exports = UserType;