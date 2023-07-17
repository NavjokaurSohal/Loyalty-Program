import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  percent = 0;
  @ViewChild('progressBar') progressBar: ElementRef;
  
  public loading = false;
  public LoyaltyEmail: any = false
  public LoyaltySms: any = false;

  constructor(private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Channel Campaign`);
  }
 
  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 20;
        resolve(this.percent);
      }, 1000);
    });
    promise.then((value) => {
      this.progressBar.nativeElement.style.width = value + '%';
    });
  }

  onSubmit() {
    this.loading = true;
    const formData = new FormData();
    formData.append('email', this.LoyaltyEmail);  
    formData.append('sms', this.LoyaltySms);

    this.http.post('loyalty/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        this.toastr.success(res.message);
        this.router.navigate([`loyaltyPerformance/review`]);
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

