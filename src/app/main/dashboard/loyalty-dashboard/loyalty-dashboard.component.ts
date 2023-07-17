import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-loyalty-dashboard',
  templateUrl: './loyalty-dashboard.component.html',
  styleUrls: ['./loyalty-dashboard.component.css']
})
export class LoyaltyDashboardComponent implements OnInit {
  public FullName: any;
  loading: boolean;
  toastr: any;
  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Loyalty Dashboard`);
  }
  onGetDetails() {
    this.loading = true;
    this.http.get(`dashboard_user/`, null).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.FullName = res.data.full_name;
        this.authService.setUserName(this.FullName);
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
