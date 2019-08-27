import {jsonProperty, Serializable} from 'ts-serializable';

export class EventClassSlotPayloadModel extends Serializable {
    @jsonProperty(Boolean)
    isOpen = false;

    @jsonProperty(Boolean)
    isRecommended = false;
}
