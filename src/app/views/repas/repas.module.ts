import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpdateRepaComponent} from './update-repa/update-repa.component'
import { RepasRoutingModule } from './repas-routing.module';
import{GetAllRepasComponent} from './get-all-repas/get-all-repas.component'
import { FormsModule } from '@angular/forms';
import {AddComponent} from './add/add.component'
@NgModule({
  declarations: [GetAllRepasComponent,UpdateRepaComponent,AddComponent],
  imports: [
    CommonModule,
    RepasRoutingModule,
    FormsModule
  ]
})
export class RepasModule { }