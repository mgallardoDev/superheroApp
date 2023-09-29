import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, of, tap } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { Hero } from 'src/app/common/models/hero';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css'],
})
export class CreateHeroComponent implements OnInit, OnDestroy {
  @Output() changeToView = new EventEmitter<{
    view: 'list' | 'create' | 'edit';
  }>();
  binds = new Subscription();
  createHeroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService,
    private notifierService: NotifierService
  ) {
    this.createHeroForm = this.formBuilder.group({
      name: [''],
      alias: ['', [Validators.required]],
      publishing: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.binds.unsubscribe();
  }

  onCreateHero() {
    if (this.createHeroForm.valid) {
      const newHero: Hero = this.createHeroForm.value;

      this.heroService
        .createHero(newHero)
        .pipe(
          tap(() => this.heroService.searchHeroes()),
          catchError(() => {
            this.notifierService.show({
              message: 'No se ha podido crear el héroe',
              type: 'error',
            });
            return of(null);
          })
        )
        .subscribe(() => {
          this.notifierService.show({
            type: 'success',
            message: 'Héroe creado con éxito',
          });
          this.navigateToView('list');
        });
    }
    this.createHeroForm.markAllAsTouched()
  }

  onCancel() {
    this.navigateToView('list');
  }

  navigateToView(view: 'list' | 'create' | 'edit') {
    this.changeToView.emit({ view });
  }
}
