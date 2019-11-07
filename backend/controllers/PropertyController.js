const express = require('express');
const Property = require('../models/Property');
const PropertyService = require('../services/PropertyService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const propertyController = express.Router();
const propertyService = new PropertyService();

const creationFields = ['user_id', 'name', 'address']

propertyController.post('/', auth, validateBody(creationFields), async (req, res) => {
    try {
        const property = await propertyService.createProperty(req.body.user_id, req.body.name, req.body.address);
        return res.status(200).json({ property });
    } catch (err) {
        return handleError(err, res);
    }
})

propertyController.get('/', auth, async(req, res) => {
    try {
        const properties = await propertyService.getPropertiesByUser(req.params.user_id);
        return res.status(200).json(properties);
    } catch (err) {
        return handleError(err, res);
    } 
})

propertyController.get('/:id', auth, async(req, res) => {
    try {
        const property = await propertyService.getPropertyById(req.params.id);
        return res.status(200).json(property);
    } catch (err) {
        return handleError(err, res);
    } 
})
