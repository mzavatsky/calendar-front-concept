import {Component, OnInit, Renderer2} from '@angular/core';
import {eachDay, endOfWeek, startOfDay, startOfWeek, addHours} from 'date-fns';
import {CalendarSettingsWeekGridModel} from '../../model/calendar-settings-week-grid.model';
import {CoordsConverterInterface} from '../../interfaces/coords-converter.interface';
import {CoordsConverterWeekGridService} from '../../services/coords-converter-week-grid.service';
import {MockEventsProviderService} from '../../services/mock-events-provider.service';
import {EventBoxedModel} from '../../model/event-boxed.model';
import {BoundingRectModel} from '../../model/bounding-rect.model';
import {EventModel} from '../../model/event.model';
import {LayoutModel} from '../../model/layout.model';

@Component({
    selector: 'tcc-calendar-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    private static SCROLL_SYNC_DELAY_MS = 200;

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

    layout: LayoutModel;

    isModalVisible = false;
    modalEvent: EventModel|null = null;

    constructor(
        public eventsProvider: MockEventsProviderService
    ) {}

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

        this.prepareLayout();
    }

    private prepareLayout() {
        this.layout = new LayoutModel(
            this.layoutDimensions,
            this.horizontalAxisTicks,
            this.verticalAxisTicks,
            this.boxedInvitations,
            this.boxedEvents,
            this.boxedSlots
        );
    }

    private get horizontalAxisTicks(): EventBoxedModel[] {
        return this.settings.getDaysVisible().map(d => {
            return new EventBoxedModel(
                EventModel.fromJSON({startAt: d}),
                this.coordsConverter.getBoundingRect(d, 0)
            );
        });
    }

    private get verticalAxisTicks(): EventBoxedModel[] {
        return this.settings.getHoursVisible().map(d => {
            return new EventBoxedModel(
                EventModel.fromJSON({startAt: d}),
                this.coordsConverter.getBoundingRect(d, 0)
            );
        });}

    private get layoutDimensions(): BoundingRectModel {
        return new BoundingRectModel(
            0,
            0,
            this.settings.getDaysVisible().length * this.settings.dayWidthPx,
            this.settings.getHoursVisible().length * this.settings.hourHeightPx
        );
    }

    private get boxedInvitations(): EventBoxedModel[] {
        const boxedEvents = this.eventsProvider.getInvitations().map(event => {
            const boundingRect = this.coordsConverter.getBoundingRect(event.startAt, event.durationSeconds);

            return boundingRect === null
                ? null
                : new EventBoxedModel(
                    event,
                    new BoundingRectModel(
                        boundingRect.top,
                        boundingRect.left + this.settings.eventShift,
                        boundingRect.width - this.settings.eventShift,
                        boundingRect.height
                    )
                );
        });

        return boxedEvents.filter(event => event !== null);
    }

    private get boxedEvents(): EventBoxedModel[] {
        const boxedEvents = this.eventsProvider.getEvents().map(event => {
            const boundingRect = this.coordsConverter.getBoundingRect(event.startAt, event.durationSeconds);

            return boundingRect === null
                ? null
                : new EventBoxedModel(
                    event,
                    new BoundingRectModel(
                        boundingRect.top,
                        boundingRect.left,
                        boundingRect.width - this.settings.eventShift,
                        boundingRect.height
                    )
                );
        });

        return boxedEvents.filter(event => event !== null);
    }

    private get boxedSlots(): EventBoxedModel[] {
        const boxedEvents = this.eventsProvider.getSlots().map(event => {
            const boundingRect = this.coordsConverter.getBoundingRect(event.startAt, event.durationSeconds);

            return boundingRect === null
                ? null
                : new EventBoxedModel(
                    event,
                    new BoundingRectModel(
                        boundingRect.top,
                        boundingRect.left,
                        boundingRect.width - this.settings.eventShift,
                        boundingRect.height
                    )
                );
        });

        return boxedEvents.filter(event => event !== null);
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
            LayoutComponent.SCROLL_SYNC_DELAY_MS
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
            LayoutComponent.SCROLL_SYNC_DELAY_MS
        );
    }

    handleClickAction(event: EventModel) {
        this.modalEvent = event;
        this.isModalVisible = true;
    }

    hideModal() {
        this.isModalVisible = false;
        this.modalEvent = null;
    }
}
