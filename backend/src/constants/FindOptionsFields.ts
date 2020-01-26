import { FindOptions } from 'typeorm';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { WorkOrder } from '../entities/WorkOrder';
import { License } from '../entities/License';
import { PropertySector } from '../entities/PropertySector';
import { BusinessUser } from '../entities/BusinessUser';
import { Business } from '../entities/Business';

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
        'lastModifiedBy', 'property', 'contractedBy'],
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

const WorkOrderFieldsNoBusinessUser : FindOptions<WorkOrder> = {
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
        }
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
        }
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
        }
    },
};

const BUSINESS_FIELDS : FindOptions<Business> = {
    relations: ['businessType'],
    select: {
        id: true,
        NEQ: true,
        name: true,
        businessType: {
            id: true,
            type: true,
        }
    },
};



export { PropertyFields, UserFields, WorkOrderFields, PropertyFieldsNoUser, WorkOrderFieldsNoBusinessUser,
    WorkOrderFieldsNoProperty, PROPERTY_SECTOR_FIELDS, LICENSE_FIELDS, LICENSE_FIELDS_NO_USER, 
    BUSINESS_USER_FIELDS, BUSINESS_USER_FIELDS_NO_USER, BUSINESS_USER_FIELDS_NO_BUSINESS, BUSINESS_FIELDS };
