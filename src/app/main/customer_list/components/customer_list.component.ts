import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-customer_list',
  templateUrl: './customer_list.component.html',
  styleUrls: ['./customer_list.component.css']
})
export class CustomerListComponent implements OnInit {
  totalPages: number;

  
  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) { }

  currentPage = 1;
  itemsPerPage = 2; 
  totalItems = 10;

  onPageChange(page: number) {
    this.currentPage = page;
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  customers: any[] = [];

  ngOnInit(): void {
    this.fetchCustomerData();
  }
  fetchCustomerData() {
    this.http.get('customers/').subscribe(
      (response: any) => {
        if (response.status === true) {
          this.customers = response.data;
          console.log('Customers:', this.customers);
        } else {
          console.log('Error fetching customers');
        }
      },
      (error: any) => {
        console.log('API Error:', error);
      }
    );
  }
}
