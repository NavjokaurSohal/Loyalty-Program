import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerListComponent } from './components/customer_list.component';
import { CustomerListRoutingModule } from './customer_list-routing.module';


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class CustomerListModule { }
