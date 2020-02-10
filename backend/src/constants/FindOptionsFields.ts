import { FindOptions } from 'typeorm';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { WorkOrder } from '../entities/WorkOrder';
import { License } from '../entities/License';
import { PropertySector } from '../entities/PropertySector';
import { BusinessUser } from '../entities/BusinessUser';
import { Business } from '../entities/Business';
import { ShoppingItem } from 'src/entities/ShoppingItem';

const PROPERTY_FIELDS : FindOptions<Property> = {
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

const USER_FIELDS : FindOptions<User> = {
    relations: ['userType'],
    select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        userType: {
            id: true,
            type: true,
        },
    },
};

const USER_FOR_UPDATE_FIELDS : FindOptions<User> = {
    select: {
        passwordHash: true,
    },
};

const WorkOrderFields : FindOptions<WorkOrder> = {
    relations: ['workOrderType', 'priorityType', 'sector', 'createdBy',
        'lastModifiedBy', 'property', 'workOrderStatus', 'contractedBy'],
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
        location: true,
        dueDate: true,
        createdDate: true,
        createdBy: {
            id: true,
        },
        contractedBy: {
            id: true,
        },
        lastModifiedDate: true,
        lastModifiedBy: {
            id: true,
        },
        dateCompleted: true,
        priceEstimate: true,
        actualCost: true,
        bookmarked: true,
        workOrderStatus: {
            id: true,
            status: true,
        },
    },
};

const WorkOrderFieldsNoProperty : FindOptions<WorkOrder> = {
    relations: ['workOrderType', 'priorityType', 'sector', 'createdBy', 'lastModifiedBy', 'workOrderStatus'],
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
        location: true,
        dueDate: true,
        createdDate: true,
        createdBy: {
            id: true,
        },
        contractedBy: {
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

const WORK_ORDER_FIELDS_NO_BUSINESS_USER : FindOptions<WorkOrder> = {
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
        dueDate: true,
        location: true,
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
        bookmarked: true,
        workOrderStatus: {
            id: true,
            status: true,
        },
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

const LICENSE_FIELDS : FindOptions<License> = {
    relations: ['licenseStatus', 'licenseType', 'user'],
    select: {
        id: true,
        user: {
            id: true,
        },
        licenseNumber: true,
        licenseType: {
            id: true,
            type: true,
        },
        licenseStatus: {
            id: true,
            status: true,
        },
        expiryDate: true,
    },
};

const LICENSE_FIELDS_NO_USER : FindOptions<License> = {
    relations: ['licenseStatus', 'licenseType'],
    select: {
        id: true,
        licenseNumber: true,
        licenseType: {
            id: true,
            type: true,
        },
        licenseStatus: {
            id: true,
            status: true,
        },
        expiryDate: true,
    },
};

const BUSINESS_USER_FIELDS : FindOptions<BusinessUser> = {
    relations: ['businessUserRole', 'business', 'user'],
    select: {
        id: true,
        user: {
            id: true,
        },
        businessUserRole: {
            id: true,
            role: true,
        },
        business: {
            id: true,
            NEQ: true,
        },
    },
};

const BUSINESS_USER_FIELDS_NO_USER : FindOptions<BusinessUser> = {
    relations: ['businessUserRole', 'business'],
    select: {
        id: true,
        businessUserRole: {
            id: true,
            role: true,
        },
        business: {
            id: true,
            NEQ: true,
            name: true,
        },
    },
};

const BUSINESS_USER_FIELDS_NO_BUSINESS : FindOptions<BusinessUser> = {
    relations: ['businessUserRole', 'user'],
    select: {
        id: true,
        user: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
        },
        businessUserRole: {
            id: true,
            role: true,
        },
    },
};

export { PROPERTY_FIELDS, USER_FIELDS, WorkOrderFields, PROPERTY_FIELDS_NO_USER,
    WorkOrderFieldsNoProperty, WORK_ORDER_FIELDS_NO_BUSINESS_USER, SHOPPING_ITEM_FIELDS,
    SHOPPING_ITEM_FIELDS_NO_WORK_ORDER, PROPERTY_SECTOR_FIELDS, USER_FOR_UPDATE_FIELDS,
    LICENSE_FIELDS, LICENSE_FIELDS_NO_USER, BUSINESS_USER_FIELDS,
    BUSINESS_USER_FIELDS_NO_USER, BUSINESS_USER_FIELDS_NO_BUSINESS };
