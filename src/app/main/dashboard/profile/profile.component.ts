import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private http: HttpService,
    public authService: AuthService,
    private router: Router
  ) {}

  profile: any = {
    ip: '',
    number: '',
    otp: '',
    brand: '',
    industry: '',
    category: '',
    stores: 0,
    address: '',
    state: '',
    city: '',
    pincode: '',
  };

  profileData: any = {};

  ngOnInit(): void {
    let profileData = localStorage.getItem('UserData');
    this.profileData = JSON.parse(profileData);

    this.profile.ip = 'Static IP';
    this.profile.number = 'User-entered number';
    this.profile.otp = 'User-entered OTP';
    this.profile.brand = 'User-entered brand';
    this.profile.industry = 'User-entered industry';
    this.profile.category = 'User-entered category';
    this.profile.stores = 5;
    this.profile.address = 'User-entered address';
    this.profile.state = 'User-entered state';
    this.profile.city = 'User-entered city';
    this.profile.pincode = 'User-entered pincode';
  }
}
