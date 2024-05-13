import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IconModule} from '@coreui/icons-angular'
import{AdminGlobalComponent}from './admin-global/admin-global.component'
import { AdminGlobalRoutingModule } from './admin-global-routing.module';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
import { ChartjsModule } from '@coreui/angular-chartjs';


@NgModule({
  declarations: [AdminGlobalComponent,UpdateComponent,AddComponent],
  imports: [
    CommonModule,
    AdminGlobalRoutingModule,
    IconModule,
    FormsModule,
    ChartjsModule
  ]
})
export class AdminGlobalModule { }
