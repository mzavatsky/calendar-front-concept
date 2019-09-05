import {Component, OnInit} from '@angular/core';
import {EventComponent} from '../../event.component';
import {EventMeetingPayloadModel} from '../model/event-meeting-payload.model';

@Component({
    selector: 'app-calendar-event-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss']
})
export class EventMeetingComponent extends EventComponent implements OnInit {
    payload: EventMeetingPayloadModel;

    ngOnInit(): void {
        super.ngOnInit();

        this.payload = EventMeetingPayloadModel.fromJSON(JSON.parse(this.event.payload));
    }
}
