var Enum = require('enum');

const WorkOrderType = new Enum([
    'CM',
    'PM'
])

module.exports = WorkOrderType;