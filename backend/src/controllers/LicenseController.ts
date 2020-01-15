import express, {Request, Response} from 'express';
import { LicenseService } from '../services/LicenseService';
import { LicenseMapper } from '../entity_mappers/LicenseMapper';
import auth from '../middleware/auth';

const licenseController = express.Router();
const licenseService : LicenseService = new LicenseService();
const licenseMapper : LicenseMapper = new LicenseMapper();


export { licenseController };
