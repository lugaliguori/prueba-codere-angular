import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

import { AccordionsComponent } from './accordions.component';

describe('AccordionsComponent', () => {
  let component: AccordionsComponent;
  let fixture: ComponentFixture<AccordionsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionsComponent);
    component = fixture.componentInstance;
    component.episodes = [
      {
        id: 1,
        name: 'winter',
        season: 1,
        rating: 1,
        summary: 'dsdasd',
        numberOfEpisode: 3
      }
    ]
    component.cast = [
      {
        name: 'pedro',
        characterName: 'pedro',
        image: 'assets/no-image-found.jpg'
      }
    ]
    component.crew = [
      {
        name: 'pepe',
        role: 'productor',
        image: 'assets/no-image-found.jpg'
      }
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display provided crew member', (done: DoneFn) => {
    const div: HTMLElement = fixture.debugElement.nativeElement.querySelector('#crew')

    const img = fixture.debugElement.nativeElement.querySelector('#crewImage')

    expect(div.textContent).toContain(component.crew[0].name)
    expect(div.textContent).toContain(component.crew[0].role)
    expect(img['src']).toContain(component.crew[0].image)
    done();

  })
  it('should display provided cast member', (done: DoneFn) => {
    const div: HTMLElement = fixture.debugElement.nativeElement.querySelector('#cast')

    const img = fixture.debugElement.nativeElement.querySelector('#castImage')

    expect(div.textContent).toContain(component.cast[0].name)
    expect(div.textContent).toContain(component.cast[0].characterName)
    expect(img['src']).toContain(component.cast[0].image)
    done();
  })
  it('should display episode info', (done: DoneFn) => {
    const div: HTMLElement = fixture.debugElement.nativeElement.querySelector('#episode')

    expect(div.textContent).toContain(component.episodes[0].name)
    expect(div.textContent).toContain(component.episodes[0].numberOfEpisode)
    expect(div.textContent).toContain(component.episodes[0].season)
    done();
  })
});
