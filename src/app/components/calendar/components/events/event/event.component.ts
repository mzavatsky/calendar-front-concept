import {Component, Input, OnInit} from '@angular/core';
import {BoundingRectModel} from '@cal/model/bounding-rect.model';
import {EventModel} from '@cal/model/event.model';
import {EventTypeModel} from '@cal/model/event-type.model';

@Component({
    selector: 'app-calendar-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() boundingRect: BoundingRectModel;
    @Input() event: EventModel;

    eventType = EventTypeModel;

    ngOnInit(): void {
    }
}
