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
  catchError,
  map,
  of,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs';
import { Hero } from 'src/app/common/models/hero';
import { HeroState, InitialHeroState } from '../../services/hero-state-config';
import { HeroService } from '../../services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/common/components/confirmation-dialog/confirmation-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-list-hero',
  templateUrl: './list-hero.component.html',
  styleUrls: ['./list-hero.component.css'],
})
export class ListHeroComponent implements OnInit, OnDestroy {
  @Input() heroState$: Observable<HeroState> = of(InitialHeroState);
  @Output() changeToView = new EventEmitter<{
    view: 'list' | 'create' | 'edit';
    heroId: string | null;
  }>();
  binds = new Subscription();
  selectedHero: Hero | null = null;
  searchTerm$ = new Subject<any>();
  pageSize: number = 10;
  pageIndex = 1;
  displayedColumns: string[] = ['alias', 'name', 'publishing'];
  private queryParameter: string = '';

  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
    private notifierService: NotifierService
  ) {}

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
    this.binds.unsubscribe();
  }

  delteHeroOpenConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService
          .deleteHero(this.selectedHero!.id)
          .pipe(
            tap(() =>
              this.heroService.searchHeroes(
                this.queryParameter,
                this.pageIndex,
                this.pageSize
              )
            ),
            catchError(() => {
              this.notifierService.show({
                message: 'No se ha podido eliminar el héroe',
                type: 'error',
              });
              return of(null);
            })
          )
          .subscribe(() => {
            this.notifierService.show({
              message: 'Héroe eliminado con éxito',
              type: 'success',
            });
            this.selectedHero = null;
          });
      }
    });
  }

  selectHero(hero: Hero) {
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
    this.changeToView.emit({
      view,
      heroId: view === 'edit' ? this.selectedHero!.id : null,
    });
  }
}
