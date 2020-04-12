import express, { Request, Response } from 'express';
import { PropertyService } from '../services/PropertyService';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { PropertyMapper } from '../entity_mappers/PropertyMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';
import { PROPERTY_FIELDS } from '../constants/BodyFields';
import { getNewLogger } from '../Log4jsConfig';

const userPropertiesController = express.Router({ mergeParams: true });
const propertyService = new PropertyService();
const propertyMapper = new PropertyMapper();
const userPropertiesControllerLogger = getNewLogger('UserPropertiesController');

userPropertiesController.post(
    '/', auth, validateBody(PROPERTY_FIELDS.createFields), async (req: Request, res: Response) => {
        try {
            const propertyDTO : PropertyDTO = req.body as PropertyDTO;
            userPropertiesControllerLogger.debug(`Add property ${JSON.stringify(propertyDTO)} to user ${req.params.userId}`);
            const property = await propertyService.createProperty(
                Number(req.params.userId), propertyMapper.fromDTO(propertyDTO));
            return res.status(200).json(propertyMapper.toDTO(property));
        } catch (err) {
            return handleError(err, res);
        }
    });

userPropertiesController.get('/', auth, async(req: Request, res: Response) => {
    try {
        userPropertiesControllerLogger.debug(`Get properties for user ${req.params.userId}`);
        const { activityStatus } = req.query;
        const properties = await propertyService.getProperties(
            Number(req.params.userId), activityStatus);
        const propertiesDTO : PropertyDTO[] = [];
        properties.map((property) => {
            propertiesDTO.push(propertyMapper.toDTO(property));
        });
        return res.status(200).json(propertiesDTO);
    } catch (err) {
        return handleError(err, res);
    }
});

export { userPropertiesController };
