import {Component, ElementRef, Input, OnInit} from '@angular/core';
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
    readonly SCROLL_SOURCE_NONE = 0;
    readonly SCROLL_SOURCE_GRID = 1;
    readonly SCROLL_SOURCE_AXIS = 2;

    private currentVerticalScrollSource = this.SCROLL_SOURCE_NONE;
    private currentVerticalScrollSourceTimeoutId = -1;

    private currentHorizontalScrollSource = this.SCROLL_SOURCE_NONE;
    private currentHorizontalScrollSourceTimeoutId = -1;

    fromDate: Date;

    settings: CalendarSettingsWeekGridModel;
    coordsConverter: CoordsConverterInterface;

    ngOnInit(): void {
        this.fromDate = startOfWeek(new Date(), {weekStartsOn: 1});

        const days = eachDay(
            startOfWeek(this.fromDate, {weekStartsOn: 1}),
            endOfWeek(this.fromDate, {weekStartsOn: 1}),
        );

        const hours = [];

        for (let i = 8; i < 24; i++) {
            const hour = addHours(startOfDay(this.fromDate), i);
            hours.push(hour);
        }

        this.settings = new CalendarSettingsWeekGridModel(days, hours);
        this.coordsConverter = new CoordsConverterWeekGridService(this.settings);
    }

    syncScroll(grid: HTMLElement, horizontalAxis: HTMLElement, verticalAxis: HTMLElement, scrollSource: number): void {
        this.syncHorizontalScroll(grid, horizontalAxis, scrollSource);
        this.syncVerticalScroll(grid, verticalAxis, scrollSource);
    }

    syncVerticalScroll(grid: HTMLElement, axis: HTMLElement, scrollSource: number): void {
        if (this.currentVerticalScrollSource !== this.SCROLL_SOURCE_NONE
            && this.currentVerticalScrollSource !== scrollSource
        ) {
            return;
        }

        if (this.currentVerticalScrollSourceTimeoutId > 0) {
            clearTimeout(this.currentVerticalScrollSourceTimeoutId);
        }
        this.currentVerticalScrollSource = scrollSource;

        switch (scrollSource) {
            case this.SCROLL_SOURCE_GRID:
                axis.scrollTop = grid.scrollTop;
                break;
            case this.SCROLL_SOURCE_AXIS:
                grid.scrollTop = axis.scrollTop;
        }

        this.currentVerticalScrollSourceTimeoutId = setTimeout(
            () => {
                this.currentVerticalScrollSource = this.SCROLL_SOURCE_NONE;
                this.currentVerticalScrollSourceTimeoutId = -1;
            },
            100
        );
    }

    syncHorizontalScroll(grid: HTMLElement, axis: HTMLElement, scrollSource: number): void {
        if (this.currentHorizontalScrollSource !== this.SCROLL_SOURCE_NONE
            && this.currentHorizontalScrollSource !== scrollSource
        ) {
            return;
        }

        if (this.currentHorizontalScrollSourceTimeoutId > 0) {
            clearTimeout(this.currentHorizontalScrollSourceTimeoutId);
        }
        this.currentHorizontalScrollSource = scrollSource;

        switch (scrollSource) {
            case this.SCROLL_SOURCE_GRID:
                axis.scrollLeft = grid.scrollLeft;
                break;
            case this.SCROLL_SOURCE_AXIS:
                grid.scrollLeft = axis.scrollLeft;
        }

        this.currentHorizontalScrollSourceTimeoutId = setTimeout(
            () => {
                this.currentHorizontalScrollSource = this.SCROLL_SOURCE_NONE;
                this.currentHorizontalScrollSourceTimeoutId = -1;
            },
            100
        );
    }
}
