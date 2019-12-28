import express, {Request, Response} from 'express';
import { ShoppingItemService } from '../services/ShoppingItemService';
import { ShoppingItemDTO } from '../dtos/ShoppingItemDTO';
import { ShoppingItemMapper } from '../entity_mappers/ShoppingItemMapper'
import { validateBody } from '../middleware/requestValidation';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { ShoppingItemFields } from '../constants/BodyFields';

const workOrderShoppingItemController = express.Router({mergeParams: true});
const shoppingItemService = new ShoppingItemService();
const shoppingItemMapper = new ShoppingItemMapper();

workOrderShoppingItemController.post('/', auth, validateBody(ShoppingItemFields.createFields), async (req: Request, res: Response) => {
    try{
        req.body.status = Boolean(JSON.parse(req.body.status));
        const shoppingItemDTO : ShoppingItemDTO = req.body as ShoppingItemDTO;
        const shoppingItem = await shoppingItemService.createShoppingItem(Number(req.params.workOrderId),
            shoppingItemMapper.fromDTO(shoppingItemDTO));

        return res.status(200).json(shoppingItemMapper.toDTO(shoppingItem));
    } catch (err) {
        return handleError(err, res);
    }
})

workOrderShoppingItemController.get('/', auth, async (req: Request, res: Response) => {
    try{
        const shoppingItems = await shoppingItemService
        .getShoppingItemByWorkOrderId(Number(req.params.workOrderId));

        var shoppingItemDTOs : ShoppingItemDTO[] = [];
        shoppingItems.map((shoppingItem) => {
            shoppingItemDTOs.push(shoppingItemMapper.toDTO(shoppingItem));
        });
        return res.status(200).json(shoppingItemDTOs);
    } catch (err) {
        return handleError(err, res);
    } 
})

export { workOrderShoppingItemController };