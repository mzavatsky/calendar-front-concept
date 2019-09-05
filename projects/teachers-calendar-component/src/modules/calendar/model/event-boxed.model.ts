import {EventModel} from '../model/event.model';
import {BoundingRectModel} from '../model/bounding-rect.model';

export class EventBoxedModel {
    event: EventModel;
    boundingRect: BoundingRectModel;

    constructor(event: EventModel, boundingRect: BoundingRectModel) {
        this.event = event;
        this.boundingRect = boundingRect;
    }
}
