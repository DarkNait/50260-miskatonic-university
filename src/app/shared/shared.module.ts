import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgePipe } from './pipes/age.pipe';
import { TableStripedDirective } from './directives/table-striped.directive';
import { DefaultPaddingComponent } from './components/default-padding/default-padding.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ValidationErrorsPipe } from './pipes/validation-errors.pipe';


@NgModule({
  declarations: [
    AgePipe,
    ValidationErrorsPipe,
    TableStripedDirective,
    DefaultPaddingComponent,
    PageHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [    
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,    
    AgePipe,
    ValidationErrorsPipe,
    TableStripedDirective,
    DefaultPaddingComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
