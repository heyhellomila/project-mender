import express, {Request, Response} from 'express';
import { LicenseService } from '../services/LicenseService';
import { LicenseMapper } from '../entity_mappers/LicenseMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';

const userLicenseController = express.Router();
const licenseService : LicenseService = new LicenseService();
const licenseMapper : LicenseMapper = new LicenseMapper();


export { userLicenseController };
