import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  percent = 0;
  @ViewChild('progressBar') progressBar: ElementRef;
 

  public loading = false;
  public LoyaltyDetails: any;
  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Loyalty Dashboard`);
    this.onGetLoyaltyDetails();
  }

  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 100;
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
        this.LoyaltyDetails = res.data;
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
}
