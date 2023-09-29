import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from './common/services/loadin.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {
  title = 'superheroes';
  isLoading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }
  ngAfterViewChecked(): void {
    //con esto evitamos un ExpressionChangedAfterItHasBeenCheckedError aunque el metodo de deteccion sea Default
    this.cdr.detectChanges();
  }
}
