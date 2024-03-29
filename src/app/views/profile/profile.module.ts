import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { ProfileuserComponent } from './profileuser/profileuser.component';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [ProfileuserComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    QRCodeModule,
    
  ]
})
export class ProfileModule { }