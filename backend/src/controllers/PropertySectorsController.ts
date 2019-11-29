import express, { Request, Response } from 'express';
import { PropertySectorService } from '../services/PropertySectorService';
import { PropertySectorMapper } from '../entity_mappers/PropertySectorMapper';
import auth from '../middleware/auth';
import handleError from '../utils/HttpUtils';
import validateBody from '../middleware/requestValidation';
import { PropertySectorDTO } from '../dtos/PropertySectorDTO';
import { PropertySector } from '../entities/PropertySector';
import { PROPERTY_SECTOR_FIELDS } from '../constants/BodyFields';

const propertySectorService = new PropertySectorService();
const propertySectorMapper = new PropertySectorMapper();

const propertySectorsController = express.Router({ mergeParams: true });

propertySectorsController.post('/', validateBody(PROPERTY_SECTOR_FIELDS.createFields), auth,
    async (req: Request, res: Response) => {
        try {
            const propertySectorDTOs : PropertySectorDTO[] = req.body as PropertySectorDTO[];
            const propertySectors : PropertySector[] = await propertySectorService
                .createPropertySectors(
                    Number(req.params.propertyId),
                    propertySectorDTOs.map(propertySectorDTO =>
                        propertySectorMapper.fromDTO(propertySectorDTO)));
            return res.status(200).json(propertySectors.map(propertySector =>
                propertySectorMapper.toDTO(propertySector)));
        } catch (err) {
            return handleError(err, res);
        }
    });

export { propertySectorsController };
