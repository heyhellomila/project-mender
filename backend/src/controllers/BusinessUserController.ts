import express, {Request, Response} from 'express';
import { UserService } from '../services/UserService';
import { BusinessUserService } from '../services/BusinessUserService';
import { UserMapper } from '../entity_mappers/UserMapper';
import { UserDTO } from '../dtos/UserDTO';
import { BusinessUserDTO } from '../dtos/BusinessUserDTO';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { BusinessUserMapper } from '../entity_mappers/BusinessUserMapper';

const businessUserController = express.Router({ mergeParams: true });
const businessUserService : BusinessUserService = new BusinessUserService();
const businessUserMapper : BusinessUserMapper = new BusinessUserMapper();
const userService : UserService = new UserService();
const userMapper : UserMapper = new UserMapper();

businessUserController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const businessUsers = await businessUserService.getBusinessUsersByBusiness(Number(req.params.businessId));
        const usersDTO : UserDTO[] = [];
        businessUsers.map(async (businessUser) => {
            usersDTO.push(userMapper.toDTO(businessUser.user))
        });
        return res.status(200).json(usersDTO);
    } catch (err) {
        return handleError(err, res);
    }
});


export { businessUserController };