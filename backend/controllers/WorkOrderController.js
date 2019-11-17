const express = require('express');
const WorkOrderService = require('../services/WorkOrderService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const workOrderController = express.Router();
const workOrderService = new WorkOrderService();

workOrderController.get('/:id', auth, async(req, res) => {
    try {
        const workOrder = await workOrderService.getWorkOrder(req.params.id);
        return res.status(200).json(workOrder);
    } catch (err) {
        return handleError(err, res);
    } 
})

workOrderController.get('/search', auth, async(req,res) => {
    try {
        const workOrders = await workOrderService.searchWorkOrders(req.params);
        return res.status(200).json(workOrders);
    } catch (err) {
        return handleError(err, res);
    }
})

module.exports = workOrderController;
