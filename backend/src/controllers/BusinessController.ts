import express, {Request, Response} from 'express';
import { BusinessService } from '../services/BusinessService';
import { BusinessMapper } from '../entity_mappers/BusinessMapper';
import { BusinessDTO } from 'src/dtos/BusinessDTO';
import { BUSINESS_FIELDS } from '../constants/BodyFields';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { validateBody } from '../middleware/requestValidation';


const businessController = express.Router();
const businessService : BusinessService = new BusinessService();
const businessMapper : BusinessMapper = new BusinessMapper();

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

export { businessController };
