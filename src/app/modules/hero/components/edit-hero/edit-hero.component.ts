import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription, catchError, firstValueFrom, of, tap } from 'rxjs';
import { Hero } from 'src/app/common/models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css'],
})
export class EditHeroComponent implements OnInit, OnDestroy {
  @Input() heroId!: string;
  @Output() changeToView = new EventEmitter<{
    view: 'list' | 'create' | 'edit';
  }>();
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
      publishing: ['', [Validators.required]],
    });
  }
  async ngOnInit(): Promise<void> {
    await firstValueFrom(this.heroService.getHero(this.heroId));
    this.binds.add(
      this.heroService.state$.subscribe((state) => {
        if (state.heroToEdit) {
          this.editHeroForm.patchValue({
            name: state.heroToEdit.name,
            alias: state.heroToEdit.alias,
            publishing: state.heroToEdit.publishing,
          });
          this.hero = state.heroToEdit;
        } else {
          this.notifierService.show({
            type: 'error',
            message: 'No se ha encontrado el heroe a editar',
          });
          this.navigateToView('list');
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
        id: this.hero!.id,
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
            type: 'success',
          });
          this.navigateToView('list');
        });
    }
  }
  onCancel() {
    this.navigateToView('list');
  }
  navigateToView(view: 'list' | 'create' | 'edit') {
    this.changeToView.emit({ view });
  }
}
