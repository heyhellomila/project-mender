import express, {Request, Response} from 'express';
import { BusinessUserService } from '../services/BusinessUserService';
import { BusinessUserMapper } from '../entity_mappers/BusinessUserMapper';
import { BusinessMapper } from '../entity_mappers/BusinessMapper';
import { BusinessDTO } from '../dtos/BusinessDTO';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';

const userBusinessController = express.Router({ mergeParams: true });
const businessUserService : BusinessUserService = new BusinessUserService();
const businessUserMapper : BusinessUserMapper = new BusinessUserMapper();
const businessMapper : BusinessMapper = new BusinessMapper();

userBusinessController.post(
    '/:businessId', auth, async (req: Request, res: Response) => {
        try {
            const businessUser = await businessUserService.createBusinessUser(
                Number(req.params.businessId), Number(req.params.userId));
            return res.status(200).json(businessUserMapper.toDTO(businessUser));
        } catch (err) {
            return handleError(err, res);
        }
    });

userBusinessController.get('/:businessId', auth, async(req: Request, res: Response) => {
        try {
            const businessUser = await businessUserService.getBusinessUserByData(
                Number(req.params.businessId), Number(req.params.userId));
            return res.status(200).json(businessUserMapper.toDTO(businessUser));
        } catch (err) {
            return handleError(err, res);
        }
    });

userBusinessController.get('/', auth, async(req: Request, res: Response) => {
        try {
            const businesses = await businessUserService.getBusinessesByUser(Number(req.params.userId));
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
