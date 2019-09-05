import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventBoxedModel} from '../../model/event-boxed.model';
import {EventModel} from '../../model/event.model';

@Component({
    selector: 'app-calendar-layer-events',
    templateUrl: './layer-events.component.html',
    styleUrls: ['./layer-events.component.scss']
})
export class LayerEventsComponent {
    @Input() events: EventBoxedModel[];
    @Output() clickAction = new EventEmitter<EventModel>();

    handleClickAction(event: EventModel) {
        this.clickAction.emit(event);
    }
}
