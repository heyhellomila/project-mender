import { PriorityType } from '../../entities/PriorityType';

class PriorityTypeDataProvider {

    static getPriorityType(id: number, type: string) : PriorityType {
        const priorityType : PriorityType = new PriorityType();
        priorityType.id = id;
        priorityType.type = type;
        return priorityType;
    }
}

export { PriorityTypeDataProvider };
