import {BoundingRectModel} from '../model/bounding-rect.model';
import {EventBoxedModel} from '../model/event-boxed.model';

export class LayoutModel {
    dimensions: BoundingRectModel = new BoundingRectModel(0, 0, 0, 0);
    horizontalAxisTicks: EventBoxedModel[] = [];
    verticalAxisTicks: EventBoxedModel[] = [];
    invitations: EventBoxedModel[] = [];
    events: EventBoxedModel[] = [];
    slots: EventBoxedModel[] = [];


    constructor(
        dimensions: BoundingRectModel,
        horizontalAxisTicks: EventBoxedModel[],
        verticalAxisTicks: EventBoxedModel[],
        invitations: EventBoxedModel[],
        events: EventBoxedModel[],
        slots: EventBoxedModel[]
    ) {
        this.dimensions = dimensions;
        this.horizontalAxisTicks = horizontalAxisTicks;
        this.verticalAxisTicks = verticalAxisTicks;
        this.invitations = invitations;
        this.events = events;
        this.slots = slots;
    }
}
