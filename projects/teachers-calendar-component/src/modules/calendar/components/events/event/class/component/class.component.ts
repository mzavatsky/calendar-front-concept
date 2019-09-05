import {Component, OnInit} from '@angular/core';
import {EventComponent} from '../../event.component';
import {EventClassPayloadModel} from '../model/event-class-payload.model';

@Component({
    selector: 'app-calendar-event-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.scss']
})
export class EventClassComponent extends EventComponent implements OnInit {
    payload: EventClassPayloadModel;

    ngOnInit(): void {
        super.ngOnInit();

        this.payload = EventClassPayloadModel.fromJSON(JSON.parse(this.event.payload));
    }
}
