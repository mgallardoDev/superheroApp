import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { EditHeroComponent } from './edit-hero.component';
import { HeroService } from '../../services/hero.service';
import { NotifierService } from 'angular-notifier';
import { SharedModule } from 'src/app/common/shared.module';
import { Hero } from 'src/app/common/models/hero';
import { InitialHeroState } from '../../services/hero-state-config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditHeroComponent', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;
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
      'updateHero',
      'getHero',
      'searchHeroes'
    ]);
    mockHeroService.state$ = of({
      heroList: [],
      heroToEdit: null,
      totalHeroes: 0,
    });

    mockNotifierService = jasmine.createSpyObj(['show']);

    await TestBed.configureTestingModule({
      declarations: [EditHeroComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        FormBuilder,
        { provide: HeroService, useValue: mockHeroService },
        { provide: NotifierService, useValue: mockNotifierService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    component.heroId = '1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHore in the service based on heroId', () => {
    mockHeroService.getHero.and.returnValue();

    component.ngOnInit();
    component.ngAfterViewInit();

    expect(mockHeroService.getHero).toHaveBeenCalledWith('1');
  });

  it('should show error notification when hero update fails', () => {

    //EN ESTE CASO TENEMOS QUE VOLVER A CREAR EL COMPONENTE YA QUE LOS VALORES DEL STATE QUE USAMOS POR DEFECTO EN BEFOREEACH NO NOS SIREVEN


    mockHeroService.state$ = of({
      heroList: [mockHero],
      heroToEdit: mockHero,
      totalHeroes: 1,
    });
    mockHeroService.updateHero.and.returnValue(throwError(new Error()));

    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    component.onSaveChanges();

    expect(mockNotifierService.show).toHaveBeenCalledWith({
      message: 'No se ha podido actualizar el héroe',
      type: 'error',
    });
  });

  it('should show error notification when hero update fails', () => {

    //EN ESTE CASO TENEMOS QUE VOLVER A CREAR EL COMPONENTE YA QUE LOS VALORES DEL STATE QUE USAMOS POR DEFECTO EN BEFOREEACH NO NOS SIREVEN


    mockHeroService.state$ = of({
      heroList: [mockHero],
      heroToEdit: mockHero,
      totalHeroes: 1,
    });
    mockHeroService.updateHero.and.returnValue(of(mockHero));

    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    component.onSaveChanges();

    expect(mockNotifierService.show).toHaveBeenCalledWith({
      message: 'Héroe actualizado con éxito',
      type: 'success',
    });
  });


  it('should unsubscribe from binds on destroy', () => {
    const spy = spyOn(component.binds, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
