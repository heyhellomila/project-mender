import express, {Request, Response} from 'express';

import { PropertyService } from '../services/PropertyService';
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const userPropertiesController = express.Router({mergeParams: true});

const propertyService = new PropertyService();

const creationFields = ['name', 'propertyType', 'address', 'status']

userPropertiesController.post('/', auth, validateBody(creationFields), async (req: Request, res: Response) => {
    try {
        const { name, propertyType, address, status } = req.body;
        const property = await propertyService.createProperty(
            Number(req.params.userId), name, propertyType, address, status);
        return res.status(200).json(property);
    } catch (err) {
        return handleError(err, res);
    }
})

userPropertiesController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const properties = await propertyService.getPropertiesByUser(Number(req.params.userId));
        return res.status(200).json(properties);
    } catch (err) {
        return handleError(err, res);
    } 
})

export {userPropertiesController };
