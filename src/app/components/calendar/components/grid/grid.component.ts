import {Component, Input, OnInit} from '@angular/core';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';
import {CalendarSettingsWeekGridModel} from '@cal/model/calendar-settings-week-grid.model';

@Component({
    selector: 'app-calendar-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    @Input() settings: CalendarSettingsWeekGridModel;
    @Input() coordsConverter: CoordsConverterInterface;

    ngOnInit(): void {
    }

    getHourRowPositionStyle(): {[p: string]: string} {
        return {
            width: `${this.settings.dayWidthPx * this.settings.getDaysVisible().length}px`,
            height: `${this.settings.hourHeightPx}px`
        };
    }

    getCellPositionStyle(): {[p: string]: string} {
        return {
            width: `${this.settings.dayWidthPx}px`,
            height: `${this.settings.hourHeightPx}px`
        };
    }
}
