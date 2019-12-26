import express, {Request, Response} from 'express';
import { BusinessUserService } from '../services/BusinessUserService';
import { BusinessUserMapper } from '../entity_mappers/BusinessUserMapper';
import auth from '../middleware/auth';

const businessUserController = express.Router();
const businessUserService : BusinessUserService = new BusinessUserService();
const businessUserMapper : BusinessUserMapper = new BusinessUserMapper();


export { businessUserController };
