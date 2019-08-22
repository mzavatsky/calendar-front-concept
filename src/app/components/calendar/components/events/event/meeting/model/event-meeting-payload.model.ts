import {jsonProperty, Serializable} from 'ts-serializable';

export class EventMeetingPayloadModel extends Serializable {
    @jsonProperty(String)
    public comment = '';

    @jsonProperty(Number)
    public numberOfParticipants = 0;
}
