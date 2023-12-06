import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { ShowsService } from './shows.service';

describe('ShowsService', () => {
  let service: ShowsService;
  let httpTesting: HttpTestingController;

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
    },
    {
      id: 1,
      name: 'breaking bad',
      genre: [
        'drama',
        'crime'
      ],
      rating: 9,
      image: '../assets/no-image-found.jpg',
      endDate: '2210',
      releaseDate: '2100',
      summary: 'blah blah',
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowsService]
    });
    service = TestBed.inject(ShowsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get expected response from API', fakeAsync(() => {
    const expectedData = showList;

    service.getShows().subscribe(responseShows  => {
      expect(responseShows).toEqual(expectedData)
    });

    const req = httpTesting.expectOne(`${service.url}/shows`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);

  }));
  it('should get expected response from API when searching by name', fakeAsync(() => {
    const searchString = 'game'
    const expectedData = [
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
      }];

    service.getShowsByName(searchString).subscribe(responseShows  => {
      expect(responseShows).toEqual(expectedData)
    });

    const req = httpTesting.expectOne(`${service.url}/search/shows?q=:${searchString}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);

  }));
  it('should retrieve show with provided id', () => {
    const showId = 1;
    const expectedData = [{
        id: 1,
        name: 'breaking bad',
        genre: [
          'drama',
          'crime'
        ],
        rating: 9,
        image: '../assets/no-image-found.jpg',
        endDate: '2210',
        releaseDate: '2100',
        summary: 'blah blah',
      }
    ];

    service.getShowInfo(showId).subscribe(showInfo => {
      expect(showInfo).toEqual(expectedData);
    });

    const req = httpTesting.expectOne(`${service.url}/shows/${showId}?embed[]=episodes&embed[]=cast&embed[]=crew`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedData);
  });
});
