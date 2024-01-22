import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPaddingComponent } from './components/default-padding/default-padding.component';
import { AgePipe } from './pipes/age.pipe';
import { TableStripedDirective } from './directives/table-striped.directive';


@NgModule({
  declarations: [
    DefaultPaddingComponent,
    AgePipe,
    TableStripedDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultPaddingComponent,
    AgePipe,
    TableStripedDirective
  ]
})
export class SharedModule { }
