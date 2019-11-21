import express, {Request, Response } from 'express';
import { PropertyService } from '../services/PropertyService';

const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const propertyService = new PropertyService();

const propertyController = express.Router();

propertyController.get('/:id', auth, async(req: Request, res: Response) => {
    try {
        const property = await propertyService.getPropertyById(Number(req.params.id));
        return res.status(200).json(property);
    } catch (err) {
        return handleError(err, res);
    } 
})

propertyController.patch('/:id', auth, async(req: Request, res: Response) => {
    try {
        await propertyService.updatePropertyById(Number(req.params.id), req.body);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    } 
})

export { propertyController };