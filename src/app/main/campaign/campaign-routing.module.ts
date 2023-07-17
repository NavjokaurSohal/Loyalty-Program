import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CampaignComponent } from './components/campaign.component';
import { ChannelComponent } from './channel/channel.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { ReviewComponent } from './Review/review.component';
import { ReviewSMSComponent } from './ReviewSMS/reviewSMS.component';

const routes: Routes = [
  { path: '', component: CampaignComponent},
  { path: 'channel', component: ChannelComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'reviewSMS', component: ReviewSMSComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
