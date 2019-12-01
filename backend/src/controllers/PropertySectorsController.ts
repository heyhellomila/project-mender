import express, { Request, Response } from 'express';
import { PropertySectorService } from '../services/PropertySectorService';
import { PropertySectorMapper } from '../entity_mappers/PropertySectorMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { PropertySectorDTO } from '../dtos/PropertySectorDTO';

const propertySectorService = new PropertySectorService();
const propertySectorMapper = new PropertySectorMapper();

const propertySectorsController = express.Router({ mergeParams: true });

propertySectorsController.patch('/:propertySectorId', auth, async (req: Request, res: Response) => {
    try {
        const { propertySectorId } = req.params;
        const propertySectorDTO : PropertySectorDTO = req.body as PropertySectorDTO;
        await propertySectorService.update(
            Number(propertySectorId),
            propertySectorMapper.fromDTO(propertySectorDTO));
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
})

export { propertySectorsController };
