import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
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

  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Edit Loyalty`);
    this.onGetBannerList();
  }

  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 20;
        resolve(this.percent);
      }, 1000);
    });
    promise.then((value) => {
      this.progressBar.nativeElement.style.width = value + '%';
    });
  }

  onGetBannerList() {
    this.loading = true;
    this.http.get(`image_database/`, null).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.BannerList = res.data;
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

  IsThemeBgColor(event: any){
    this.BgColor = event.target.value;
  }

  IsThemeTextColor(event: any){
    this.TextColor = event.target.value;
  }

  IsAccentUpperColor(event: any){
    this.AccentUpper = event.target.value;
  }

  IsAccentLowerColor(event: any){
    this.AccentLower = event.target.value;
  }

  IsBannerImage(img: any) {
    this.BgImageUrl = img.image;
    this.BannerId = img.id;
  }

  onHeaderText(event: any) {
    this.HeaderText = event.target.value;
  }

  onSubTitleText(event: any) {
    this.SubTitleText = event.target.value;
  }

  OnAmountValue(event: any) {
    this.IsAmountCheck = event.target.checked;
  }

  onFileChangeLogo(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file.size > '5242880') {
      this.toastr.warning("File size cannot be larger than 5MB!");
      return;
    } else {
      this.LogoFile = file;
      this.onImageSubmit();
    }
  }

  onFileChangeBanner(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file.size > '5242880') {
      this.toastr.warning("File size cannot be larger than 5MB!");
      return;
    } else {
      this.BannerFile = file;
      this.onImageSubmit();
    }
  }

  onImageSubmit() {
    this.loading = true;
    const formData = new FormData();
    if (this.BannerFile) {
      formData.append('image', this.BannerFile);
    } else if (this.LogoFile) {
      formData.append('image', this.LogoFile);
    }
    this.http.post('image_database/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        if (this.BannerFile) {
          this.BgImageUrl = res.data.image;
          this.BannerId = res.data.id;
        } else if (this.LogoFile) {
          this.LogoImageUrl = res.data.image;
          this.LogoId = res.data.id;
        }
        
        this.toastr.success(res.message);
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

  onSubmit() {

    this.loading = true;
    const formData = new FormData();
    formData.append('enabled', this.EditEnabled);
    formData.append('logo', this.LogoId);
    formData.append('banner_image', this.BannerId);
    formData.append('header', this.HeaderText);
    formData.append('subtitle', this.SubTitleText);
    formData.append('themecolor', this.BgColor);
    formData.append('textcolor', this.TextColor);
    formData.append('cashback', this.CustomerEarn);
    formData.append('min_purchase_required', this.IsAmountCheck);
    formData.append('min_purchase_amount', this.AmountNumber);
    formData.append('terms', this.TermsText);
    formData.append('terms_list', JSON.stringify(this.TermsAndConditions));
    let myContainer = <HTMLElement>document.querySelector("#InnerHtml");
    let HTML = myContainer.innerHTML;
    formData.append('html', HTML);

    this.http.post('loyalty/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.loading = false;
        this.toastr.success(res.message);
        this.router.navigate([`loyaltyPerformance/bonus`]);
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