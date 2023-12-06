import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent , IonSearchbar, IonGrid, IonRow,LoadingController} from '@ionic/angular/standalone';
import { ShowsService } from '../../services/shows.service';
import { take, BehaviorSubject } from 'rxjs'
import { Shows } from '../../interfaces/shows';
import { FormsModule } from '@angular/forms';
import { ShowCarouselsComponent } from './show-carousels/show-carousels.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonSearchbar, 
            IonGrid,IonRow,FormsModule,ShowCarouselsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  showList: Shows[] = [];
  dramaList: Shows[] = [];
  comedyList: Shows [] = [];
  horrorList: Shows [] =[];
  scienceFic: Shows[] = [];
  searchList: Shows[] = [];

  

  loading: any;
  searchString: string = '';
  loadingShows$: BehaviorSubject<boolean>;



  constructor(private showService: ShowsService,private loadingCtrl: LoadingController) {
    this.loadingShows$ = new BehaviorSubject<boolean>(true)
  }

  ngOnInit(): void {
    this.getShowList()
  }

  getShowList(){
    this.showloading()
    this.showService.getShows().pipe(
      take(1),
      ).subscribe({
      next: async  res => {
        res.map( (data: any) => {
          let show = new Shows(data)
          this.showList.push(show);
        } )
        this.showList.sort((a,b) => b.rating -  a.rating )
        await this.sortShowsByGenre()
        this.loading.dismiss();
      },
      error: err => console.log(err),
    })
  }

  async sortShowsByGenre(){
    await this.showList.map( show => {
      if (show.genre?.includes('Drama')) this.dramaList.push(show)
      if (show.genre?.includes('Science-Fiction')) this.scienceFic.push(show)
      if (show.genre?.includes('Horror')) this.horrorList.push(show)
      if (show.genre?.includes('Comedy')) this.comedyList.push(show)
    })
    this.showList = this.showList.slice(0,10);
    this.dramaList = this.dramaList.slice(0,10);
    this.comedyList = this.comedyList.slice(0,10);
    this.horrorList = this.horrorList.slice(0,10);
    this.loadingShows$.next(false)
  }

  searchShowByName(){
    this.searchList = [];
    this.showloading()
    this.showService.getShowsByName(this.searchString).pipe(
      take(1),
      ).subscribe({
      next: async (res) => {
        res.map( (data: any) => {
          let show = new Shows(data['show'])
          this.searchList.push(show);
        } )
        this.loading.dismiss();
      },
      error: err => console.log(err),
      
    })
  }

  async showloading(){
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 5000
    });

    this.loading.present();
  }
  
}
