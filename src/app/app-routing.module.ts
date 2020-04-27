import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from '@cal/components/layout/layout.component';
import {WeeklyGridLayoutComponent} from './components/weekly-grid/components/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent
    },
    {
        path: 'selection',
        component: WeeklyGridLayoutComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
