const UserFields = {
    loginFields : ['email', 'password'],
    createFields : ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'userType'],
};

const WorkOrderFields = {
    createFields : ['sectorKind', 'workOrderType', 'title', 'cause', 'serviceNeeded',
        'priorityType', 'description', 'dueDate', 'priceEstimate'],
};

const SHOPPING_ITEM_FIELDS = {
    createFields : ['name', 'quantity', 'price', 'bought'],
};

const PROPERTY_FIELDS = {
    createFields : ['name', 'propertyType', 'address', 'city', 'province', 'postalCode', 'countryCode'],
};

const PROPERTY_SECTOR_FIELDS = {
    createFields : ['sectorKind'],
    patchFields: ['sectorKind']
};

const LICENSE_FIELDS = {
    createFields : ['licenseNumber', 'licenseType'],
};

const BUSINESS_FIELDS = {
    createFields : ['NEQ', 'businessType'],
};

export { UserFields, WorkOrderFields, SHOPPING_ITEM_FIELDS, PROPERTY_FIELDS, 
    PROPERTY_SECTOR_FIELDS,LICENSE_FIELDS, BUSINESS_FIELDS };

