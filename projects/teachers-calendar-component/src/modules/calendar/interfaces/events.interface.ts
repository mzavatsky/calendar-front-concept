import {EventModel} from '../model/event.model';

export interface EventsInterface {
    getInvitations(): EventModel[];

    getEvents(): EventModel[];

    getSlots(): EventModel[];
}
