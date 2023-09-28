import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/common/models/hero';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  heroState$ = this.heroService.state$;
  binds = new Subscription()

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.searchHeroes();
  }


}
