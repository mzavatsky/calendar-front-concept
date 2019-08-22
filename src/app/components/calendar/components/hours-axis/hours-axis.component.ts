import {Component, Input, OnInit} from '@angular/core';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';

@Component({
    selector: 'app-calendar-hours-axis',
    templateUrl: './hours-axis.component.html',
    styleUrls: ['./hours-axis.component.scss']
})
export class HoursAxisComponent implements OnInit {
    @Input() coordsConverter: CoordsConverterInterface;
    @Input() settings: CalendarSettingsWeekGridModel;

    ngOnInit(): void {
    }

    getHourPositionStyle(h: Date): {[p: string]: string} {
        const box = this.coordsConverter.getBoundingRect(h, 0);

        return {
            height: `${this.settings.hourHeightPx}px`,
            top: `${box.top}px`,
            left: '0'
        };
    }

    getAxisPositionStyle(): {[p: string]: string} {
        return {
            height: `${this.settings.hourHeightPx * this.settings.getHoursVisible().length}px`,
        };
    }
}
