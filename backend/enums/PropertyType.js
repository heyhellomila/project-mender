var Enum = require('enum');

const PropertyType = new Enum([
    'CONDOMINIUM',
    'APARTMENT',
    'TOWNHOUSE',
    'COOPERATIVE',
    'SEMI-DETACHED',
    'BUNGALOW',
    'DUPLEX',
    'TRIPLEX'
]);

module.exports = PropertyType;