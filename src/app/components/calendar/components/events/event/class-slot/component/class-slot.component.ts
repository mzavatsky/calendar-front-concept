import {Component, OnInit} from '@angular/core';
import {EventComponent} from '@cal/components/events/event/event.component';
import {EventClassSlotPayloadModel} from '@cal/components/events/event/class-slot/model/event-class-slot-payload.model';

@Component({
    selector: 'app-calendar-event-class-slot',
    templateUrl: './class-slot.component.html',
    styleUrls: ['./class-slot.component.scss']
})
export class EventClassSlotComponent extends EventComponent implements OnInit {
    payload: EventClassSlotPayloadModel;

    ngOnInit(): void {
        super.ngOnInit();

        this.payload = EventClassSlotPayloadModel.fromJSON(JSON.parse(this.event.payload));
    }
}
