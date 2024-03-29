import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailypassRoutingModule } from './dailypass-routing.module';
import {GetAllDailypassComponent} from './get-all-dailypass/get-all-dailypass.component'
import {IconModule} from '@coreui/icons-angular'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [GetAllDailypassComponent],
  imports: [
    CommonModule,
    DailypassRoutingModule,
    IconModule,
    FormsModule
    
  ]
})
export class DailypassModule { }