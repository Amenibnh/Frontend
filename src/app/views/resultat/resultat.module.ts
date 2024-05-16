import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultatRoutingModule } from './resultat-routing.module';
import { ResultatComponent } from './resultat/resultat.component';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ResultatComponent],
  imports: [
    CommonModule,
    ResultatRoutingModule,
    IconModule,
    FormsModule,
  ]
})
export class ResultatModule { }
