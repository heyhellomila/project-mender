import express, {Request, Response} from 'express';
import { BusinessUserService } from '../services/BusinessUserService';
import { BusinessUserMapper } from '../entity_mappers/BusinessUserMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';

const userBusinessUsersController = express.Router({ mergeParams: true });
const businessUserService : BusinessUserService = new BusinessUserService();
const businessUserMapper : BusinessUserMapper = new BusinessUserMapper();

userBusinessUsersController.post(
    '/', auth, async (req: Request, res: Response) => {
        try {
            const businessUser = await businessUserService.createBusinessUser(
                Number(req.params.businessId), Number(req.params.userId));
            return res.status(200).json(businessUserMapper.toDTO(businessUser));
        } catch (err) {
            return handleError(err, res);
        }
    });

userBusinessUsersController.get('/', auth, async(req: Request, res: Response) => {
        try {
            const businessUser = await businessUserService.getBusinessUserByData(
                Number(req.params.businessId), Number(req.params.userId));
            return res.status(200).json(businessUserMapper.toDTO(businessUser));
        } catch (err) {
            return handleError(err, res);
        }
    });

export { userBusinessUsersController };
