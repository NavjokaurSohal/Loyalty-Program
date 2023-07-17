import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-cashback-reminder',
  templateUrl: './cashback-reminder.component.html',
  styleUrls: ['./cashback-reminder.component.css']
})
export class CashbackReminderComponent implements OnInit {
  percent = 0;
  @ViewChild('progressBar') progressBar: ElementRef;
 

  public loading = false;
  public bonusData: any = '0';
  public CashbackReminder: any = false;
  public reminderValue: any = '1';
  public reminderChoice: any = 'days';
  public remindOnlyEligible: any = false;
  public cashbackExpiryEnabled: any = false;
  public expiryMonths: any = '1';

  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Loyalty Cashback Reminder`);
    this.onGetLoyaltyDetails();
  }

  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 60;
        resolve(this.percent);
      }, 1000);
    });
    promise.then((value) => {
      this.progressBar.nativeElement.style.width = value + '%';
    });
  }

  onGetLoyaltyDetails() {
    this.loading = true;
    this.http.get(`loyalty/`, null).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.CashbackReminder = res.data.cashback_reminder_enabled;
        this.reminderValue = res.data.reminder_value;
        this.reminderChoice = res.data.reminder_choice;
        this.remindOnlyEligible = res.data.remind_only_eligible_customers;
        this.cashbackExpiryEnabled = res.data.cashback_expiry_enabled;
        this.expiryMonths = res.data.expiry_months;
        this.loading = false;
      } else {
        this.loading = false;
        this.toastr.warning(res.message);
      }
      this.loading = false;
    }, error => {
      this.authService.GetErrorCode(error);
      this.loading = false;
    });
  }

  onSubmit() {
    this.loading = true;
    const formData = new FormData();
    formData.append('cashback_reminder_enabled', this.CashbackReminder);  
    formData.append('reminder_value', this.reminderValue);
    formData.append('reminder_choice', this.reminderChoice);
    formData.append('remind_only_eligible_customers', this.remindOnlyEligible);
    formData.append('cashback_expiry_enabled', this.cashbackExpiryEnabled);
    formData.append('expiry_months', this.expiryMonths);

    this.http.post('loyalty/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        this.toastr.success(res.message);
        this.router.navigate([`loyaltyPerformance/communication`]);
      } else {
        this.loading = false;
        this.toastr.warning(res.message);
      }
      this.loading = false;
    }, error => {
      this.authService.GetErrorCode(error);
      this.loading = false;
    });
  }

}
