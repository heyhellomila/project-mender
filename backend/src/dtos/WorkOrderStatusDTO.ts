export class WorkOrderStatusDTO {

    id: number;
    status: string;

    constructor(status? : string) {
        if (status) {
            this.status = status;
        }
    }
}
