import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

import { HomeRoutingModule } from './home-routing.module'

import { WidgetsModule } from '../widgets/widgets.module';
import { WidgetsRoutingModule } from '../widgets/widgets-routing.module';
import { HomeComponent } from './home/home.component';
@NgModule({
  imports: [
    HomeRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
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
  declarations: [HomeComponent],
})
export class HomeModule { }