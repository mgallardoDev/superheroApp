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

    it('debería recuperar héroes y actualizar el estado', () => {
      const dummyHeroes = [
        { id: '1', name: 'Batman', alias: 'Bruce Wayne' },
        { id: '2', name: 'Superman', alias: 'Clark Kent' }
      ];
    
      service.searchHeroes('Bat', 1, 2);
    
      const req = httpMock.expectOne(`${service.baseApiUrl}/heroes?alias_like=Bat&_page=1&_limit=2`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroes, { headers: { 'X-Total-Count': '2' } });
    
      service.state$.subscribe(state => {
        expect(state.heroList.length).toBe(2);
        expect(state.totalHeroes).toBe(2);
      });
    });




  });
});
