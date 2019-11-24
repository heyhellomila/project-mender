import express, {Request, Response} from 'express';
import { PropertyService } from '../services/PropertyService';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { PropertyMapper } from '../entity_mappers/PropertyMapper';
import auth from '../middleware/auth';
import handleError from '../utils/HttpUtils';
import validateBody from '../middleware/requestValidation';
import { PropertyFields } from '../constants/BodyFields';

const userPropertiesController = express.Router({mergeParams: true});
const propertyService = new PropertyService();
const propertyMapper = new PropertyMapper();

userPropertiesController.post('/', auth, validateBody(PropertyFields.createFields), async (req: Request, res: Response) => {
    try {
        const propertyDTO : PropertyDTO = req.body as PropertyDTO;
        const property = await propertyService.createProperty(
            Number(req.params.userId), propertyMapper.fromDTO(propertyDTO));
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
