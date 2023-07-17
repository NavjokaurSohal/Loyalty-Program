import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  Permission: any;
  public loading = false;

  constructor(
    private router: Router,
    private http: HttpService, private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    const formData = new FormData();

    formData.append('username', btoa(this.form.value.username));
    formData.append('password', btoa(this.form.value.password));
    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });

    this.http.post('login/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        let UserData = res.user_data;
        localStorage.setItem("UserData", JSON.stringify(UserData));
        this.authService.setUserName(UserData.full_name);
        this.authService.setCurrentUser({ token: res.token });
        if (UserData.profile_step === 1) {
          this.router.navigate(['/signup/asdf']);
        } else if (UserData.profile_step === 2) {                                                                                                                                                                             
          this.router.navigate(['/signup/rtyu']);
        } else  {
          this.router.navigate(['/dashboard']);
        }
        
      } else {
        this.loading = false;
        this.toastr.warning(res.message);
      }
      this.loading = false;
    },error => {
      this.authService.GetErrorCode(error);
      this.loading = false;
    });
  }

}
