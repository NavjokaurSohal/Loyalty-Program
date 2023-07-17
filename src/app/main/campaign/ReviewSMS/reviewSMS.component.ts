import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-reviewSMS',
  templateUrl: './reviewSMS.component.html',
  styleUrls: ['./reviewSMS.component.css']
})
export class ReviewSMSComponent implements OnInit {

  percent = 0;
  @ViewChild('progressBar') progressBar: ElementRef;

  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  customMessage: string;
  displayCustomMessage: boolean;
  showCustomLinkOption: boolean;
  uploadProfile: boolean;
  customLink: string;

  showCustomMessage() {
    this.displayCustomMessage = true;
    this.showCustomLinkOption = false; }

  showCustomLink() {
    this.showCustomLinkOption = true;
    this.displayCustomMessage = false; 
    this.customLink = ''; 
  }
  

  copyText() {
    const copyText = document.getElementById("copyText") as HTMLParagraphElement;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(copyText);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  
  }

  ngOnInit(): void {
    this.authService.SetTitleName(`Review SMS Campaign`);
  }

  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 100;
        resolve(this.percent);
      }, 1000);
    });
    promise.then((value) => {
      this.progressBar.nativeElement.style.width = value + '%';
    });
  }
}
  

