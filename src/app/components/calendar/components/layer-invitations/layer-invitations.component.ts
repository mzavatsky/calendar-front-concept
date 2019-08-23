import {Component, Input, OnInit} from '@angular/core';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';
import {EventModel} from '@cal/model/event.model';

@Component({
    selector: 'app-calendar-layer-invitations',
    templateUrl: './layer-invitations.component.html',
    styleUrls: ['./layer-invitations.component.scss']
})
export class LayerInvitationsComponent implements OnInit {
    @Input() coordsConverter: CoordsConverterInterface;

    @Input() invitations: EventModel[];

    ngOnInit(): void {
    }

    get visibleEvents(): EventModel[] {
        return this.invitations.filter(event => {
            return this.coordsConverter.getBoundingRect(event.startAt, event.durationSeconds) !== null;
        });
    }
}
