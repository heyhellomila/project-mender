import express, {Request, Response} from 'express';
import UserService from '../services/UserService';

const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const userController = express.Router();

const loginFields = ['email', 'password']
const registerFields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'type']

userController.post('/', validateBody(registerFields), async (req: Request, res: Response) => {
    try {
        const { email, password, first_name, last_name, phone_number, type } = req.body;
        const user = await UserService.register(email, password, first_name, last_name, phone_number, type);
        return res.status(200).json(user);
    } catch (err) {
        return handleError(err, res);
    }
})

userController.post('/login', validateBody(loginFields), async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.login(email, password);
        return res.status(200).json({ token });
    } catch (err) {
        return handleError(err, res);
    }
})

userController.get('/:id', auth, async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUser(req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        return handleError(err, res);
    }
})

userController.patch('/:id', auth, async (req, res) => {
    try {
        await UserService.updateUserById(req.params.id, req.body);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
})

export { userController };
