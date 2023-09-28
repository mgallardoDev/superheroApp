import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HeroState, InitialHeroState } from './hero-state';
import { environment } from 'src/environments/environment';
import { Hero } from 'src/app/common/models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private baseUrl = environment.apiUrl;
  private stateSubject$ = new BehaviorSubject<HeroState>(InitialHeroState);
  state$ = this.stateSubject$.asObservable();

  constructor(private http: HttpClient) {}

  private setHeroList(heroes: Hero[]): void {
    this.stateSubject$.next({
      ...this.stateSubject$.getValue(),
      heroList: heroes,
    });
  }
  private setTotalHeroes(totalHeroes: number): void {
    this.stateSubject$.next({
      ...this.stateSubject$.getValue(),
      totalHeroes,
    });
  }

  private setHeroToEdit(hero: Hero): void {
    this.stateSubject$.next({
      ...this.stateSubject$.getValue(),
      heroToEdit: hero,
    });
  }


  getHero(id: string) {
    this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .subscribe(hero => this.setHeroToEdit(hero));
  }

  deleteHero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/heroes/${id}`);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  searchHeroes(query: string = '', page = 1, limit = 10) {
    const params = new HttpParams()
      .set('q', query)
      .set('_page', page.toString())
      .set('_limit', limit.toString());
    this.http
      .get<Hero[]>(`${this.baseUrl}/heroes`, { params, observe: 'response' })
      .subscribe((response) => {
        const heroes = response.body!;
        const totalCount = +response.headers.get('X-Total-Count')!;
        this.setHeroList(heroes);
        this.setTotalHeroes(totalCount);
      });
  }
}
