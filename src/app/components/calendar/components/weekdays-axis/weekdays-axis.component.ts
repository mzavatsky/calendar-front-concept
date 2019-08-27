import {Component, Input, OnInit} from '@angular/core';
import {isToday} from 'date-fns';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';
import {EventBoxedModel} from '@cal/model/event-boxed.model';

@Component({
    selector: 'app-calendar-weekdays-axis',
    templateUrl: './weekdays-axis.component.html',
    styleUrls: ['./weekdays-axis.component.scss']
})
export class WeekdaysAxisComponent implements OnInit {
    @Input() settings: CalendarSettingsWeekGridModel;
    @Input() ticks: EventBoxedModel[];

    isToday = isToday;

    ngOnInit(): void {
    }

    get firstDayVisible(): Date {
        return this.ticks[0].event.startAt;
    }

    getDayPositionStyle(tick: EventBoxedModel): {[p: string]: string} {
        const box = tick.boundingRect;

        return {
            width: `${this.settings.dayWidthPx}px`,
            top: '0',
            left: `${box.left}px`
        };
    }
}
