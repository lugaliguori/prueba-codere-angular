import { Component, OnInit, Input } from '@angular/core';
import { IonCard, IonContent} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Shows } from 'src/app/interfaces/shows';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  standalone: true,
  imports: [IonCard,IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowCardComponent  implements OnInit {

  @Input() show!: Shows;

  notFoundImg: string = '../assets/no-image-found.jpg'

  constructor() { }

  ngOnInit() {}

  onError(){
    console.log('error')
  }

}
