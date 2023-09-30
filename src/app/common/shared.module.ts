import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CapitalizeWordsDirective } from './directives/capitalizate-input.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ConfirmationDialogComponent, CapitalizeWordsDirective, LoadingComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCardModule,MatProgressSpinnerModule],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    CapitalizeWordsDirective,
    LoadingComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
