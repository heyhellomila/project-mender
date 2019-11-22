import express, {Request, Response} from 'express';

import { PropertyService } from '../services/PropertyService';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { PropertyMapper } from '../entity_mappers/PropertyMapper';
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const userPropertiesController = express.Router({mergeParams: true});

const propertyService = new PropertyService();
const propertyMapper = new PropertyMapper();

const creationFields = ['name', 'propertyType', 'address', 'activityStatus']

userPropertiesController.post('/', auth, validateBody(creationFields), async (req: Request, res: Response) => {
    try {
        const { name, propertyType, address, activityStatus } = req.body;
        const property = await propertyService.createProperty(
            Number(req.params.userId), name, propertyType, address, activityStatus);
        return res.status(200).json(propertyMapper.toDTO(property));
    } catch (err) {
        return handleError(err, res);
    }
})

userPropertiesController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const properties = await propertyService.getPropertiesByUser(Number(req.params.userId));
        var propertiesDTO : PropertyDTO[] = [];
        properties.map((property) => {
            propertiesDTO.push(propertyMapper.toDTO(property));
        });
        return res.status(200).json(propertiesDTO);
    } catch (err) {
        return handleError(err, res);
    } 
})

export {userPropertiesController };
