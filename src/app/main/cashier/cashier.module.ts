import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier-routing.module';
import { CashierComponent } from './components/cashier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoyaltyDashboardComponent } from './loyalty-dashboard/loyalty-dashboard.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CashierComponent, LoyaltyDashboardComponent],
  imports: [
    CommonModule,
    CashierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    // NgbModule,
  ],
})
export class CashierModule { }
