import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from '@cal/components/layout/layout.component';
import {HoursAxisComponent} from '@cal/components/hours-axis/hours-axis.component';
import {WeekdaysAxisComponent} from '@cal/components/weekdays-axis/weekdays-axis.component';
import {GridComponent} from '@cal/components/grid/grid.component';
import {EventComponent} from '@cal/components/events/event/event.component';
import {EventGenericComponent} from '@cal/components/events/event/generic/component/generic.component';
import {EventMeetingComponent} from '@cal/components/events/event/meeting/component/meeting.component';
import {EventClassComponent} from '@cal/components/events/event/class/component/class.component';
import {LayerEventsComponent} from '@cal/components/layer-events/layer-events.component';
import {ModalComponent} from '@cal/components/modal/modal.component';
import {EventClassSlotComponent} from '@cal/components/events/event/class-slot/component/class-slot.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        HoursAxisComponent,
        WeekdaysAxisComponent,
        GridComponent,
        LayerEventsComponent,
        EventComponent,
        EventGenericComponent,
        EventMeetingComponent,
        EventClassComponent,
        EventClassSlotComponent,
        ModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
