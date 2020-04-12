import express, { Request, Response } from 'express';
import { BusinessUserService } from '../services/BusinessUserService';
import { BusinessUserMapper } from '../entity_mappers/BusinessUserMapper';
import { BusinessMapper } from '../entity_mappers/BusinessMapper';
import { BusinessDTO } from '../dtos/BusinessDTO';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { getNewLogger } from '../Log4jsConfig';

const userBusinessController = express.Router({ mergeParams: true });
const businessUserService : BusinessUserService = new BusinessUserService();
const businessUserMapper : BusinessUserMapper = new BusinessUserMapper();
const businessMapper : BusinessMapper = new BusinessMapper();
const userBusinessControllerLogger = getNewLogger('UserBusinessController');

userBusinessController.post(
    '/:businessId', auth, async (req: Request, res: Response) => {
        try {
            userBusinessControllerLogger.debug(`Add user ${req.params.userId} to business ${req.params.businessId}`);
            const businessUser = await businessUserService.createBusinessUser(
                Number(req.params.businessId), Number(req.params.userId));
            return res.status(200).json(businessUserMapper.toDTO(businessUser));
        } catch (err) {
            return handleError(err, res);
        }
    });

userBusinessController.get('/:businessId', auth, async(req: Request, res: Response) => {
    try {
        userBusinessControllerLogger.debug(`Get business ${req.params.businessId} user ${req.params.userId}`);
        const businessUser = await businessUserService.getBusinessUserByBusinessIdAndUserId(
            Number(req.params.businessId), Number(req.params.userId));
        return res.status(200).json(businessUserMapper.toDTO(businessUser));
    } catch (err) {
        return handleError(err, res);
    }
});

userBusinessController.get('/', auth, async(req: Request, res: Response) => {
    try {
        userBusinessControllerLogger.debug(`Get user ${req.params.userId} businesses`);
        const businesses = await businessUserService.getBusinessesByUserId(
            Number(req.params.userId));
        const businessesDTO : BusinessDTO[] = [];
        businesses.map((business) => {
            businessesDTO.push(businessMapper.toDTO(business));
        });
        return res.status(200).json(businessesDTO);
    } catch (err) {
        return handleError(err, res);
    }
});

export { userBusinessController };
