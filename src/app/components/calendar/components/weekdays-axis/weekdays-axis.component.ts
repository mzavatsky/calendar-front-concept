import {Component, Input, OnInit} from '@angular/core';
import {isToday, startOfDay} from 'date-fns';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';

@Component({
    selector: 'app-calendar-weekdays-axis',
    templateUrl: './weekdays-axis.component.html',
    styleUrls: ['./weekdays-axis.component.scss']
})
export class WeekdaysAxisComponent implements OnInit {
    @Input() settings: CalendarSettingsWeekGridModel;
    @Input() coordsConverter: CoordsConverterInterface;

    isToday = isToday;

    ngOnInit(): void {
    }

    get firstDayVisible(): Date {
        return this.coordsConverter.getSettings().getDaysVisible()[0];
    }

    getDayPositionStyle(d: Date): {[p: string]: string} {
        const box = this.coordsConverter.getBoundingRect(startOfDay(d), 0);

        return {
            width: `${this.settings.dayWidthPx}px`,
            top: '0',
            left: `${box.left}px`
        };
    }

    getAxisPositionStyle(): {[p: string]: string} {
        return {
            width: `${this.settings.dayWidthPx * this.settings.getDaysVisible().length}px`,
        };
    }
}
