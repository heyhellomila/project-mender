const ShoppingItemGateway = require('../gateways/ShoppingItemGateway');
const WorkOrderService = require('./WorkOrderService')
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const workOrderService = new WorkOrderService();

class ShoppingItemService {

    async createShoppingItem(workOrder_id, name, quantity, price) {
        if(!await workOrderService.workOrderExists(workOrder_id)) {
            throw new ResourceNotFoundError('Work Order ' + workOrder_id + ' Does not exist');
        }
        try {
            return await ShoppingItemGateway.createShoppingItem(workOrder_id, name, quantity, price);
        } catch(err) {
            throw new BadRequestError(err.message);
        }
    }

    async getShoppingItemByWorkOrderId(workOrder_id) {
        if(!await workOrderService.workOrderExists(workOrder_id)) {
            throw new ResourceNotFoundError('Work Order ' + workOrder_id + ' Does not exist');
        }
        try {
            return await ShoppingItemGateway.getShoppingItemByWorkOrder(workOrder_id);
        } catch (err) {
            throw err;
        }
    }

    async getShoppingItem(id) {
        try{
            return await ShoppingItemGateway.getShoppingItemById(id);
        } catch (err) {
            throw err;
        }
    }
}