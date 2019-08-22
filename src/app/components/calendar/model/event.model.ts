import {addSeconds} from 'date-fns';
import {jsonProperty, Serializable} from 'ts-serializable';

export class EventModel extends Serializable {
    static readonly TYPE_GENERIC = 'generic';
    static readonly TYPE_MEETING = 'meeting';

    @jsonProperty(Date)
    startAt: Date = null;

    @jsonProperty(Number)
    durationSeconds: number = 0;

    @jsonProperty(String)
    type: string = EventModel.TYPE_GENERIC;

    @jsonProperty(String)
    payload = '{}';

    get endAt(): Date {
        return addSeconds(this.startAt, this.durationSeconds);
    }
}
