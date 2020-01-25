import express, {Request, Response} from 'express';
import { BusinessUserService } from '../services/BusinessUserService';
import { BusinessUserMapper } from '../entity_mappers/BusinessUserMapper';
import auth from '../middleware/auth';
import { BusinessUserDTO } from 'src/dtos/BusinessUserDTO';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';
import { BUSINESS_USER_FIELDS } from '../constants/BodyFields';

const userBusinessUsersController = express.Router({ mergeParams: true });
const businessUserService : BusinessUserService = new BusinessUserService();
const businessUserMapper : BusinessUserMapper = new BusinessUserMapper();

userBusinessUsersController.post(
    '/', auth, validateBody(BUSINESS_USER_FIELDS.createFields), async (req: Request, res: Response) => {
        try {
            const businessUserDTO : BusinessUserDTO = req.body as BusinessUserDTO;
            const businessUser = await businessUserService.createBusinessUser(
                Number(req.params.userId), businessUserMapper.fromDTO(businessUserDTO));
            return res.status(200).json(businessUserMapper.toDTO(businessUser));
        } catch (err) {
            return handleError(err, res);
        }
    });

userBusinessUsersController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const businessUsers = await businessUserService.getBusinessUsersByUser(Number(req.params.userId));
        const businessUsersDTO : BusinessUserDTO[] = [];
        businessUsers.map((businessUser) => {
            businessUsersDTO.push(businessUserMapper.toDTO(businessUser));
        });
        return res.status(200).json(businessUsersDTO);
    } catch (err) {
        return handleError(err, res);
    }
});

export { userBusinessUsersController };
