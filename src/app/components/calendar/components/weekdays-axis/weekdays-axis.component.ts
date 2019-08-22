import {Component, Input, OnInit} from '@angular/core';
import {startOfWeek, endOfWeek, eachDay, isToday} from 'date-fns';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';

@Component({
    selector: 'app-calendar-weekdays-axis',
    templateUrl: './weekdays-axis.component.html',
    styleUrls: ['./weekdays-axis.component.scss']
})
export class WeekdaysAxisComponent implements OnInit {
    @Input() settings: CalendarSettingsWeekGridModel;

    isToday = isToday;

    ngOnInit(): void {
    }
}
