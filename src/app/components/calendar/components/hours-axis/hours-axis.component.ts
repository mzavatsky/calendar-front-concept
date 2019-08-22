import {Component, Input, OnInit} from '@angular/core';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';

@Component({
    selector: 'app-calendar-hours-axis',
    templateUrl: './hours-axis.component.html',
    styleUrls: ['./hours-axis.component.scss']
})
export class HoursAxisComponent implements OnInit {
    @Input() settings: CalendarSettingsWeekGridModel;

    ngOnInit(): void {
    }
}
