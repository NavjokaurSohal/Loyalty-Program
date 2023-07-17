import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  public signupId: any;
  otpInputConfig: NgxOtpInputConfig = { otpLength: 6 };
  public loading = false;
  public PhoneNumber: any;
  
  public display: any;
  public resendOtp: any = false;
  public displayTimer: any = false;
   
  constructor(
    private router: Router,
    private http: HttpService, private activeRoute: ActivatedRoute, 
    private authService: AuthService, private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.signupId = this.activeRoute.snapshot.params['id'] || 0;
    this.onGetPhoneNumber();
  }

  ResendOtp(minute: any) {
    this.onResendOtp();
      this.displayTimer = true;
      this.resendOtp = true;
      let seconds = minute * 60;
      let textSec: any = '0';
      let statSec = 60;
  
      const prefix = minute < 10 ? '0' : '';
  
      const timer = setInterval(() => {
        seconds--;
        if (statSec != 0) statSec--;
        else statSec = 59;
  
        if (statSec < 10) {
          console.log('inside', statSec);
          textSec = '0' + statSec;
        } else {
          console.log('else', statSec);
          textSec = statSec;
        }
  
        this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
  
        if (seconds == 0) {
          clearInterval(timer);
          this.resendOtp = false;
          this.displayTimer = false;
        }
      }, 1000);
  }

  onResendOtp() {
    this.loading = true;
    const formData = new FormData();
    formData.append('detail_id', this.signupId);

    this.http.post(`resend_otp/`, formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        this.toastr.success(res.message);
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

  onGetPhoneNumber() {
    this.loading = true;
    this.http.get(`temporary_storage/?id=${this.signupId}`, null).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.PhoneNumber = res.phone;
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


  handleFillEvent(value: any): void {
    const formData = new FormData();
    formData.append('detail_id', this.signupId);
    formData.append('otp', value);

    this.http.post('verify_otp/', formData).subscribe((res: any) => {
      if(res.status === true){
        this.loading = false;
        this.authService.setCurrentUser({ token: res.token });
        this.toastr.success(res.message);
        this.router.navigate([`signup/asdf`]);
      } else{
        this.toastr.warning(res.message);
      }
    }, error => {
      this.authService.GetErrorCode(error);
      this.loading = false;
    });
  }
  
}
