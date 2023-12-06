import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of} from 'rxjs'
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HomePage } from './home.page';
import { ShowsService } from 'src/app/services/shows.service';
import { IonicModule } from '@ionic/angular';

let showList = [
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

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const showService = jasmine.createSpyObj('ShowsService', ['getShows'],['getShowsByName'])
  const showSpy = showService.getShows.and.returnValue(of(showList)) 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage,HttpClientTestingModule,IonicModule.forRoot()],
      providers: [provideRouter([]),{provide: ShowsService, useValue: showService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    component.loadingShows$.next(true);
    component.showList = showList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getShowList ', fakeAsync(() => {
    spyOn(component,'getShowList')

    component.ngOnInit()
    tick();
    expect(component.getShowList).toHaveBeenCalled()
    expect(component.showList).toEqual(showList);
  }))
  it('should call searchShowByName when entering data in searchField', fakeAsync(() => {
    spyOn(component,'searchShowByName')

    let input: HTMLInputElement  = fixture.nativeElement.querySelector('ion-searchbar');

    input.value = 'game'
    tick(1000)
    input.dispatchEvent(new Event('ionInput'));
    fixture.detectChanges()
    expect(component.searchShowByName).toHaveBeenCalled();
  }))
});
