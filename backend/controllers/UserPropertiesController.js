const express = require('express');
const PropertyService = require('../services/PropertyService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const userPropertiesController = express.Router({mergeParams: true});
const propertyService = new PropertyService();

const creationFields = ['name', 'type', 'address'];

userPropertiesController.post('/', auth, validateBody(creationFields), async (req, res) => {
    try {
        const { name, type, address } = req.body;
        const property = await propertyService.createProperty(
            req.params.userId, name, type, address);
        return res.status(200).json({ property });
    } catch (err) {
        return handleError(err, res);
    }
})

userPropertiesController.get('/', auth, async(req, res) => {
    try {
        const properties = await propertyService.getPropertiesByUser(req.params.userId);
        return res.status(200).json(properties);
    } catch (err) {
        return handleError(err, res);
    } 
});

module.exports = userPropertiesController;
