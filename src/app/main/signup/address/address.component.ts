import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class addressComponent implements OnInit {

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

  addressForm = this.fb.group({
    street_address: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', Validators.required],
  })

  
  get myForm() {
    return this.addressForm.controls;
  }

  onAddressSubmit() {
    this.submitted = true;
    this.addressForm.markAllAsTouched();
    if (!this.addressForm.valid) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('profile_step', '3');
    
    Object.keys(this.addressForm.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.addressForm.value[key])
      }
    });

    this.http.post('dashboard_user/', formData).subscribe( (res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.loading = false;
        this.toastr.success(res.message);
        this.router.navigate([`dashboard`]);
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
