import {Component, Input, OnInit} from '@angular/core';
import {EventComponent} from '@cal/components/events/event/event.component';
import {EventGenericPayloadModel} from '@cal/components/events/event/generic/model/event-generic-payload.model';

@Component({
    selector: 'app-calendar-event-generic',
    templateUrl: './generic.component.html',
    styleUrls: ['./generic.component.scss']
})
export class EventGenericComponent extends EventComponent implements OnInit {
    payload: EventGenericPayloadModel;

    ngOnInit(): void {
        super.ngOnInit();
        this.payload = EventGenericPayloadModel.fromJSON(JSON.parse(this.event.payload));
    }
}
