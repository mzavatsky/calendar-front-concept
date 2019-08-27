import {EventModel} from '@cal/model/event.model';
import {EventsInterface} from '@cal/interfaces/events.interface';
import {addHours, addSeconds, differenceInSeconds, endOfWeek, startOfHour, startOfWeek} from 'date-fns';
import {Injectable} from '@angular/core';
import {MockEventsModel} from '@cal/mock-data/mock-events.model';
import {EventTypeModel} from '@cal/model/event-type.model';

@Injectable({providedIn: 'root'})
export class MockEventsProviderService implements EventsInterface {
    private mockData: { invitations: any[], events: any[], slots: any[] };

    constructor() {
        this.mockData = MockEventsModel.allEvents;
        this.mockData.slots = this.generateSlots();
    }

    getInvitations(): EventModel[] {
        return this.shiftToCurrentWeek(
            this.mapToEvents(this.mockData.invitations)
        );
    }

    getEvents(): EventModel[] {
        return this.shiftToCurrentWeek(
            this.mapToEvents(this.mockData.events)
        );
    }

    getSlots(): EventModel[] {
        return this.shiftToCurrentWeek(
            this.mapToEvents(this.mockData.slots)
        ).filter(slot => {
            const idx = this.getEvents().findIndex(event =>
                (event.startAt >= slot.startAt && event.startAt <= slot.endAt)
                || (event.endAt >= slot.startAt && event.endAt <= slot.endAt)
            );

            return idx < 0;
        });
    }

    private generateSlots() {
        let startAt = startOfWeek(new Date(), {weekStartsOn: 1});
        const maxStartAt = endOfWeek(startAt, {weekStartsOn: 1});

        const slots = [];

        while (startAt < maxStartAt) {
            const payload = {
                isOpen: Math.random() > 0.8,
                isRecommended: false
            };

            slots.push(
                {
                    startAt: startOfHour(startAt),
                    durationSeconds: 59 * 60,
                    type: EventTypeModel.TYPE_CLASS_SLOT,
                    payload: JSON.stringify(payload)
                }
            );

            startAt = addHours(startAt, 1);
        }

        return slots;
    }

    private mapToEvents(items: any[]): EventModel[] {
        return items.map(item => {
            return EventModel.fromJSON(item);
        });
    }

    private shiftToCurrentWeek(events: EventModel[]): EventModel[] {
        const currentWeekStart = startOfWeek(new Date(), {weekStartsOn: 1});

        return events.map(event => {
            event.startAt = addSeconds(
                currentWeekStart,
                differenceInSeconds(
                    event.startAt,
                    startOfWeek(event.startAt, {weekStartsOn: 1})
                )
            );
            return event;
        });
    }
}
