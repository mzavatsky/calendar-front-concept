import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
// import {CalendarModule} from 'teachers-calendar-component/modules/calendar/calendar.module';
import {CalendarModule} from 'teachers-calendar-component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CalendarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
