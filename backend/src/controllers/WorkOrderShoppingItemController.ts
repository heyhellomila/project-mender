import express, { Request, Response } from 'express';
import { ShoppingItemService } from '../services/ShoppingItemService';
import { ShoppingItemDTO } from '../dtos/ShoppingItemDTO';
import { ShoppingItemMapper } from '../entity_mappers/ShoppingItemMapper';
import { validateBody } from '../middleware/requestValidation';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { SHOPPING_ITEM_FIELDS } from '../constants/BodyFields';
import { getNewLogger } from '../Log4jsConfig';

const workOrderShoppingItemController = express.Router({ mergeParams: true });
const shoppingItemService = new ShoppingItemService();
const shoppingItemMapper = new ShoppingItemMapper();
const workOrderShoppingItemControllerLogger = getNewLogger('WorkOrderShoppingItemController');

workOrderShoppingItemController.post(
    '/', auth, validateBody(SHOPPING_ITEM_FIELDS.createFields),
    async (req: Request, res: Response) => {
        try {
            req.body.bought = Boolean(JSON.parse(req.body.bought));
            const shoppingItemDTO : ShoppingItemDTO = req.body as ShoppingItemDTO;
            workOrderShoppingItemControllerLogger.debug(`Add shopping item ${JSON.stringify(shoppingItemDTO)} to work order ${req.params.workOrderId}`);
            const shoppingItem = await shoppingItemService.createShoppingItem(
                Number(req.params.workOrderId), shoppingItemMapper.fromDTO(shoppingItemDTO));

            return res.status(200).json(shoppingItemMapper.toDTO(shoppingItem));
        } catch (err) {
            return handleError(err, res);
        }
    },
);

workOrderShoppingItemController.get('/', auth, async (req: Request, res: Response) => {
    try {
        workOrderShoppingItemControllerLogger.debug(`Get shopping items for work order ${req.params.workOrderId}`);
        const shoppingItems = await shoppingItemService
        .getShoppingItemByWorkOrderId(Number(req.params.workOrderId));

        const shoppingItemDTOs : ShoppingItemDTO[] = [];
        shoppingItems.map((shoppingItem) => {
            shoppingItemDTOs.push(shoppingItemMapper.toDTO(shoppingItem));
        });
        return res.status(200).json(shoppingItemDTOs);
    } catch (err) {
        return handleError(err, res);
    }
});

export { workOrderShoppingItemController };
