import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroRoutingModule } from './hero-routing.module';
import { SharedModule } from 'src/app/common/shared.module';
import { HeroComponent } from './components/hero.component';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { ListHeroComponent } from './components/list-hero/list-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';

@NgModule({
  declarations: [HeroComponent, CreateHeroComponent, ListHeroComponent, EditHeroComponent],
  imports: [CommonModule, SharedModule, HeroRoutingModule],
})
export class HeroesModule {}
