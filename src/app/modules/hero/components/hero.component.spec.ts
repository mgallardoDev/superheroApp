import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';
import { HeroService } from '../services/hero.service';
import { ListHeroComponent } from './list-hero/list-hero.component';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { SharedModule } from 'src/app/common/shared.module';
import { NotifierModule } from 'angular-notifier';
import { of } from 'rxjs';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj(['searchHeroes']);
    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
        ListHeroComponent,
        CreateHeroComponent,
        EditHeroComponent,
      ],
      imports: [SharedModule, NotifierModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchHeroes on init', () => {
    fixture.detectChanges();
    expect(mockHeroService.searchHeroes).toHaveBeenCalled();
  });
});
