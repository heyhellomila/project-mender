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

    constructor(sectorType: string, workOrderType: string, title: string, cause: string, 
        serviceNeeded: boolean, description: string, priorityType: string, dueDate: Date, 
        createdDate: Date, createdByUserId: number, lastModifiedDate: Date, 
        lastModifiedByUserId: number, dateCompleted: Date, priceEstimate: number, 
        actualCost: number, id?: number, propertyId?: number) {

        this.sectorType = sectorType;
        this.workOrderType = workOrderType;
        this.title = title;
        this.cause = cause;
        this.serviceNeeded = serviceNeeded;
        this.priorityType = priorityType;
        this.dueDate = dueDate;
        this.createdDate = createdDate;
        this. createdByUserId = createdByUserId;
        this.priceEstimate = priceEstimate;
        this.id = id;
        this.propertyId = propertyId;
        this.description = description;
        this.lastModifiedDate = lastModifiedDate;
        this.lastModifiedByUserId = lastModifiedByUserId;
        this.dateCompleted = dateCompleted;
        this.actualCost = actualCost;
    }

}
