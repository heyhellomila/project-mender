import express, { Request, Response } from 'express';
import { PropertySectorService } from '../services/PropertySectorService';
import { PropertySectorMapper } from '../entity_mappers/PropertySectorMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { PropertySectorDTO } from '../dtos/PropertySectorDTO';
import { validateBody } from '../middleware/requestValidation';
import { PROPERTY_SECTOR_FIELDS } from '../constants/BodyFields';
import { PropertySector } from '../entities/PropertySector';

const propertySectorService = new PropertySectorService();
const propertySectorMapper = new PropertySectorMapper();

const propertySectorsController = express.Router({ mergeParams: true });

propertySectorsController.post(
    '/', validateBody(PROPERTY_SECTOR_FIELDS.createFields), auth,
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

propertySectorsController.patch(
    '/', validateBody(PROPERTY_SECTOR_FIELDS.patchFields), auth,
    async (req: Request, res: Response) => {
        try {
            const { propertyId } = req.params;
            const propertySectorDTOs : PropertySectorDTO[] = req.body as PropertySectorDTO[];
            await propertySectorService.update(
                Number(propertyId),
                propertySectorDTOs.map(propertySectorDTO =>
                    propertySectorMapper.fromDTO(propertySectorDTO)));
            return res.status(204).end();
        } catch (err) {
            return handleError(err, res);
        }
    });

propertySectorsController.get(
    '/', auth, async (req: Request, res: Response) => {
        try {
            const propertySectors : PropertySector[] = await propertySectorService
                .getSectorsByPropertyId(Number(req.params.propertyId));
            return res.status(200).json(propertySectors.map(
                propertySector => propertySectorMapper.toDTO(propertySector)));
        } catch (err) {
            return handleError(err, res);
        }
    });

export { propertySectorsController };
