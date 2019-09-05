import {Component, OnInit} from '@angular/core';
import {EventClassSlotPayloadModel} from '../model/event-class-slot-payload.model';
import {EventComponent} from '../../event.component';

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
