import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LayoutComponent } from './components/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('../../../main/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'loyaltyPerformance', loadChildren: () => import('../../../main/loyaltyPerformance/loyaltyPerformance.module').then(m => m.loyaltyPerformanceModule) },
      { path: 'cashier', loadChildren: () => import('../../../main/cashier/cashier.module').then(m => m.CashierModule) },
      // { path: 'customer_list', loadChildren: () => import('../../../main/customer_list/customer_list.module').then(m => m.CustomerListModule) },
      { path: 'campaign', loadChildren: () => import('../../../main/campaign/campaign.module').then(m => m.CampaignModule) },
    ],
    // canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
