const USER_FIELDS = {
    loginFields : ['email', 'password'],
    createFields : ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'userType'],
};

const WORK_ORDER_FIELDS = {
    createFields : ['sectorKind', 'workOrderType', 'title', 'serviceNeeded', 'emergency',
        'priorityType', 'dueDate'],
};

const SHOPPING_ITEM_FIELDS = {
    createFields : ['name', 'quantity', 'price', 'bought'],
};

const PROPERTY_FIELDS = {
    createFields : ['name', 'propertyType', 'address', 'city', 'province', 'postalCode', 'countryCode'],
};

const PROPERTY_SECTOR_FIELDS = {
    createFields : ['sectorKind'],
    patchFields: ['sectorKind'],
};

const LICENSE_FIELDS = {
    createFields : ['licenseNumber', 'licenseType'],
};

const BUSINESS_FIELDS = {
    createFields : ['NEQ', 'businessType'],
};

export { USER_FIELDS, WORK_ORDER_FIELDS, SHOPPING_ITEM_FIELDS, PROPERTY_FIELDS,
    PROPERTY_SECTOR_FIELDS, LICENSE_FIELDS, BUSINESS_FIELDS };
