import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private setHeroToEdit(hero: Hero): void {
    this.stateSubject$.next({
      ...this.stateSubject$.getValue(),
      heroToEdit: hero,
    });
  }
  getHeroes(page = 1, limit = 10) {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());
    this.http
      .get<Hero[]>(`${this.baseUrl}/heroes`, { params })
      .subscribe((heroes) => this.setHeroList(heroes));
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
  }

  deleteHero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/heroes/${id}`);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  searchHeroes(query: string, page = 1, limit = 10) {
    const params = new HttpParams()
      .set('q', query)
      .set('_page', page.toString())
      .set('_limit', limit.toString());
    this.http
      .get<Hero[]>(`${this.baseUrl}/heroes`, { params })
      .subscribe((heroes) => this.setHeroList(heroes));
  }
}
