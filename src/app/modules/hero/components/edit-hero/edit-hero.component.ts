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
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css'],
})
export class EditHeroComponent implements OnInit, OnDestroy {
  @Output() changeToView = new EventEmitter<'list' | 'create' | 'edit'>();
  binds = new Subscription();
  editHeroForm: FormGroup;
  hero: Hero | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService,
    private notifierService: NotifierService
  ) {
    this.editHeroForm = this.formBuilder.group({
      name: [''],
      alias: ['', [Validators.required]],
      publishin: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.binds.add(
      this.heroService.state$.subscribe((state) => {
        if (state.heroToEdit) {
          this.editHeroForm.patchValue({
            name: state.heroToEdit.name,
            alias: state.heroToEdit.alias,
            publishin: state.heroToEdit.publishin,
          });
          this.hero = state.heroToEdit;
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.binds.unsubscribe();
  }

  onSaveChanges() {
    if (this.editHeroForm.valid) {
      const updatedHero: Hero = {
        id: this.hero?.id,
        ...this.editHeroForm.value,
      };
      this.heroService
        .updateHero(updatedHero)
        .pipe(
          catchError(() => {
            this.notifierService.show({
              message: 'No se ha podido actualizar el héroe',
              type: 'error',
            });
            return of(null);
          }),
          tap(() => this.heroService.searchHeroes())
        )
        .subscribe(() => {
          this.notifierService.show({
            message: 'Héroe actualizado con éxito',
            type: 'succes',
          });
          this.navigateToView('list');
        });
    }
    console.log(this.editHeroForm);
  }
  onCancel() {
    this.navigateToView('list');
  }
  navigateToView(view: 'list' | 'create' | 'edit') {
    this.changeToView.emit(view);
  }
}
