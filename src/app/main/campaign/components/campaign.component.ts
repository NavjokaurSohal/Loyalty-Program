import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/components/layout/services/auth.service';
import { HttpService } from 'src/app/core/components/layout/services/http.service';
interface CardData {
  imageSrc: string;
  text: string;
  iconClass: string;
}

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  
  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) { }


  cardData: CardData[] = [
    {
      imageSrc: 'assets/img/download.jfif',
      text: 'Happy Mothers Day ',
      iconClass: 'bi bi-gift-fill'
    },
    {
      imageSrc: 'assets/img/images.jfif',
      text: 'Happy Rakshabandhan ',
      iconClass: 'bi bi-gift-fill'
    },
    {
      imageSrc: 'assets/img/download (1).jfif',
      text: 'Happy Diwali',
      iconClass: 'bi bi-gift-fill'
    },
    {
      imageSrc: 'assets/img/istockphoto-515484282-612x612.jpg',
      text: 'Happy Holi ',
      iconClass: 'bi bi-gift-fill'
    }
  ];
  cardData1: CardData[] = [
    {
      imageSrc: 'assets/img/download (2).jfif',
      text: 'Happy Fathers Day ',
      iconClass: 'bi bi-gift-fill'
    },
    {
      imageSrc: 'assets/img/download (3).jfif',
      text: 'Happy New Year ',
      iconClass: 'bi bi-gift-fill'
    },
    {
      imageSrc: 'assets/img/images (1).jfif',
      text: 'Childrens Day Special ',
      iconClass: 'bi bi-gift-fill'
    },
    {
      imageSrc: 'assets/img/burger1.jpg',
      text: 'Todays Special',
      iconClass: 'bi bi-gift-fill'
    }
  ];

  showMenu: boolean[] = [];


  ngOnInit(): void {
    this.showMenu = new Array(this.cardData.length).fill(false);
  }

  toggleMenu(index: number): void {
    this.showMenu[index] = !this.showMenu[index];
  }
}
