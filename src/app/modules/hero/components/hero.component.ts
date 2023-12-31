import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  activeView: 'list' | 'create' | 'edit' = 'list';
  heroState$ = this.heroService.state$;
  heroId: string | null = null

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.searchHeroes();
  }

  setView(event:{view: 'list' | 'create' | 'edit', heroId?: string | null}) {
    this.heroId = event.heroId ?? null;
    this.activeView = event.view;
  }
}
