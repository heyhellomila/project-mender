import express, {Request, Response} from 'express';
import { LicenseService } from '../services/LicenseService';
import { LicenseMapper } from '../entity_mappers/LicenseMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';

const licenseController = express.Router();
const licenseService : LicenseService = new LicenseService();
const licenseMapper : LicenseMapper = new LicenseMapper();

licenseController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const license = await licenseService.getLicenseById(Number(req.query.id));
        return res.status(200).json(licenseMapper.toDTO(license));
    } catch (err) {
        return handleError(err, res);
    }
});

export { licenseController };
