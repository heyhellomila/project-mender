const UserFields = {
    loginFields : ['email', 'password'],
    createFields : ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'userType']
}

const WorkOrderFields = {
    createFields : ['sectorType', 'workOrderType', 'title', 'cause', 'serviceNeeded', 
        'priorityType', 'description', 'dueDate', 'priceEstimate']
}

const PropertyFields = {
    createFields : ['name', 'propertyType', 'address', 'activityStatus']
}

export {UserFields, WorkOrderFields, PropertyFields};
