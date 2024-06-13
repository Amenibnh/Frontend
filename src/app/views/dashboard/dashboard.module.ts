import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule here

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { WidgetsModule } from '../widgets/widgets.module';
import { WidgetsRoutingModule } from '../widgets/widgets-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
@NgModule({
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule here
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    WidgetsRoutingModule
  ],
  declarations: [DashboardComponent, UpdateComponent , AddComponent],
})
export class DashboardModule { }
