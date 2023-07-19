import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery';
import 'bootstrap-datepicker';
declare var $: any;

@Component({
  selector: 'app-loyaltyPerformance',
  templateUrl: './loyaltyPerformance.component.html',
  styleUrls: ['./loyaltyPerformance.component.css']
})
export class loyaltyPerformanceComponent implements OnInit {
  loading: boolean;
  toastr: any;
  public FullName: any;
  loyaltyCreated: boolean = false;

  constructor(@Inject(DOCUMENT)
  private document: Document,
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Loyalty Dashboard`);
    this.onGetDetails();
    this.updateDateRange(); 
  }

  collapseViewDetails()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
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

  
  @ViewChild('chart') chart: any;

  Highcharts = Highcharts;
  linechart: any = {
    series: [{
      data: [],
    }],
    // Add other chart options here...
  };
  selectedRange: string = 'today';
  dateRange: string = '';

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.initializeDatePicker();
  }

  initializeDatePicker() {
    $('#datepickerButton').datepicker({
      // Add datepicker options here...
    }).on('changeDate', () => {
      this.updateDateRange();
    });
  }

  updateDateRange() {
    const selectedOption = this.selectedRange;

    // Calculate the date range based on the selected option
    let startDate: Date;
    let endDate: Date = new Date(); // Default to today's date
    switch (selectedOption) {
      case 'last7days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        break;
      case 'thisMonth':
        startDate = new Date();
        startDate.setDate(1); // Set the start date to the first day of the current month
        endDate = new Date();
        break;
      case 'lastMonth':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(1); // Set the start date to the first day of the previous month
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Set the end date to the last day of the previous month
        break;
      case 'last6Months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 5);
        startDate.setDate(1); // Set the start date to the first day of the current month
        break;
      case 'last12Months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 11);
        startDate.setDate(1); // Set the start date to the first day of the current month
        break;
      case 'today':
      default:
        startDate = new Date();
        break;
    }

    // Update the date range string
    this.dateRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;

    // Update the chart data based on the selected date range
    const dateRangeValues = this.getDateRangeValues(startDate, endDate);
    this.linechart.series[0].data = dateRangeValues;

    // Redraw the chart
    this.chart.updateOrCreateChart();
  }

  getDateRangeValues(startDate: Date, endDate: Date): [string, number][] {
    const dateRangeValues: [string, number][] = [];
    const currentDate = new Date(startDate);

    let maxRevenueDate: string = '';
    let maxRevenue: number = 0;

    while (currentDate <= endDate) {
      const date = currentDate.toLocaleDateString();
      const revenue = this.getDataForDate(currentDate);

      dateRangeValues.push([date, revenue]);

      // Track the date with the maximum revenue
      if (revenue > maxRevenue) {
        maxRevenue = revenue;
        maxRevenueDate = date;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Set the title of the series to the date with the maximum revenue
    this.linechart.series[0].name = maxRevenueDate;

    return dateRangeValues;
  }

  getDataForDate(date: Date): number {
    // TODO: Implement your logic to calculate or fetch data for the specified date
    // Return the data value for the specified date
    return 0;
  }

 
}
