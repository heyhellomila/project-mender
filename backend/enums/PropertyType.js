var Enum = require('enum');

const PropertyType = new Enum([
    'CONDOMINIUM',
    'SINGLE_FAMILY_HOME',
    'TOWNHOUSE',
    'DUPLEX',
    'TRIPLEX',
    'MULTIPLEX',
    'COTTAGE',
    'MOBILE_HOME',
]);

module.exports = PropertyType;