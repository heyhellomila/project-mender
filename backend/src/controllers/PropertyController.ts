import express, { Request, Response } from 'express';
import { PropertyService } from '../services/PropertyService';
import { PropertyMapper } from '../entity_mappers/PropertyMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateArrayBody } from '../middleware/requestValidation';
import { PROPERTY_SECTOR_FIELDS } from '../constants/BodyFields';
import { PropertySectorDTO } from '../dtos/PropertySectorDTO';
import { PropertySector } from '../entities/PropertySector';
import { PropertySectorService } from '../services/PropertySectorService';
import { PropertySectorMapper } from '../entity_mappers/PropertySectorMapper';

const propertyService = new PropertyService();
const propertyMapper = new PropertyMapper();
const propertySectorService = new PropertySectorService();
const propertySectorMapper = new PropertySectorMapper();

const propertyController = express.Router();

propertyController.get('/:id', auth, async(req: Request, res: Response) => {
    try {
        const property = await propertyService.getPropertyById(Number(req.params.id));
        return res.status(200).json(propertyMapper.toDTO(property));
    } catch (err) {
        return handleError(err, res);
    }
});

propertyController.patch('/:id', auth, async(req: Request, res: Response) => {
    try {
        await propertyService.updatePropertyById(Number(req.params.id), req.body);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
});

propertyController.post(
    '/:propertyId/sectors', validateArrayBody(PROPERTY_SECTOR_FIELDS.createFields), auth,
    async (req: Request, res: Response) => {
        try {
            const { propertyId } = req.params;
            const propertySectorDTOs : PropertySectorDTO[] = req.body as PropertySectorDTO[];
            const propertySectors : PropertySector[] = await propertySectorService
                .createPropertySectors(
                    Number(propertyId),
                    propertySectorDTOs.map(propertySectorDTO =>
                        propertySectorMapper.fromDTO(propertySectorDTO)));
            return res.status(200).json(propertySectors.map(propertySector =>
                propertySectorMapper.toDTO(propertySector)));
        } catch (err) {
            return handleError(err, res);
        }
    });

export { propertyController };
