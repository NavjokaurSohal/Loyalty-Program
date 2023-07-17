import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public submitted = false;
  public loading = false;

  constructor(
    private router: Router,
    private http: HttpService, private toastr: ToastrService,
    private authService: AuthService, public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  signupForm = this.fb.group({
    full_name: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })

   get myForm() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.signupForm.markAllAsTouched();
    if (!this.signupForm.valid) {
      return;
    }
    this.loading = true;
    const formData = new FormData();

    Object.keys(this.signupForm.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.signupForm.value[key])
      }
    });

    this.http.post('get_otp/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        this.toastr.success(res.message);
        this.router.navigate([`signup/otp/${res.id}`]);
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
