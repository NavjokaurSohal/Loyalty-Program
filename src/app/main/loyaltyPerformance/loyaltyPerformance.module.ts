import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { loyaltyPerformanceRoutingModule } from './loyaltyPerformance-routing.module';
import { loyaltyPerformanceComponent } from './components/loyaltyPerformance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { discoverMoreComponent } from './discoverMore/discoverMore.component';
import { AddLoyaltyComponent } from './add-loyalty/add-loyalty.component';
import { EditLoyaltyComponent } from './edit-loyalty/edit-loyalty.component';
import { ReviewComponent } from './review/review.component';
import { CommunicationComponent } from './communication/communication.component';
import { CashbackReminderComponent } from './cashback-reminder/cashback-reminder.component';
import { BonusComponent } from './Bonus/bonus.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [loyaltyPerformanceComponent, discoverMoreComponent, AddLoyaltyComponent,
    EditLoyaltyComponent, ReviewComponent, CommunicationComponent, CashbackReminderComponent, BonusComponent],
  imports: [
    CommonModule,
    loyaltyPerformanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
  ],
})
export class loyaltyPerformanceModule { }
