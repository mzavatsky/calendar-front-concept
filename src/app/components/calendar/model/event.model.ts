import {addSeconds} from 'date-fns';
import {jsonProperty, Serializable} from 'ts-serializable';
import {EventTypeModel} from '@cal/model/event-type.model';

export class EventModel extends Serializable {
    @jsonProperty(Date)
    startAt: Date = null;

    @jsonProperty(Number)
    durationSeconds = 0;

    @jsonProperty(String)
    type: string = EventTypeModel.TYPE_GENERIC;

    @jsonProperty(String)
    payload = '{}';

    get endAt(): Date {
        return addSeconds(this.startAt, this.durationSeconds);
    }
}
