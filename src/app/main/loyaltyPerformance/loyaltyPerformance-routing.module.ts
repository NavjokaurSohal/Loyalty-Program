import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loyaltyPerformanceComponent } from './components/loyaltyPerformance.component';
import { discoverMoreComponent } from './discoverMore/discoverMore.component';
import { AddLoyaltyComponent } from './add-loyalty/add-loyalty.component';
import { EditLoyaltyComponent } from './edit-loyalty/edit-loyalty.component';
import { ReviewComponent } from './review/review.component';
import { CommunicationComponent } from './communication/communication.component';
import { CashbackReminderComponent } from './cashback-reminder/cashback-reminder.component';
import { BonusComponent } from './Bonus/bonus.component';

const routes: Routes = [
  { path: '', component: loyaltyPerformanceComponent },
  { path: 'discoverMore', component: discoverMoreComponent },
  { path: 'add-loyalty', component: AddLoyaltyComponent },
  { path: 'Edit-loyalty', component: EditLoyaltyComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'communication', component: CommunicationComponent },
  { path: 'cashback-reminder', component: CashbackReminderComponent },
  { path: 'bonus', component: BonusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class loyaltyPerformanceRoutingModule { }
