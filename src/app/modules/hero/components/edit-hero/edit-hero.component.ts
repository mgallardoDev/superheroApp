import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css'],
})
export class EditHeroComponent implements OnInit, OnDestroy {
  binds = new Subscription();
  editHeroForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {
    this.editHeroForm = this.formBuilder.group({
      name: ['', ],
      alias: [['', [Validators.required]]],
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
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.binds.unsubscribe();
  }

  saveChanges(){

  }
}
