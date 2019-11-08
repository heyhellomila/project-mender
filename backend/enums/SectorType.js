var Enum = require('enum');

const SectorType = new Enum([
    'ROOF',
    'KITCHEN',
    'UTILITIES',
    'LIVING ROOM',
    'BATHROOM',
    'APPLIANCES',
    'BEDROOM',
    'BALCONY',
    'GARAGE',
    'ENVELOPE',
    'ELECTRICAL',
    'HVAC'
]);

module.exports = SectorType;