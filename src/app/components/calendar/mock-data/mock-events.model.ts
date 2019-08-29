import {EventTypeModel} from '@cal/model/event-type.model';

export class MockEventsModel {
    static readonly invitations = [
        {
            startAt: new Date(2019, 7, 12, 11, 30, 0),
            durationSeconds: 59 * 60,
            type: EventTypeModel.TYPE_MEETING,
            payload: '{"comment": "Ретро", "numberOfParticipants": 9}'
        },
        {
            startAt: new Date(2019, 7, 20, 11, 30, 0),
            durationSeconds: 45 * 60 - 1,
            type: EventTypeModel.TYPE_MEETING,
            payload: '{"comment": "Стендап", "numberOfParticipants": 9}'
        },
        {
            startAt: new Date(2019, 7, 20, 13, 0, 0),
            durationSeconds: 60 * 60 - 1,
            type: EventTypeModel.TYPE_MEETING,
            payload: '{"comment": "Встреча с руководителем", "numberOfParticipants": 2}'
        },
        {
            startAt: new Date(2019, 7, 21, 11, 30, 0),
            durationSeconds: 30 * 60 - 1,
            type: EventTypeModel.TYPE_GENERIC,
            payload: '{"comment": "Стендап"}'
        },
        {
            startAt: new Date(2019, 7, 22, 11, 30, 0),
            durationSeconds: 30 * 60 - 1,
            type: EventTypeModel.TYPE_GENERIC,
            payload: '{"comment": "Стендап"}'
        },
        {
            startAt: new Date(2019, 7, 23, 13, 0, 0),
            durationSeconds: 1.5 * 60 * 60 - 1,
            type: EventTypeModel.TYPE_GENERIC,
            payload: '{"comment": "Гоша Live"}'
        }
    ];

    static readonly events = [
        {
            startAt: new Date(2019, 7, 19, 11, 0, 0),
            durationSeconds: 59 * 60,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Петя Васечкин", "lessonType": "single"}'
        },
        {
            startAt: new Date(2019, 7, 19, 15, 0, 0),
            durationSeconds: 59 * 60,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Иван Дорн", "lessonType": "regular"}'
        },
        {
            startAt: new Date(2019, 7, 20, 10, 0, 0),
            durationSeconds: 59 * 60,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Константин Константинопольский", "lessonType": "regular"}'
        },
        {
            startAt: new Date(2019, 7, 21, 10, 0, 0),
            durationSeconds: 30 * 60 - 1,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Константин Константинопольский", "lessonType": "regular"}'
        },
        {
            startAt: new Date(2019, 7, 22, 10, 30, 0),
            durationSeconds: 30 * 60 - 1,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Константин Константинопольский", "lessonType": "regular"}'
        },
        {
            startAt: new Date(2019, 7, 23, 9, 0, 0),
            durationSeconds: 45 * 60 - 1,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Константин Константинопольский", "lessonType": "regular"}'
        },
        {
            startAt: new Date(2019, 7, 31, 12, 0, 0),
            durationSeconds: 45 * 60 - 1,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Лара Крофт", "lessonType": "regular"}'
        },
        {
            startAt: new Date(2019, 8, 1, 12, 0, 0),
            durationSeconds: 45 * 60 - 1,
            type: EventTypeModel.TYPE_CLASS,
            payload: '{"studentName": "Лара Крофт", "lessonType": "regular"}'
        },
    ];

    static readonly slots = [];

    static readonly allEvents: { invitations: any[], events: any[], slots: any[] } = {
        invitations: MockEventsModel.invitations,
        events: MockEventsModel.events,
        slots: []
    };
}
