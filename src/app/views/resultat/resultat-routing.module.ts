import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ResultatComponent}from './resultat/resultat.component'
const routes: Routes = [
  {
    path: 'Resultat',
    component: ResultatComponent,
    data:{
      title: 'Resultat'
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultatRoutingModule { }
