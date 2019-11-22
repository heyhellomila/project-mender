import express, {Request, Response} from 'express';
import { UserService } from '../services/UserService';
import { UserMapper } from '../entity_mappers/UserMapper';
import auth from '../middleware/auth';
import handleError from '../utils/HttpUtils';
import validateBody from '../middleware/requestValidation';
import { UserFields } from './BodyFields';

const userController = express.Router();
const userService : UserService = new UserService();
const userMapper : UserMapper = new UserMapper();

userController.post('/', validateBody(UserFields.createFields), async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName, phoneNumber, userType } = req.body;
        const user = await userService.register(email, password, 
            firstName, lastName, phoneNumber, userType);
        return res.status(200).json(userMapper.toDTO(user));
    } catch (err) {
        return handleError(err, res);
    }
})

userController.post('/login', validateBody(UserFields.loginFields), async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await userService.login(email, password);
        return res.status(200).json({ token });
    } catch (err) {
        return handleError(err, res);
    }
})

userController.get('/:id', auth, async (req: Request, res: Response) => {
    try {
        const user = await userService.getUser(Number(req.params.id));
        return res.status(200).json(userMapper.toDTO(user));
    } catch (err) {
        return handleError(err, res);
    }
})

userController.patch('/:id', auth, async (req, res) => {
    try {
        await userService.updateUserById(Number(req.params.id), req.body);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
})

export { userController };
