import express, { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserMapper } from '../entity_mappers/UserMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';
import { USER_FIELDS } from '../constants/BodyFields';
import { UserDTO } from 'src/dtos/UserDTO';
import { getNewLogger } from '../Log4jsConfig'

const userController = express.Router();
const userService : UserService = new UserService();
const userMapper : UserMapper = new UserMapper();
const userControllerLogger = getNewLogger('UserController');

userController.post(
    '/', validateBody(USER_FIELDS.createFields), async (req: Request, res: Response) => {
        try {
            const userDTO : UserDTO = req.body as UserDTO;
            userControllerLogger.debug(`Register user ${userDTO.email}`);
            const { password } = req.body;
            const user = await userService.register(userMapper.fromDTO(userDTO), password);
            return res.status(200).json(userMapper.toDTO(user));
        } catch (err) {
            return handleError(err, res);
        }
    },
);

userController.post(
    '/login', validateBody(USER_FIELDS.loginFields), async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            userControllerLogger.debug(`Login user ${email}`);
            const token = await userService.login(email, password);
            return res.status(200).json({ token });
        } catch (err) {
            return handleError(err, res);
        }
    },
);

userController.get('/:id', auth, async (req: Request, res: Response) => {
    try {
        const user = await userService.getUser(Number(req.params.id));
        userControllerLogger.debug(`Get user ${user.email}`);
        return res.status(200).json(userMapper.toDTO(user));
    } catch (err) {
        return handleError(err, res);
    }
});

userController.patch('/:id', auth, async (req, res) => {
    try {
        const userDTO : UserDTO = req.body as UserDTO;
        userControllerLogger.debug(`Update user ${userDTO.email}`);
        await userService.updateUserById(Number(req.params.id), userMapper.fromDTO(userDTO));
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
});

export { userController };
