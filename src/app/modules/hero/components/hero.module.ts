import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { HeroRoutingModule } from '../hero-routing.module';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { HeroComponent } from './hero.component';
import { ListHeroComponent } from './list-hero/list-hero.component';

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
  ],
})
export class HeroesModule {}
