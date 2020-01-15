import express, {Request, Response} from 'express';
import { BusinessService } from '../services/BusinessService';
import { BusinessMapper } from '../entity_mappers/BusinessMapper';
import auth from '../middleware/auth';

const businessController = express.Router();
const businessService : BusinessService = new BusinessService();
const businessMapper : BusinessMapper = new BusinessMapper();


//when a business is successfully created, the user must have a admin business-user created for that business

export { businessController };
