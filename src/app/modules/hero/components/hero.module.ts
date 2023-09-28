import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroRoutingModule } from '../hero-routing.module';
import { SharedModule } from 'src/app/common/shared.module';
import { HeroComponent } from './hero.component';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { ListHeroComponent } from './list-hero/list-hero.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeroComponent,
    CreateHeroComponent,
    ListHeroComponent,
    EditHeroComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HeroesModule {}
