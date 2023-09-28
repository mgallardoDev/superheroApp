import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HeroRoutingModule } from './hero-routing.module';
import { SharedModule } from 'src/app/common/shared.module';

@NgModule({
  declarations: [HeroComponent],
  imports: [CommonModule, SharedModule, HeroRoutingModule],
})
export class HeroesModule {}
