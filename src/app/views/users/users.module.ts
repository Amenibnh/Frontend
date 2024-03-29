import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user/user.component'
import { UsersRoutingModule } from './users-routing.module';
import {UpdateComponent} from './update/update.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent,UpdateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }