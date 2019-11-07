var Enum = require('enum');

const WorkOrderType = new Enum([
    'CM',
    'PM',
    'IMP'
])

module.exports = WorkOrderType;