import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventClassComponent} from './components/events/event/class/component/class.component';
import {EventClassSlotComponent} from './components/events/event/class-slot/component/class-slot.component';
import {EventComponent} from './components/events/event/event.component';
import {EventGenericComponent} from './components/events/event/generic/component/generic.component';
import {EventMeetingComponent} from './components/events/event/meeting/component/meeting.component';
import {GridComponent} from './components/grid/grid.component';
import {HoursAxisComponent} from './components/hours-axis/hours-axis.component';
import {LayerEventsComponent} from './components/layer-events/layer-events.component';
import {LayoutComponent} from './components/layout/layout.component';
import {WeekdaysAxisComponent} from './components/weekdays-axis/weekdays-axis.component';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
    declarations: [
        EventClassComponent,
        EventClassSlotComponent,
        EventComponent,
        EventGenericComponent,
        EventMeetingComponent,
        GridComponent,
        HoursAxisComponent,
        LayerEventsComponent,
        LayoutComponent,
        ModalComponent,
        WeekdaysAxisComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LayoutComponent
    ]
})
export class CalendarModule {}
