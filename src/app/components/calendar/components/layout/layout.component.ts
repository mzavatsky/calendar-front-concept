import {Component, Input, OnInit} from '@angular/core';
import {eachDay, endOfWeek, startOfDay, startOfWeek, addHours} from 'date-fns';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';
import {CoordsConverterWeekGridService} from '@cal/services/coords-converter-week-grid.service';

@Component({
    selector: 'app-calendar-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    fromDate: Date;

    settings: CalendarSettingsWeekGridModel;
    coordsConverter: CoordsConverterInterface;

    ngOnInit(): void {
        this.fromDate = startOfWeek(new Date(), { weekStartsOn: 1 });

        const days = eachDay(
            startOfWeek(this.fromDate, { weekStartsOn: 1 }),
            endOfWeek(this.fromDate, { weekStartsOn: 1 }),
        );

        const hours = [];

        for (let i = 0; i < 24; i++) {
            const hour = addHours(startOfDay(this.fromDate), i);
            hours.push(hour);
        }

        this.settings = new CalendarSettingsWeekGridModel(days, hours);
        this.coordsConverter = new CoordsConverterWeekGridService(this.settings);
    }
}
