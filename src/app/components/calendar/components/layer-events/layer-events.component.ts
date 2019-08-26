import {Component, Input, OnInit} from '@angular/core';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';
import {EventBoxedModel} from '@cal/model/event-boxed.model';

@Component({
    selector: 'app-calendar-layer-events',
    templateUrl: './layer-events.component.html',
    styleUrls: ['./layer-events.component.scss']
})
export class LayerEventsComponent implements OnInit {
    @Input() coordsConverter: CoordsConverterInterface;

    @Input() events: EventBoxedModel[];

    ngOnInit(): void {
    }
}
