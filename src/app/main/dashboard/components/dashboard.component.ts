import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
