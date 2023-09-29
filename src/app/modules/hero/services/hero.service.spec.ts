import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve heroes and update the state', () => {
    const dummyHeroes = [
      {
        id: '1',
        name: 'Batman',
        alias: 'Bruce Wayne',
        publishing: 'D.C. Comics',
      },
      {
        id: '2',
        name: 'Superman',
        alias: 'Clark Kent',
        publishing: 'D.C. Comics',
      },
    ];

    service.searchHeroes('Bat', 1, 2);

    const req = httpMock.expectOne(
      `${service.baseApiUrl}/heroes?alias_like=Bat&_page=1&_limit=2`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes, { headers: { 'X-Total-Count': '2' } });

    service.state$.subscribe((state) => {
      expect(state.heroList).toBe(dummyHeroes);
      expect(state.totalHeroes).toBe(2);
    });
  });

  it('should fetch a hero by its ID and update the state', () => {
    const dummyHero = {
      id: '1',
      name: 'Batman',
      alias: 'Bruce Wayne',
      publishing: 'D.C. Comics',
    };

    service.getHero('1');

    const req = httpMock.expectOne(`${service.baseApiUrl}/heroes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHero);

    service.state$.subscribe((state) => {
      expect(state.heroToEdit).toEqual(dummyHero);
    });
  });

  it('should create a new hero', () => {
    const heroData = {
      name: 'Spider-Man',
      alias: 'Peter Parker',
      publishing: 'D.C. Comics',
    };

    service.createHero(heroData).subscribe((hero) => {
      expect(hero.id).toBeDefined(); // UUID should be assigned
      expect(hero.name).toBe(heroData.name);
      expect(hero.alias).toBe(heroData.alias);
    });

    const req = httpMock.expectOne(`${service.baseApiUrl}/heroes`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...heroData, id: 'some-uuid' });
  });

  it('should update an existing hero', () => {
    const updatedHero = {
      id: '1',
      name: 'Iron Man',
      alias: 'Tony Stark',
      publishing: 'D.C. Comics',
    };

    service.updateHero(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${service.baseApiUrl}/heroes/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });

  it('should delete a hero by its ID', () => {
    service.deleteHero('1').subscribe();

    const req = httpMock.expectOne(`${service.baseApiUrl}/heroes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
