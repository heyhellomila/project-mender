import express, { Request, Response } from 'express';
import { LicenseService } from '../services/LicenseService';
import { LicenseDTO } from '../dtos/LicenseDTO';
import { LicenseMapper } from '../entity_mappers/LicenseMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';
import { LICENSE_FIELDS } from '../constants/BodyFields';
import { getNewLogger } from '../Log4jsConfig';

const userLicenseController = express.Router({ mergeParams: true });
const licenseService : LicenseService = new LicenseService();
const licenseMapper : LicenseMapper = new LicenseMapper();
const userLicenseControllerLogger = getNewLogger('UserLicenseController');

userLicenseController.post(
    '/', auth, validateBody(LICENSE_FIELDS.createFields), async (req: Request, res: Response) => {
        try {
            const licenseDTO : LicenseDTO = req.body as LicenseDTO;
            userLicenseControllerLogger.debug(`Add license ${JSON.stringify(licenseDTO)} to user ${req.params.userId}`);
            const license = await licenseService.createLicense(
                Number(req.params.userId), licenseMapper.fromDTO(licenseDTO));
            return res.status(200).json(licenseMapper.toDTO(license));
        } catch (err) {
            return handleError(err, res);
        }
    });

userLicenseController.get('/', auth, async(req: Request, res: Response) => {
    try {
        userLicenseControllerLogger.debug(`Get licenses for user ${req.params.userId}`);
        const licenses = await licenseService.getLicensesByUserId(Number(req.params.userId));
        const licensesDTO : LicenseDTO[] = [];
        licenses.map((license) => {
            licensesDTO.push(licenseMapper.toDTO(license));
        });
        return res.status(200).json(licensesDTO);
    } catch (err) {
        return handleError(err, res);
    }
});

export { userLicenseController };
