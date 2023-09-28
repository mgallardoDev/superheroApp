import { Injectable } from '@angular/core';
import { Hero } from '../../../common/models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = []; // Aquí guardaremos la información

  constructor() { }

  // Métodos CRUD
  getAllHeroes(): Hero[] {
    return this.heroes;
  }

  getHeroById(id: number): Hero | null {
    return this.heroes.find(hero => hero.id === id) || null;
  }

  addHero(hero: Hero): void {
    this.heroes.push(hero);
  }

  updateHero(updatedHero: Hero): void {
    const index = this.heroes.findIndex(hero => hero.id === updatedHero.id);
    if (index !== -1) {
      this.heroes[index] = updatedHero;
    }
  }

  deleteHero(id: number): void {
    const index = this.heroes.findIndex(hero => hero.id === id);
    if (index !== -1) {
      this.heroes.splice(index, 1);
    }
  }

  searchHeroes(query: string): Hero[] {
    const loweredQuery = query.toLowerCase();
    return this.heroes.filter(hero => hero.alias.toLowerCase().includes(loweredQuery));
  }
}
