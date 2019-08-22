import {BoundingRectModel} from '@cal/model/bounding-rect.model';
import {CalendarSettingsInterface} from '@cal/interfaces/calendar-settings.interface';

export interface CoordsConverterInterface {
    getBoundingRect(startAt: Date, durationSeconds: number): BoundingRectModel|null;
    getSettings(): CalendarSettingsInterface;
    getLayoutDimensionsStyle(): {[p: string]: string};
}
