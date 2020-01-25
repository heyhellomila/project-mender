import express, {Request, Response} from 'express';
import { BusinessUserService } from '../services/BusinessUserService';
import { BusinessUserMapper } from '../entity_mappers/BusinessUserMapper';
import auth from '../middleware/auth';
import { BusinessUserDTO } from 'src/dtos/BusinessUserDTO';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';

const businessUserController = express.Router();
const businessUserService : BusinessUserService = new BusinessUserService();
const businessUserMapper : BusinessUserMapper = new BusinessUserMapper();

businessUserController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const businessUser = await businessUserService.getBusinessUser(Number(req.query.id));
        return res.status(200).json(businessUserMapper.toDTO(businessUser));
    } catch (err) {
        return handleError(err, res);
    }
});

export { businessUserController };
