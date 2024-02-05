import { Component, OnInit } from '@angular/core';
import { Course } from './model/course';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import { CoursesService } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseModalComponent } from './components/course-modal/course-modal.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'hours', 'modality', 'actions'];

  courses: Course[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private coursesService: CoursesService,
    public dialog: MatDialog   
  ) {
      
  }

  ngOnInit(): void {
    this.loadPageData();
    setTimeout(()=> this.loadingService.setIsLoading(false), 1500);
  }

  loadPageData(): void {
    this.loadingService.setIsLoading(true);
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = [...courses];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

  
  onCreate(): void {
    this.dialog
      .open(CourseModalComponent, {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.loadingService.setIsLoading(true);
            this.coursesService.createCourse(data).subscribe({
              next: (courses) => { 
                (this.courses = [...courses] ); 
              },
              complete: () => {
                this.loadingService.setIsLoading(false);
              },
            });
          }
        }
      });
  }

  onEdit(course: Course) {
    this.dialog
      .open(CourseModalComponent, {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.loadingService.setIsLoading(true);
            this.coursesService
              .updateCourse(result).subscribe({
                next: (courses) => { 
                  (this.courses = [...courses] ); 
                },
                complete: () => {
                  this.loadingService.setIsLoading(false);
                },
              });
          }
        }
      })
  }
    
  onDeleteUser(course: Course): void {
    this.loadingService.setIsLoading(true);
    this.coursesService.deleteCourse(course.id).subscribe({
      next: (courses) => {
        this.courses = [...courses];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

}
