import {jsonProperty, Serializable} from 'ts-serializable';

export class EventClassPayloadModel extends Serializable {
    readonly TYPE_SINGLE = 'single';
    readonly TYPE_REGULAR = 'regular';

    @jsonProperty(String)
    studentName = '';

    @jsonProperty(String)
    lessonType = '';
}
