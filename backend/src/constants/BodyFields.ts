const UserFields = {
    loginFields : ['email', 'password'],
    createFields : ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'userType'],
};

const WorkOrderFields = {
    createFields : ['sectorKind', 'workOrderType', 'title', 'cause', 'serviceNeeded',
        'priorityType', 'description', 'dueDate', 'priceEstimate'],
};

const PropertyFields = {
    createFields : ['name', 'propertyType', 'address'],
};

const PROPERTY_SECTOR_FIELDS = {
    createFields : ['sectorKind'],
};

export { UserFields, WorkOrderFields, PropertyFields, PROPERTY_SECTOR_FIELDS };
