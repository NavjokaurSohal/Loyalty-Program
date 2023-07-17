import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierComponent } from './components/cashier.component';
import { LoyaltyDashboardComponent } from './loyalty-dashboard/loyalty-dashboard.component';

const routes: Routes = [
  { path: '', component: CashierComponent },
  { path: 'list', component: LoyaltyDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierRoutingModule { }
