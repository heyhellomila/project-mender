import express, { Request, Response } from 'express';
import { ShoppingItemService } from '../services/ShoppingItemService';
import { ShoppingItemMapper } from '../entity_mappers/ShoppingItemMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { getNewLogger } from '../Log4jsConfig';

const shoppingItemController = express.Router({ mergeParams: true });
const shoppingItemService = new ShoppingItemService();
const shoppingItemMapper = new ShoppingItemMapper();
const shoppingItemControllerLogger = getNewLogger('ShoppingItemController');

shoppingItemController.get('/:id', auth, async (req: Request, res: Response) => {
    try {
        shoppingItemControllerLogger.debug(`Get shopping item ${req.params.id}`);
        const shoppingItem = await shoppingItemService
        .getShoppingItem(Number(req.params.id));
        return res.status(200).json(shoppingItemMapper.toDTO(shoppingItem));
    } catch (err) {
        return handleError(err, res);
    }
});

shoppingItemController.patch('/:id', auth, async (req: Request, res: Response) => {
    try {
        shoppingItemControllerLogger.debug(`Update shopping item ${req.params.id}`);
        await shoppingItemService.updateShoppingItem(Number(req.params.id), req.body);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
});

shoppingItemController.delete('/:id', auth, async (req: Request, res: Response) => {
    try {
        shoppingItemControllerLogger.debug(`Delete shopping item ${req.params.id}`);
        await shoppingItemService.deleteShoppingItem(Number(req.params.id));
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
});

export { shoppingItemController };
