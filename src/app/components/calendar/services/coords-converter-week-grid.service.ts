import {CoordsConverterInterface} from '../interfaces/coords-converter.interface';
import {BoundingRectModel} from '../model/bounding-rect.model';
import {CalendarSettingsWeekGridModel} from '../model/calendar-settings-week-grid.model';
import {addSeconds, differenceInSeconds, endOfDay, endOfHour, startOfDay, startOfHour} from 'date-fns';
import {CalendarSettingsInterface} from '../interfaces/calendar-settings.interface';

export class CoordsConverterWeekGridService implements CoordsConverterInterface {
    private settings: CalendarSettingsWeekGridModel;

    constructor(settings: CalendarSettingsWeekGridModel) {
        this.settings = settings;
    }

    /**
     * Считаем, что события уже были заранее «порезаны» на разные дни, если это требовалось
     */
    getBoundingRect(startAt: Date, durationSeconds: number): BoundingRectModel|null {
        if (this.settings.hoursVisible.length === 0
            || this.settings.daysVisible.length === 0
        ) {
            return null;
        }

        const dayIndex = this.findDayIndex(startAt);

        if (dayIndex === null) {
            return null;
        }

        const left = dayIndex * this.settings.dayWidthPx;

        let hourIndex = 0;

        while (
            hourIndex < this.settings.hoursVisible.length
            && startAt > endOfHour(startOfDay(this.settings.daysVisible[dayIndex]).setHours(
                    this.settings.hoursVisible[hourIndex].getHours()
                ))
        ) {
            hourIndex += 1;
        }

        if (hourIndex >= this.settings.hoursVisible.length) {
            return null;
        }

        let currentHour = startOfHour(startOfDay(this.settings.daysVisible[dayIndex]).setHours(
            this.settings.hoursVisible[hourIndex].getHours())
        );

        let top = hourIndex * this.settings.hourHeightPx;

        if (startAt > currentHour) {
            top += this.secondsToPx(differenceInSeconds(startAt, currentHour));
        }

        const endAt = addSeconds(startAt, durationSeconds);

        while (
            hourIndex < this.settings.hoursVisible.length - 1
            && endAt > startOfHour(startOfDay(this.settings.daysVisible[dayIndex]).setHours(
                this.settings.hoursVisible[hourIndex + 1].getHours()
            ))
        ) {
            hourIndex += 1;
        }

        currentHour = endOfHour(startOfDay(this.settings.daysVisible[dayIndex]).setHours(
            this.settings.hoursVisible[hourIndex].getHours()
        ));

        let bottom = hourIndex * this.settings.hourHeightPx + this.settings.hourHeightPx;

        if (endAt < currentHour) {
            bottom -= this.secondsToPx(differenceInSeconds(currentHour, endAt));
        }

        return new BoundingRectModel(
            top,
            left,
            this.settings.dayWidthPx,
            bottom - top
        );
    }

    private findDayIndex(startAt: Date): number|null {
        let dayIndex = 0;

        while (
            dayIndex < this.settings.daysVisible.length
            && startAt > endOfDay(this.settings.daysVisible[dayIndex])
            ) {
            dayIndex += 1;
        }

        if (dayIndex >= this.settings.daysVisible.length
            || startAt < startOfDay(this.settings.daysVisible[dayIndex])
        ) {
            return null;
        }

        return dayIndex;
    }

    private secondsToPx(seconds: number): number {
        return Math.round(this.settings.hourHeightPx * seconds / 3600);
    }

    getSettings(): CalendarSettingsInterface {
        return this.settings;
    }

    getLayoutDimensionsStyle(): {[p: string]: string} {
        const layoutWidth = this.settings.daysVisible.length * this.settings.dayWidthPx;
        const layoutHeight = this.settings.hoursVisible.length * this.settings.hourHeightPx;

        return {
            width: `${layoutWidth}px`,
            height: `${layoutHeight}px`
        };
    }
}
