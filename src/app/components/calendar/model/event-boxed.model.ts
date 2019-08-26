import {EventModel} from '@cal/model/event.model';
import {BoundingRectModel} from '@cal/model/bounding-rect.model';

export class EventBoxedModel {
    event: EventModel;
    boundingRect: BoundingRectModel;

    constructor(event: EventModel, boundingRect: BoundingRectModel) {
        this.event = event;
        this.boundingRect = boundingRect;
    }
}
