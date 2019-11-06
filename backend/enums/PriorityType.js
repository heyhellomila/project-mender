var Enum = require('enum');

const PriorityType = new Enum([
    'HIGH',
    'MEDIUM',
    'LOW'
]);

module.exports = PriorityType;