export class ActivityStatusDTO {
    
    id: number;
    status: string;

    constructor(status? : string) {
        if (status) {
            this.status = status;
        }
    }
}
