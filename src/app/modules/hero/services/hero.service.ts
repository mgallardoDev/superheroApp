import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HeroState, InitialHeroState } from './hero-state-config';
import { environment } from 'src/environments/environment';
import { CreateHeroDto, Hero } from 'src/app/common/models/hero';

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

  //necesario para las pruebas unitarias sin tener que hacerla public
  get baseApiUrl() {
    return this.baseUrl;
  }

  getHero(id: string) {
    this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .subscribe((hero) => this.setHeroToEdit(hero));
  }

  createHero(hero: CreateHeroDto): Observable<Hero> {
    const heroWithUUID = {
      ...hero,
      id: uuidv4(),
    };
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, heroWithUUID);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }
  deleteHero(id: string): Observable<void> {
    console.log(id);
    return this.http.delete<void>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((err) => {
        console.log(err);
        return new Observable<void>();
      })
    );
  }

  searchHeroes(query: string = '', page = 1, limit = 10) {
    const params = new HttpParams()
      .set('alias_like', query)
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
