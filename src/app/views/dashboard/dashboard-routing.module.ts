import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import { UpdateComponent } from '../dashboard/update/update.component';
import { AddComponent } from '../dashboard/add/add.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: $localize`Dashboard`
    }
  },
  {
    path: 'update/:userId',
    component: UpdateComponent,
    data: {
      title: 'update'
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Add'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
