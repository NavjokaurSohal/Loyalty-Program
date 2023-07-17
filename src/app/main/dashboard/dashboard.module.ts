import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoyaltyDashboardComponent } from './loyalty-dashboard/loyalty-dashboard.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [DashboardComponent, LoyaltyDashboardComponent,ProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class DashboardModule { }
