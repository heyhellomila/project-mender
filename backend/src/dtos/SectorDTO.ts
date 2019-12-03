export class SectorDTO {

    id: number;
    type: string;
    kind: string;

    constructor(kind? : string) {
        if (kind) {
            this.kind = kind;
        }
    }
}
