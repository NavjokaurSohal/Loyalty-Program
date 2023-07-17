import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  percent = 0;
  @ViewChild('progressBar') progressBar: ElementRef;



  public loading = false;
  public bonusData: any = '0';
  public CashbackCheck: any = false;
  public LoyaltyDetails: any;

  constructor(@Inject(DOCUMENT)
  private document: Document,
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Loyalty Bonus Cashback`);
    this.onGetLoyaltyDetails();
  }

  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 40;
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
      if (res.status === true) {
        this.LoyaltyDetails = res.data;
        if (res.loyalty_available) {
          this.bonusData = this.LoyaltyDetails.bonus_cashback;
          this.CashbackCheck = this.LoyaltyDetails.bonus_cashback_enabled;
        }
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
    formData.append('bonus_cashback_enabled', this.CashbackCheck);
    formData.append('bonus_cashback', this.bonusData);

    this.http.post('loyalty/', formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.loading = false;
        this.toastr.success(res.message);
        this.router.navigate([`loyaltyPerformance/cashback-reminder`]);
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
