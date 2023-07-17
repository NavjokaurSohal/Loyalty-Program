import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {
  public IsPreviousPointsCheck: any = false;
  public submitted = false;
  public name = '';
  public phone_no: string | null = null;
  public Points: number = 0;
  public bill: number = 0;
  public points_reedem: number = 0;
  public bill_after_discount: number = 0;
  availablePoints: number;

  redeemCashback(): void {
  }
  
  
  constructor(
    private router: Router,
    private http: HttpService,
    public fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName('Add Transaction');
    // this.fetchCustomerData();
  }
  onPointsChange(): void {
    this.bill_after_discount = this.bill - this.points_reedem;
  }

  PreviousPoints(event: any) {
    this.IsPreviousPointsCheck = event.target.checked;
  }

  fetchCustomerData() {
    this.http.get(`customerdata/?phone_no=${this.phone_no}`).subscribe(
      (response: any) => {
        if (response.status === true) {
          this.name = response.data.name;
          this.Points = response.data.Points;
          this.availablePoints = this.Points; // Set the available points value
          console.log('User exists:', response);
        } else {
          this.availablePoints = 0; // Set available points to zero if the user does not exist
          console.log('User does not exist');
        }
      },
    );
  }
  
  
  cashierForm = this.fb.group({
    phoneNumber: ['', Validators.required],
    amount: ['', Validators.required],
    add_cashback: [false],
    redeem_points: [false],
    points_to_redeem: [''],
  });
  
    onSubmit() {
      this.submitted = true;
    
      const dataToSubmit = {
        phone_no: this.phone_no,
        name: this.name,
        points_reedem: this.points_reedem || 0,
        bill: this.bill,
        
        
      };
    
      this.http.post('reedem/', dataToSubmit).subscribe((res: any) => {
        if (res.status === true) {
          alert(res.message);
        } else {
          alert(res.message);
        }
      }, error => {
        alert(error.message);
      });
    }
    }
  

