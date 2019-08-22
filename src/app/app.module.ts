import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from '@cal/components/layout/layout.component';
import {HoursAxisComponent} from '@cal/components/hours-axis/hours-axis.component';
import {WeekdaysAxisComponent} from '@cal/components/weekdays-axis/weekdays-axis.component';
import {GridComponent} from '@cal/components/grid/grid.component';
import {InvitationsComponent} from '@cal/components/invitations/invitations.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        HoursAxisComponent,
        WeekdaysAxisComponent,
        GridComponent,
        InvitationsComponent,
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
