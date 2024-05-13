import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{AdminGlobalComponent}from './admin-global/admin-global.component'
import{UpdateComponent}from'./update/update.component'
import { AddComponent } from '../admin-global/add/add.component';

const routes: Routes = [
{
path:'adminGlobal',
component:AdminGlobalComponent,
data:{
  title:'adminGlobal'
}
},
{
  path: 'update/:associationId',
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
export class AdminGlobalRoutingModule { }
