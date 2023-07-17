import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,
  private http: HttpService, public authService: AuthService,
  private router: Router) { }

  ngOnInit(): void {
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  onLogout() {
    this.http.post(`logout/`, null).subscribe((res: any) => {
      const responseData = res;
    });
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
