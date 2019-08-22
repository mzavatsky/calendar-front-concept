import {Component, Input, OnInit} from '@angular/core';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';
import {EventModel} from '@cal/model/event.model';

@Component({
    selector: 'app-calendar-invitations',
    templateUrl: './invitations.component.html',
    styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {
    @Input() coordsConverter: CoordsConverterInterface;

    invitations: EventModel[];

    ngOnInit(): void {
        const invitationsMocks = [
            {
                startAt: new Date(2019, 7, 20, 11, 30, 0),
                durationSeconds: 30 * 60,
                type: 'test',
                payload: '{"comment": "Стендап"}'
            },
            {
                startAt: new Date(2019, 7, 21, 11, 30, 0),
                durationSeconds: 30 * 60,
                type: 'test',
                payload: '{"comment": "Стендап"}'
            },
            {
                startAt: new Date(2019, 7, 22, 11, 30, 0),
                durationSeconds: 30 * 60,
                type: 'test',
                payload: '{"comment": "Стендап"}'
            },
            {
                startAt: new Date(2019, 7, 23, 13, 0, 0),
                durationSeconds: 1.5 * 60 * 60,
                type: 'test',
                payload: '{"comment": "Гоша Live"}'
            }
        ];

        this.invitations = invitationsMocks.map(event => {
            return EventModel.fromJSON(event);
        });

        console.log(this.coordsConverter.getBoundingRect(
           this.invitations[0].startAt,
           this.invitations[0].durationSeconds
        ));
    }

    get visibleEvents(): EventModel[] {
        return this.invitations.filter(event => {
            return this.coordsConverter.getBoundingRect(event.startAt, event.durationSeconds) !== null;
        });
    }
}
