import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Hero } from 'src/app/common/models/hero';
import { HeroService } from '../../services/hero.service';
import { ListHeroComponent } from './list-hero.component';
import { SharedModule } from 'src/app/common/shared.module';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ListHeroComponent', () => {
  let component: ListHeroComponent;
  let fixture: ComponentFixture<ListHeroComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockNotifierService: jasmine.SpyObj<NotifierService>;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'searchHeroes',
      'deleteHero',
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockNotifierService = jasmine.createSpyObj('NotifierService', ['show']);

    TestBed.configureTestingModule({
      declarations: [ListHeroComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: NotifierService, useValue: mockNotifierService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListHeroComponent);
    component = fixture.componentInstance;
  });

  it('should set selected hero when selectHero is called', () => {
    const mockHero: Hero = {
      id: '123',
      alias: 'Superman',
      name: 'Clark Kent',
      publishing: 'DC Comics',
    };

    component.selectHero(mockHero);

    expect(component.selectedHero).toEqual(mockHero);
  });

  it('should call searchHeroes with searchTerm, pageIndex and pageSize', () => {
    fixture.detectChanges();
    component.searchTerm$.next({ target: { value: 'testSearch' } });
    component.pageChanged({ pageIndex: 2, pageSize: 5 } as any);

    expect(mockHeroService.searchHeroes).toHaveBeenCalledWith(
      'testSearch',
      3,
      5
    ); // pageIndex will be +1 in the component
  });

  it('should unsubscribe from binds on destroy', () => {
    const spy = spyOn(component.binds, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
