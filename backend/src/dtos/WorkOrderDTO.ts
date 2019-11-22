export class WorkOrderDTO {
    
    id: number;
    propertyId: number;
    sectorType: string;
    workOrderType: string;
    title: string
    cause: string
    serviceNeeded: boolean
    priorityType: string;
    description: string
    dueDate: Date
    createdDate: Date
    createdByUserId: number;
    lastModifiedDate: Date
    lastModifiedByUserId: number;
    dateCompleted: Date
    priceEstimate: number
    actualCost: number

}
