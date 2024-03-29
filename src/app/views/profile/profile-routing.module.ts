import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileuserComponent} from './profileuser/profileuser.component'

const routes: Routes = [
  {
    path: 'profile', 
    component: ProfileuserComponent,
    data: {
      title: 'Profile'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }