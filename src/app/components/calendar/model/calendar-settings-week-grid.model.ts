import {CalendarSettingsInterface} from '@cal/interfaces/calendar-settings.interface';

export class CalendarSettingsWeekGridModel implements CalendarSettingsInterface{
    readonly hourHeightPx = 80; // 80

    readonly dayWidthPx = 100; // 94

    readonly eventShift = 10;

    daysVisible: Date[] = [];

    hoursVisible: Date[] = [];

    constructor(daysVisible: Date[], hoursVisible: Date[]) {
        this.daysVisible = daysVisible;
        this.hoursVisible = hoursVisible;
    }

    getDaysVisible(): Date[] {
        return this.daysVisible;
    }

    getHoursVisible(): Date[] {
        return this.hoursVisible;
    }
}
