import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeroComponent } from './create-hero.component';
import { HeroService } from '../../services/hero.service';
import { NotifierService } from 'angular-notifier';
import { SharedModule } from 'src/app/common/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Hero } from 'src/app/common/models/hero';

describe('CreateHeroComponent', () => {
  let component: CreateHeroComponent;
  let fixture: ComponentFixture<CreateHeroComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockNotifierService: jasmine.SpyObj<NotifierService>;
  const mockHero: Hero = {
    id: '123',
    alias: 'Superman',
    name: 'Clark Kent',
    publishing: 'DC Comics',
  };

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'createHero',
      'getHero',
      'searchHeroes',
      'isUniqueNameAliasCombination',
    ]);
    mockNotifierService = jasmine.createSpyObj(['show']);
    await TestBed.configureTestingModule({
      declarations: [CreateHeroComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        FormBuilder,
        { provide: HeroService, useValue: mockHeroService },
        { provide: NotifierService, useValue: mockNotifierService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'navigateToView').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createHero(), navigate to list view and show success notification on success', () => {
    mockHeroService.isUniqueNameAliasCombination.and.returnValue(of(true))
    mockHeroService.createHero.and.returnValue(of(mockHero));
    const { id, ...newHero } = mockHero;
    component.createHeroForm.setValue(newHero);
    component.onCreateHero();
    expect(mockHeroService.createHero).toHaveBeenCalled();
    expect(mockNotifierService.show).toHaveBeenCalledWith({
      type: 'success',
      message: 'Héroe creado con éxito',
    });
    expect(component.navigateToView).toHaveBeenCalledWith('list');
  });

  it('should unsubscribe from binds on destroy', () => {
    const spy = spyOn(component.binds, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
