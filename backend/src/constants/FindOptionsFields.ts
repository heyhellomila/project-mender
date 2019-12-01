import { FindOptions } from "typeorm";
import { Property } from "../entities/Property";
import { User } from "../entities/User";
import { WorkOrder } from "../entities/WorkOrder";

const PropertyFields : FindOptions<Property> = {
    relations: ['activityStatus', 'propertyType', 'user'],
    select: {
        id: true, 
        name: true, 
        user: {
            id: true
        }, 
        address: true,
        activityStatus: {
            id: true, 
            status: true
        }, 
        propertyType: {
            id: true, 
            type: true
        }
    }
}

const PropertyFieldsNoUser : FindOptions<Property> = {
    relations: ['activityStatus', 'propertyType'],
    select: {
        id: true, 
        name: true, 
        address: true,
        activityStatus: {
            id: true, 
            status: true
        }, 
        propertyType: {
            id: true, 
            type: true
        }
    }
}

const UserFields : FindOptions<User> = {
    relations: ['userType'],
    select: {
        id: true, 
        firstName: true, 
        lastName: true,
        email: true,
        phoneNumber: true,
        userType: {
            id: true,
            type: true
        }
    }
}

const WorkOrderFields : FindOptions<WorkOrder> = {
    relations: ['workOrderType', 'priorityType', 'sectorType', 'createdBy', 'lastModifiedBy', 'property'],
    select: {
        id: true,
        property: {
            id: true
        },
        sectorType: {
            id: true,
            type: true
        },
        workOrderType: {
            id: true,
            type: true,
        },
        title: true,
        cause: true,
        serviceNeeded: true,
        priorityType: {
            id: true,
            type: true
        },
        description: true,
        dueDate: true,
        createdDate: true,
        createdBy: {
            id: true
        },
        lastModifiedDate: true,
        lastModifiedBy: {
            id: true
        },
        dateCompleted: true,
        priceEstimate: true,
        actualCost: true
    }
}

const WorkOrderFieldsNoProperty : FindOptions<WorkOrder> = {
    relations: ['workOrderType', 'priorityType', 'sectorType', 'createdBy', 'lastModifiedBy'],
    select: {
        id: true,
        sectorType: {
            id: true,
            type: true
        },
        workOrderType: {
            id: true,
            type: true,
        },
        title: true,
        cause: true,
        serviceNeeded: true,
        priorityType: {
            id: true,
            type: true
        },
        description: true,
        dueDate: true,
        createdDate: true,
        createdBy: {
            id: true
        },
        lastModifiedDate: true,
        lastModifiedBy: {
            id: true
        },
        dateCompleted: true,
        priceEstimate: true,
        actualCost: true
    }
}

export { PropertyFields, UserFields, WorkOrderFields, PropertyFieldsNoUser, WorkOrderFieldsNoProperty };
