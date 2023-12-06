import { Component, OnInit,Input } from '@angular/core';
import { Shows } from 'src/app/interfaces/shows';
import { IonRow } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ShowCardComponent } from '../show-card/show-card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-carousels',
  templateUrl: './show-carousels.component.html',
  styleUrls: ['./show-carousels.component.scss'],
  standalone: true,
  imports: [IonRow,ShowCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowCarouselsComponent  implements OnInit {

  @Input() title: string = '';
  @Input() showList: Shows[] = [];

  swiperBreakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.8,
      spaceBetween: 5
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
    }
    
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToShow(id:number){
    this.router.navigate(['show',id])
  }

}
