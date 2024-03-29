import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    data: {
      title: 'user'
    }
  },
  {
    path: 'update/:userId',
    component: UpdateComponent,
    data: {
      title: 'update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }