import express, {Request, Response } from 'express';
import PropertyService from '../services/PropertyService';

const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const propertyController = express.Router();

propertyController.get('/:id', auth, async(req: Request, res: Response) => {
    try {
        const property = await PropertyService.getPropertyById(req.params.id);
        return res.status(200).json(property);
    } catch (err) {
        return handleError(err, res);
    } 
})

propertyController.patch('/:id', auth, async(req: Request, res: Response) => {
    try {
        await PropertyService.updatePropertyById(req.params.id, req.body);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    } 
})

export { propertyController };