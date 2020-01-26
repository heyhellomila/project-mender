import { WorkOrderDTO } from './WorkOrderDTO';

export class ShoppingItemDTO {
    id: number;
    workOrder: WorkOrderDTO;
    name: string;
    quantity: number;
    price: number;
    bought: Boolean;
}
