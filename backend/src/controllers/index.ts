import express from 'express';
import { userController } from './UserController';
import { userPropertiesController } from './UserPropertiesController';
import { propertyController } from './PropertyController';
import { propertyWorkOrdersController } from './PropertyWorkOrdersController';
import { workOrderController } from './WorkOrderController';
import { propertySectorsController } from './PropertySectorsController';
import { businessController } from './BusinessController';
import { businessUserController } from './BusinessUserController';
import { userBusinessUsersController } from './UserBusinessUsersController';
import { licenseController } from './LicenseController';
import { userLicenseController } from './UserLicensesController';

class Router {

    private router = express.Router();

    constructor() {
        this.router.use('/api/users', userController);
        this.router.use('/api/users/:userId/properties', userPropertiesController)
        this.router.use('/api/properties', propertyController);
        this.router.use('/api/workOrders', workOrderController);
        this.router.use('/api/properties/:propertyId/workOrders', propertyWorkOrdersController);
        this.router.use('/api/properties/:propertyId/sectors', propertySectorsController);
        this.router.use('/api/businesses', businessController);
        this.router.use('/api/businessUsers', businessUserController);
        this.router.use('/api/users/:userId/businessUsers', userBusinessUsersController);
        this.router.use('/api/licenses', licenseController);
        this.router.use('/api/users/:userId/licenses', userLicenseController);
    }

    getRouter() {
        return this.router;
    }
}

export { Router };
