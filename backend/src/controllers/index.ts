import express from 'express';
import { userController } from './UserController';
import { userPropertiesController } from './UserPropertiesController';
import { propertyController } from './PropertyController';
import { propertyWorkOrdersController } from './PropertyWorkOrdersController';
import { workOrderController } from './WorkOrderController';
import { propertySectorsController } from './PropertySectorsController';
import { businessController } from './BusinessController';
import { userBusinessUsersController } from './UserBusinessUsersController';
import { businessUserController } from './BusinessUserController';
import { userBusinessController } from './UserBusinessController';
import { licenseController } from './LicenseController';
import { userLicenseController } from './UserLicensesController';
import { workOrderShoppingItemController } from './WorkOrderShoppingItemController'
import { shoppingItemController } from './ShoppingItemController'

class Router {

    private router = express.Router();

    constructor() {
        this.router.use('/api/users', userController);
        this.router.use('/api/users/:userId/properties', userPropertiesController)
        this.router.use('/api/properties', propertyController);
        this.router.use('/api/workOrders', workOrderController);
        this.router.use('/api/properties/:propertyId/workOrders', propertyWorkOrdersController);
        this.router.use('/api/propertySectors', propertySectorsController);
        this.router.use('/api/shoppingItem', shoppingItemController);
        this.router.use('/api/workOrders/:workOrderId/shoppingItem', workOrderShoppingItemController);
        this.router.use('/api/properties/:propertyId/sectors', propertySectorsController);
        this.router.use('/api/businesses', businessController);
        this.router.use('/api/businesses/:businessId/users', businessUserController);
        this.router.use('/api/users/:userId/businessUsers/:businessId', userBusinessUsersController);
        this.router.use('/api/users/:userId/businesses', userBusinessController);
        this.router.use('/api/licenses', licenseController);
        this.router.use('/api/users/:userId/licenses', userLicenseController);
    }

    getRouter() {
        return this.router;
    }
}

export { Router };
