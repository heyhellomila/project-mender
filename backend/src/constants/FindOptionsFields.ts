import { FindOptions } from 'typeorm';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { WorkOrder } from '../entities/WorkOrder';
import { License } from '../entities/License';
import { PropertySector } from '../entities/PropertySector';

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

const PropertyFieldsNoUser : FindOptions<Property> = {
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

const PROPERTY_SECTOR_FIELDS : FindOptions<PropertySector> = {
    relations: ['sector'],
    select: {
        id: true,
        sector: {
            id: true,
            type: true,
            kind: true,
        },
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
        expiryDate: true
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
        expiryDate: true
    },
};

export { PropertyFields, UserFields, WorkOrderFields, PropertyFieldsNoUser,
    WorkOrderFieldsNoProperty, PROPERTY_SECTOR_FIELDS, LICENSE_FIELDS, LICENSE_FIELDS_NO_USER };
