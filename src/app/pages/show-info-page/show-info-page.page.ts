import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ShowsService } from '../../services/shows.service';
import { take} from 'rxjs'
import { Shows} from '../../interfaces/shows';
import { AccordionsComponent } from './accordions/accordions.component';
import { episode,crew,cast } from 'src/app/interfaces/shows';

@Component({
  selector: 'app-show-info-page',
  templateUrl: './show-info-page.page.html',
  styleUrls: ['./show-info-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,AccordionsComponent]
})
export class ShowInfoPagePage implements OnInit {

  showId: number = 0;
  showInfo!: Shows;
  episodeList: [] = [];
  crewList: [] =[]
  castList: [] = [];

  loading: boolean = false;
  notFoundImg: string = '../assets/no-image-found.jpg'

  constructor(private activeRoute: ActivatedRoute, private showService: ShowsService) {
    this.showId = Number(this.activeRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    this.searchShowInfo()
  }

  searchShowInfo(){
    this.loading = true;
    this.showService.getShowInfo(this.showId).pipe(
      take(1)
    ).subscribe( {
      next: (res:any) => {
        this.showInfo = new Shows(res);
        this.episodeList= res['_embedded']['episodes'].map((ep:episode) => new episode(ep));
        this.castList = res['_embedded']['cast'].map((c:cast) => new cast(c))
        this.crewList = res['_embedded']['crew'].map((cr:crew) => new crew(cr))
        this.loading = false;
        console.log(this.crewList);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
