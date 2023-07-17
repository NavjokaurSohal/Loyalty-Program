import { NgModule } from '@angular/core';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { ChannelComponent } from './channel/channel.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './components/campaign.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { ReviewComponent } from './Review/review.component';
import { ReviewSMSComponent } from './ReviewSMS/reviewSMS.component';

@NgModule({
  declarations: [CampaignComponent, ChannelComponent, AboutComponent, TermsComponent, ReviewComponent, ReviewSMSComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class CampaignModule { }
