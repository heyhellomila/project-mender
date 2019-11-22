import express, {Request, Response} from 'express';
import { UserService } from '../services/UserService';
import { UserDTO } from '../dtos/UserDTO';
import { UserMapper } from '../entity_mappers/UserMapper';

const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const userController = express.Router();

const loginFields = ['email', 'password']
const registerFields = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'userType']

const userService : UserService = new UserService();
const userMapper : UserMapper = new UserMapper();

userController.post('/', validateBody(registerFields), async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName, phoneNumber, userType } = req.body;
        const user = await userService.register(email, password, 
            firstName, lastName, phoneNumber, userType);
        return res.status(200).json(userMapper.toDTO(user));
    } catch (err) {
        return handleError(err, res);
    }
})

userController.post('/login', validateBody(loginFields), async (req: Request, res: Response) => {
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
