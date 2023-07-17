import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { businessComponent } from './business/business.component';
import { SignupComponent } from './components/signup.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { OtpComponent } from './otp/otp.component';
import { addressComponent } from './address/address.component';

@NgModule({
  declarations: [SignupComponent, businessComponent, OtpComponent, addressComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxOtpInputModule
  ]
})
export class SignupModule { }
