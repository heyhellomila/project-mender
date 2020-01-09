import { FindOptions } from 'typeorm';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { WorkOrder } from '../entities/WorkOrder';
import { PropertySector } from '../entities/PropertySector';
import { ShoppingItem } from 'src/entities/ShoppingItem';

const PropertyFields : FindOptions<Property> = {
    relations: ['activityStatus', 'propertyType', 'user'],
    select: {
        id: true,
        name: true,
        user: {
            id: true,
        },
        address: true,
        activityStatus: {
            id: true,
            status: true,
        },
        propertyType: {
            id: true,
            type: true,
        },
    },
};

const PROPERTY_FIELDS_NO_USER : FindOptions<Property> = {
    relations: ['activityStatus', 'propertyType'],
    select: {
        id: true,
        name: true,
        address: true,
        activityStatus: {
            id: true,
            status: true,
        },
        propertyType: {
            id: true,
            type: true,
        },
        city: true,
        province: true,
        postalCode: true,
        countryCode: true,
    },
};

const UserFields : FindOptions<User> = {
    relations: ['userType'],
    select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        userType: {
            id: true,
            type: true,
        },
        phoneNumber: true,
    },
};

const WorkOrderFields : FindOptions<WorkOrder> = {
    relations: ['workOrderType', 'priorityType', 'sector', 'createdBy',
        'lastModifiedBy', 'property'],
    select: {
        id: true,
        property: {
            id: true,
        },
        sector: {
            id: true,
            type: true,
            kind: true,
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
            type: true,
        },
        description: true,
        dueDate: true,
        createdDate: true,
        createdBy: {
            id: true,
        },
        lastModifiedDate: true,
        lastModifiedBy: {
            id: true,
        },
        dateCompleted: true,
        priceEstimate: true,
        actualCost: true,
    },
};

const WorkOrderFieldsNoProperty : FindOptions<WorkOrder> = {
    relations: ['workOrderType', 'priorityType', 'sector', 'createdBy', 'lastModifiedBy'],
    select: {
        id: true,
        sector: {
            id: true,
            type: true,
            kind: true,
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
            type: true,
        },
        description: true,
        dueDate: true,
        createdDate: true,
        createdBy: {
            id: true,
        },
        lastModifiedDate: true,
        lastModifiedBy: {
            id: true,
        },
        dateCompleted: true,
        priceEstimate: true,
        actualCost: true,
    },
};


const SHOPPING_ITEM_FIELDS : FindOptions<ShoppingItem> = {
    relations: ['workOrder'],
    select:{
        id: true,
        workOrder: {
            id: true,
        },
        name: true,
        quantity: true,
        price: true,
        bought: true,
    },
};

const SHOPPING_ITEM_FIELDS_NO_WORK_ORDER : FindOptions<ShoppingItem> = {
    select:{
        id: true,
        name: true,
        quantity: true,
        price: true,
        bought: true,
    },
};

const PROPERTY_SECTOR_FIELDS : FindOptions<PropertySector> = {
    relations: ['sector'],
    select: {
        id: true,
        sector: {
            id: true,
            type: true,
            kind: true,
        },
        status: true,
    },
};

export { PropertyFields, UserFields, WorkOrderFields, PROPERTY_FIELDS_NO_USER,
    WorkOrderFieldsNoProperty, SHOPPING_ITEM_FIELDS, SHOPPING_ITEM_FIELDS_NO_WORK_ORDER, PROPERTY_SECTOR_FIELDS };
