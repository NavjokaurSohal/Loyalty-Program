import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-add-loyalty',
  templateUrl: './add-loyalty.component.html',
  styleUrls: ['./add-loyalty.component.css']
})
export class AddLoyaltyComponent implements OnInit {

  constructor(@Inject(DOCUMENT)
  private document: Document,
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.SetTitleName(`Loyalty Dashboard`);
  }

  collapseViewDetails()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
