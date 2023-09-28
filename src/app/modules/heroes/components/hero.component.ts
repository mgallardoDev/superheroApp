import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/common/models/hero';
import { Observable } from 'rxjs';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  heroState$ = this.heroService.state$;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes();
  }
}
