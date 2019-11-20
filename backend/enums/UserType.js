var Enum = require('enum');

const UserType = new Enum([
    'HOMEOWNER',
    'INSPECTOR',
    'CONTRACTOR',
    'HYBRID'
]);

module.exports = UserType;