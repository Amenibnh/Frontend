import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetAllDailypassComponent} from './get-all-dailypass/get-all-dailypass.component'

const routes: Routes = [{
  path: 'dailypass',
  component: GetAllDailypassComponent,
  data: {
    title: 'dailypass'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailypassRoutingModule { }