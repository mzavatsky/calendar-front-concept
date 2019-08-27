import {Component, Input, OnInit} from '@angular/core';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';
import {EventBoxedModel} from '@cal/model/event-boxed.model';

@Component({
    selector: 'app-calendar-hours-axis',
    templateUrl: './hours-axis.component.html',
    styleUrls: ['./hours-axis.component.scss']
})
export class HoursAxisComponent implements OnInit {
    @Input() ticks: EventBoxedModel[];
    @Input() settings: CalendarSettingsWeekGridModel;

    ngOnInit(): void {
    }

    getHourPositionStyle(h: EventBoxedModel): {[p: string]: string} {
        const box = h.boundingRect;

        return {
            height: `${this.settings.hourHeightPx}px`,
            top: `${box.top}px`,
            left: '0'
        };
    }
}
