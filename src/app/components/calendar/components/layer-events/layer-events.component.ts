import {Component, Input, OnInit} from '@angular/core';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';
import {EventModel} from '@cal/model/event.model';

@Component({
    selector: 'app-calendar-layer-events',
    templateUrl: './layer-events.component.html',
    styleUrls: ['./layer-events.component.scss']
})
export class LayerEventsComponent implements OnInit {
    @Input() coordsConverter: CoordsConverterInterface;

    @Input() events: EventModel[];

    ngOnInit(): void {
    }

    get visibleEvents(): EventModel[] {
        return this.events.filter(event => {
            return this.coordsConverter.getBoundingRect(event.startAt, event.durationSeconds) !== null;
        });
    }
}
