import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowInfoPagePage } from './show-info-page.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ShowInfoPagePage', () => {
  let component: ShowInfoPagePage;
  let fixture: ComponentFixture<ShowInfoPagePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ShowInfoPagePage,HttpClientTestingModule,RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ShowInfoPagePage);
    component = fixture.componentInstance;
    component.showInfo = {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display spinner if loading == true ',() => {
    component.loading = true;
    fixture.detectChanges()

    const spinner = fixture.debugElement.nativeElement.querySelector('ion-spinner')

    expect(spinner).toBeTruthy();
  })
  it('should display showInfo', (done: DoneFn) => {
    component.loading = false;
    fixture.detectChanges();

    const title = fixture.debugElement.nativeElement.querySelector('ion-title')

    const summary = fixture.debugElement.nativeElement.querySelector('#summary')

    const genre = fixture.debugElement.nativeElement.querySelector('#genres')

    const rating = fixture.debugElement.nativeElement.querySelector('#rating')

    const dates = fixture.debugElement.nativeElement.querySelector('#dates')

    expect(title.textContent).toContain(component.showInfo.name);
    expect(summary.textContent).toEqual(component.showInfo.summary);
    expect(genre.textContent).toContain(component.showInfo.genre[0]);
    expect(genre.textContent).toContain(component.showInfo.genre[1]);
    expect(rating.textContent).toContain(component.showInfo.rating);
    expect(dates.textContent).toContain(component.showInfo.releaseDate);
    expect(dates.textContent).toContain(component.showInfo.endDate);

    done();

  })
  it('should say presente when endDate is null', () => {
    component.loading = false;
    component.showInfo.endDate = '';

    fixture.detectChanges();

    const dates = fixture.debugElement.nativeElement.querySelector('#dates')

    expect(dates.textContent).toContain('presente');
  })
});
