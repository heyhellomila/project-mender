import express from 'express';
import { userController } from './UserController';
import { userPropertiesController } from './UserPropertiesController';
import { propertyController } from './PropertyController';
import { propertyWorkOrdersController } from './PropertyWorkOrdersController';
import { workOrderController } from './WorkOrderController';

const router = express.Router();

router.use('/api/users', userController);
router.use('/api/users/:userId/properties', userPropertiesController)
router.use('/api/properties', propertyController);
router.use('/api/workOrders', workOrderController);
router.use('/api/properties/:propertyId/workorders', propertyWorkOrdersController);

export { router };
