import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';
import { NgxPaginationModule } from 'ngx-pagination';
// import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loyalty-dashboard',
  templateUrl: './loyalty-dashboard.component.html',
  styleUrls: ['./loyalty-dashboard.component.css'],
  // providers: [NgbCarouselConfig],
})
export class LoyaltyDashboardComponent implements OnInit {
  totalPages: number;
  name = 'Angular ' + VERSION.major;
  images: string[] = [
    'assets/img/rabbit.gif',
    'assets/img/giphy (4).gif',
    'assets/img/cash-bunny-1.gif',
    'assets/img/giphy.gif'
  ];
  currentIndex = 0;
  ngOnInit() {
    setInterval(() => {
      this.nextImage();
    }, 2000);
    this.fetchCustomerData(); 
  }
  nextImage() {
    this.changeImageWithDelay(1, 2000);
  }
  prevImage() {
    this.changeImageWithDelay(-1, 2000);
  }
  changeImageWithDelay(direction: number, delay: number) {
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    }, delay);
  }

  constructor(
    // config: NgbCarouselConfig,
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) {
    // config.interval = 10000;
    // config.keyboard = true;
    // config.pauseOnHover = true;
  }
  currentPage = 1;
  itemsPerPage = 10;

  onPageChange(page: number) {
    this.currentPage = page;
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  customers: any[] = [];
  fetchCustomerData() {
    this.http.get('customers/').subscribe(
      (response: any) => {
        if (response.status === true) {
          this.customers = response.data;
          this.totalPages = Math.ceil(response.data.length / this.itemsPerPage);
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
