import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  percent = 0;
  @ViewChild('progressBar') progressBar: ElementRef;


  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService, private httpService: HttpService) { }


  ngAfterViewInit() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.percent = 60;
        resolve(this.percent);
      }, 1000);
    });
    promise.then((value) => {
      this.progressBar.nativeElement.style.width = value + '%';
    });
  }

  selectedDate: string;
  onlyOnceSelected: boolean;
  multipleTimesSelected: boolean;
  numberInput: number;
  termsContent: string;
  termsInput: string;

  selectedTerms: string[] = [];

  ngOnInit(): void {}

  onDateSelected(event: Event) {
    this.selectedDate = (event.target as HTMLInputElement).value;
    this.updateTermsContent();
    this.authService.SetTitleName(`Terms Campaign`);
  }



  onOnlyOnceSelected() {
    this.onlyOnceSelected = true;
    this.multipleTimesSelected = false;
    this.updateTermsContent();
  }

  onMultipleTimesSelected() {
    this.onlyOnceSelected = false;
    this.multipleTimesSelected = true;
    this.updateTermsContent();
  }

  onNumberInput(event: Event) {
    this.numberInput = (event.target as HTMLInputElement).valueAsNumber;
    this.updateTermsContent();
  }

  onTermsInput(event: Event) {
    this.termsInput = (event.target as HTMLTextAreaElement).value;
    this.updateTermsContent();
  }

  onCheckboxChange(term: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTerms.push(term);
    } else {
      const index = this.selectedTerms.indexOf(term);
      if (index > -1) {
        this.selectedTerms.splice(index, 1);
      }
    }
    this.updateTermsContent();
  }

  updateTermsContent() {
    let content = '';

    if (this.selectedDate) {
      content += `Selected Date: ${this.selectedDate}\n`;
    }

    if (this.onlyOnceSelected) {
      content += 'Redemption Limit: Only Once\n';
    }

    if (this.multipleTimesSelected) {
      content += 'Redemption Limit: Multiple Times\n';
    }

    if (this.numberInput) {
      content += `Contact Number: ${this.numberInput}\n`;
    }

    if (this.termsInput) {
      content += `Terms and Conditions:\n${this.termsInput}\n`;
    }

    this.termsContent = content;
  }

  getTermsLines() {
    if (this.termsContent) {
      const lines = this.termsContent.split('\n').filter(line => line !== 'doubt doubt');
      if (this.onlyOnceSelected || this.multipleTimesSelected) {
        return lines.slice(2); 
      } else {
        const expirationDateLineIndex = lines.findIndex(line => line.startsWith('Selected Date:'));
        if (expirationDateLineIndex >= 0) {
          
        }
      }
    }
    return [];
  }
}