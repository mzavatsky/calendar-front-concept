import {EventModel} from '@cal/model/event.model';
import {EventsInterface} from '@cal/interfaces/events.interface';
import {addSeconds, differenceInSeconds, startOfWeek} from 'date-fns';
import {Injectable} from '@angular/core';
import {MockEventsModel} from '@cal/mock-data/mock-events.model';

@Injectable({providedIn: 'root'})
export class MockEventsProviderService implements EventsInterface {
    private mockData: { invitations: any[], events: any[], slots: any[] };

    constructor() {
        this.mockData = MockEventsModel.allEvents;
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
        );
    }

    private mapToEvents(items: any[]): EventModel[] {
        return items.map(item => {
            return EventModel.fromJSON(item);
        });
    }

    private shiftToCurrentWeek(events: EventModel[]): EventModel[] {
        const currentWeekStart = startOfWeek(new Date());

        return events.map(event => {
            event.startAt = addSeconds(
                currentWeekStart,
                differenceInSeconds(
                    event.startAt,
                    startOfWeek(event.startAt)
                )
            );
            return event;
        });
    }
}
