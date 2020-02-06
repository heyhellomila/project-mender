import express, { Request, Response } from 'express';
import { BusinessService } from '../services/BusinessService';
import { BusinessMapper } from '../entity_mappers/BusinessMapper';
import { BusinessDTO } from 'src/dtos/BusinessDTO';
import { BusinessUserService } from '../services/BusinessUserService';
import { UserMapper } from '../entity_mappers/UserMapper';
import { UserDTO } from '../dtos/UserDTO';
import { BUSINESS_FIELDS } from '../constants/BodyFields';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';

const businessController = express.Router({ mergeParams: true });
const businessService : BusinessService = new BusinessService();
const businessMapper : BusinessMapper = new BusinessMapper();
const businessUserService : BusinessUserService = new BusinessUserService();
const userMapper : UserMapper = new UserMapper();

businessController.post(
    '/', auth, validateBody(BUSINESS_FIELDS.createFields), async (req: Request, res: Response) => {
        try {
            const businessDTO : BusinessDTO = req.body as BusinessDTO;
            const business = await businessService.createBusiness(
                businessMapper.fromDTO(businessDTO));
            return res.status(200).json(businessMapper.toDTO(business));
        } catch (err) {
            return handleError(err, res);
        }
    });

businessController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const business = await businessService.getBusinessById(Number(req.query.id));
        return res.status(200).json(businessMapper.toDTO(business));
    } catch (err) {
        return handleError(err, res);
    }
});

businessController.get('/:businessId/users', auth, async(req: Request, res: Response) => {
    try {
        const users = await businessUserService.getUsersByBusinessId(Number(req.params.businessId));
        const usersDTO : UserDTO[] = [];
        users.map((user) => {
            usersDTO.push(userMapper.toDTO(user));
        });
        return res.status(200).json(usersDTO);
    } catch (err) {
        return handleError(err, res);
    }
});

export { businessController };
