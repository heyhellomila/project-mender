const express = require('express');
const PropertyService = require('../services/PropertyService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const propertyController = express.Router();
const propertyService = new PropertyService();

propertyController.get('/:id', auth, async(req, res) => {
    try {
        const property = await propertyService.getPropertyById(req.params.id);
        return res.status(200).json(property);
    } catch (err) {
        return handleError(err, res);
    } 
})

propertyController.patch('/:id/updateProperty', auth, async(req, res) => {
    try {
        const property = await propertyService.updatePropertyById(req.params.id, req.body);
        return res.status(200).json(property);
    } catch (err) {
        return handleError(err, res);
    } 
})

module.exports = propertyController;
