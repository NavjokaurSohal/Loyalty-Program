import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class businessComponent implements OnInit {
   
  public submitted = false;
  public loading = false;
  public FullName: any;

  constructor(
    private router: Router,
    private http: HttpService, public fb: FormBuilder,
    private authService: AuthService, private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.onGetDetails();
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

  businessForm = this.fb.group({
    brand_name: ['', Validators.required],
    business_sector: ['', Validators.required],
    store_categories: ['', Validators.required],
    number_of_stores: ['', Validators.required],
  })

  
   get myForm() {
    return this.businessForm.controls;
  }

  onBusinessSubmit() {
    this.submitted = true;
    this.businessForm.markAllAsTouched();
    if (!this.businessForm.valid) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('profile_step', '2');

    Object.keys(this.businessForm.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.businessForm.value[key])
      }
    });

    this.http.post('dashboard_user/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        this.toastr.success(res.message);
        this.router.navigate([`signup/rtyu`]);
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
