import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { episode,crew,cast } from 'src/app/interfaces/shows';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AccordionsComponent  implements OnInit {

  @Input() episodes: episode[] = []
  @Input() crew: crew[] = [] 
  @Input() cast: cast[] = [];

  notFoundImg: string = '../assets/no-image-found.jpg'

  constructor() {
   }

  ngOnInit() {}

}
