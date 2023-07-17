import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  percent = 0;
  @ViewChild('progressBar') progressBar: ElementRef;
  
  public loading = false;
  public BannerList: any = [];
  public TextColor: any = '#FFFFFF';
  public BgColor: any = '#282f44';
  public BgImageUrl: any = 'http://192.168.3.221:8000/media/default_photos/3.jpg';
  public LogoImageUrl: any = '';
  public LogoFile: File | undefined;
  public BannerFile: File | undefined;
  public LogoId: any = '';
  public BannerId: any = '10';
  public HeaderText: any = 'Tea Verse';
  public SubTitleText: any = 'Earn rewards with every purchase made';
  public AccentUpper: any = '#ff1a51';
  public AccentLower: any = '#b5002b';
  public TermsAndConditions: any = [
    { id: 1, name: 'Minimum purchase required.', checked: true },
    { id: 2, name: '2 offers cannot be clubbed.', checked: true},
    { id: 3, name: 'Rewards cannot be redeemed on public holidays.', checked: false},
    { id: 4, name: 'Rewards can only be redeemed in-store.', checked: false},
    { id: 5, name: 'Merchant reserves the right to final say.', checked: true},
  ];
  public TermsText: any = '';
  public CustomerEarn: any = '20';
  public IsAmountCheck: any = false;
  public AmountNumber: any = 0;
  public EditEnabled: any = true;

  yourBill: string = '';
  campaignDescription: string;
  campaignTitle: string;
  activeField: string = '';
  purchaseValue1: number = 0;
  purchaseValuePlaceholder: string = 'Enter purchase value';
  purchaseValue2: number = 0;
  showDiscountedValue: boolean = false;
  showSpecificPurchase: boolean = false;
  specificPurchaseValue: number = 0;
  showDiscountedValue2: boolean = false;
  showSpecificPurchase2: boolean = false;

  constructor(private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`About Campaign`);
  }

  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 40;
        resolve(this.percent);
      }, 1000);
    });
    promise.then((value) => {
      this.progressBar.nativeElement.style.width = value + '%';
    });
  }


  toggleCheckbox(field: string): void {
    if (this.activeField === field) {
      this.activeField = '';
    } else {
      this.activeField = field;
    }
    this.resetValues();
  }

  resetValues(): void {
    this.purchaseValue1 = 0;
    this.purchaseValue2 = 0;
    this.showDiscountedValue = false;
    this.showSpecificPurchase = false;
    this.specificPurchaseValue = 0;
    this.showDiscountedValue2 = false;
    this.showSpecificPurchase2 = false;
  }

  enterPurchase(field: string): void {
    if (field === 'field1') {
      this.showDiscountedValue = true;
      this.purchaseValuePlaceholder = 'Enter purchase value ' + this.discountedText;
    } else if (field === 'field2') {
      this.showDiscountedValue2 = true;
    }
  }

  specificPurchase(field: string): void {
    if (field === 'field1') {
      this.showSpecificPurchase = true;
    } else if (field === 'field2') {
      this.showSpecificPurchase2 = true;
    }
  }

  get discountedText(): string {
    return "% Off";
  }

  onSubmit() {
  
    this.campaignTitle = this.HeaderText;
    this.campaignDescription = this.SubTitleText;
    }
  


}
