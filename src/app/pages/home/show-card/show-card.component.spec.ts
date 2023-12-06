import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ShowCardComponent } from './show-card.component';

describe('ShowCardComponent', () => {
  let component: ShowCardComponent;
  let fixture: ComponentFixture<ShowCardComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ShowCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    

    fixture = TestBed.createComponent(ShowCardComponent);
    component = fixture.componentInstance;
    component.show = {
      id: 1,
      name: 'game of thrones',
      genre: [
        'drama',
        'horro'
      ],
      rating: 9,
      image: 'assets/no-image-found.jpg',
      endDate: '1997',
      releaseDate: '2100',
      summary: 'blah blah'
    }
    fixture.detectChanges();
  });

  it('should creates', () => {
    expect(component).toBeTruthy();
  });

  it('should show provided info', () => {

    const title = fixture.debugElement.nativeElement.querySelector('ion-card-title')
    const rating :HTMLElement = fixture.debugElement.nativeElement.querySelector('ion-card-subtitle')

    const dates = fixture.debugElement.nativeElement.querySelector('ion-card-content')

    expect(title.textContent).toEqual(component.show.name);
    expect(Number(rating.textContent)).toEqual(component.show.rating);
    expect(dates.textContent).toContain(component.show.releaseDate)
    expect(dates.textContent).toContain(component.show.endDate)
  })
  it('should not contain endDate if is null',() => {
    component.show.endDate = null
    fixture.detectChanges();

    const dates = fixture.debugElement.nativeElement.querySelector('ion-card-content')

    expect(dates.textContent).not.toContain(component.show.endDate)

  })
});
