import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './components/signup.component';
import { businessComponent } from './business/business.component';
import { addressComponent } from './address/address.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'otp/:id', component: OtpComponent },
  { path: 'asdf', component: businessComponent },
  { path: 'rtyu', component: addressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
