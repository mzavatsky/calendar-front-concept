import {jsonProperty, Serializable} from 'ts-serializable';

export class EventGenericPayloadModel extends Serializable {
    @jsonProperty(String)
    public comment = 'VOID';
}
