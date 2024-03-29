import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{GetAllRepasComponent} from './get-all-repas/get-all-repas.component'
import{UpdateRepaComponent} from './update-repa/update-repa.component'
import{AddComponent}from './add/add.component'

const routes: Routes = [{
  path: 'repa',
  component: GetAllRepasComponent,
  data: {
    title: 'repa'
  }
},
{
  path: 'update/:repaId',
  component: UpdateRepaComponent,
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
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepasRoutingModule { }