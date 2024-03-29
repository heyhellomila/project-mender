import express, { Request, Response } from 'express';
import { PropertyService } from '../services/PropertyService';
import { PropertyMapper } from '../entity_mappers/PropertyMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { getNewLogger } from '../Log4jsConfig';

const propertyController = express.Router();
const propertyService = new PropertyService();
const propertyMapper = new PropertyMapper();
const propertyControllerLogger = getNewLogger('PropertyController');

propertyController.get('/:id', auth, async(req: Request, res: Response) => {
    try {
        propertyControllerLogger.debug(`Get property ${req.params.id}`);
        const property = await propertyService.getPropertyById(Number(req.params.id));
        return res.status(200).json(propertyMapper.toDTO(property));
    } catch (err) {
        return handleError(err, res);
    }
});

propertyController.patch('/:id', auth, async(req: Request, res: Response) => {
    try {
        const propertyDTO : PropertyDTO = req.body as PropertyDTO;
        propertyControllerLogger.debug(`Update property ${req.params.id}`);
        await propertyService.updatePropertyById(
            Number(req.params.id), propertyMapper.fromDTO(propertyDTO));
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
});

export { propertyController };
