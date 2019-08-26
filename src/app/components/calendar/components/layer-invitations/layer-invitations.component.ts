import {Component, Input, OnInit} from '@angular/core';
import {EventBoxedModel} from '@cal/model/event-boxed.model';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';

@Component({
    selector: 'app-calendar-layer-invitations',
    templateUrl: './layer-invitations.component.html',
    styleUrls: ['./layer-invitations.component.scss']
})
export class LayerInvitationsComponent implements OnInit {
    @Input() coordsConverter: CoordsConverterInterface;

    @Input() invitations: EventBoxedModel[];

    ngOnInit(): void {
    }
}
