import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  Observable,
  Subject,
  Subscription,
  map,
  of,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs';
import { Hero } from 'src/app/common/models/hero';
import { HeroState, InitialHeroState } from '../../services/hero-state';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-list-hero',
  templateUrl: './list-hero.component.html',
  styleUrls: ['./list-hero.component.css'],
})
export class ListHeroComponent implements OnInit, OnDestroy {
  @Input() heroState$: Observable<HeroState> = of(InitialHeroState);
  @Output() changeToView = new EventEmitter<'list' | 'create' | 'edit'>();
  binds = new Subscription();
  selectedHero: Hero | null = null;
  searchTerm$ = new Subject<any>();
  pageSize: number = 10;
  pageIndex = 1;
  displayedColumns: string[] = ['alias', 'name', 'publishin'];
  private queryParameter: string = '';

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.binds.add(
      this.searchTerm$
        .pipe(
          throttleTime(1000, undefined, { leading: true, trailing: true }),
          map((event) => event.target.value),
          tap((query) => (this.queryParameter = query)),
          switchMap((query) => {
            this.heroService.searchHeroes(query);
            return of([]);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.binds.unsubscribe;
  }

  selectHero(hero: Hero) {
    this.heroService.getHero(hero.id);
    this.selectedHero = hero;
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.heroService.searchHeroes(
      this.queryParameter,
      this.pageIndex,
      this.pageSize
    );
  }

  navigateToView(view: 'list' | 'create' | 'edit') {
    this.changeToView.emit(view);
  }
}
