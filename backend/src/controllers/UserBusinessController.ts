import express, {Request, Response} from 'express';
import { BusinessMapper } from '../entity_mappers/BusinessMapper';
import { BusinessUserService } from '../services/BusinessUserService';
import { BusinessDTO } from '../dtos/BusinessDTO';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';

const userBusinessController = express.Router({ mergeParams: true });
const businessUserService : BusinessUserService = new BusinessUserService();
const businessMapper : BusinessMapper = new BusinessMapper();


userBusinessController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const businessUsers = await businessUserService.getBusinessUsersByUser(Number(req.params.userId));
        const businessesDTO : BusinessDTO[] = [];
        businessUsers.map((businessUser) => {
            businessesDTO.push(businessMapper.toDTO(businessUser.business));
        });
        return res.status(200).json(businessesDTO);
    } catch (err) {
        return handleError(err, res);
    }
});

export { userBusinessController };