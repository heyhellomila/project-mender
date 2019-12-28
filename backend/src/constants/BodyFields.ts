const UserFields = {
    loginFields : ['email', 'password'],
    createFields : ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'userType'],
};

const WorkOrderFields = {
    createFields : ['sectorKind', 'workOrderType', 'title', 'cause', 'serviceNeeded',
        'priorityType', 'description', 'dueDate', 'priceEstimate'],
};

const ShoppingItemFields = {
    createFields : ['name', 'quantity', 'price', 'status'],
};

const PROPERTY_FIELDS = {
    createFields : ['name', 'propertyType', 'address', 'city', 'province', 'postalCode', 'countryCode'],
};

const PROPERTY_SECTOR_FIELDS = {
    createFields : ['sectorKind'],
};

export { UserFields, WorkOrderFields, ShoppingItemFields, PROPERTY_FIELDS, PROPERTY_SECTOR_FIELDS };
