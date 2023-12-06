import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

import { ShowCarouselsComponent } from './show-carousels.component';
import { provideRouter } from '@angular/router';

describe('ShowCarouselsComponent', () => {
  let component: ShowCarouselsComponent;
  let fixture: ComponentFixture<ShowCarouselsComponent>;

  let showlist = [
    {
      id: 2,
      name: 'game of thrones',
      genre: [
        'drama',
        'horro'
      ],
      rating: 9,
      image: '../assets/no-image-found.jpg',
      endDate: '1997',
      releaseDate: '2100',
      summary: 'blah blah',
    }
  ]

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(),ShowCarouselsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowCarouselsComponent);
    component = fixture.componentInstance;
    component.showList = showlist;
    component.title = 'drama'
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should show the provided title', () => {

    const title = fixture.debugElement.nativeElement.querySelector('h1')

    expect(title.textContent).toEqual(component.title);
  })

  it('since there is a showlist swiper container should exist', () => {

    const swiper = fixture.debugElement.nativeElement.querySelector('swiper-container')
    expect(swiper).toBeTruthy();
  })

  it('it should show the no result found message',() => {
    component.showList = [];
    fixture.detectChanges();

    const p = fixture.debugElement.nativeElement.querySelector('p')
    expect(p.textContent).toContain('No se encontraron resultados')
  })
  it('go to show should be called', () => {
    spyOn(component,'goToShow')
    const swiper = fixture.debugElement.nativeElement.querySelector('swiper-slide')
    swiper.click()
    expect(component.goToShow).toHaveBeenCalled();
  })

});
