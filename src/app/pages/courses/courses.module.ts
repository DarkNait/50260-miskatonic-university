import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from './courses.service';
import { CourseModalComponent } from './components/course-modal/course-modal.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesComponent
  ],
  providers: [
    CoursesService,
  ],
})
export class CoursesModule { }
