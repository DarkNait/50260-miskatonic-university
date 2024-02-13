import { Injectable } from '@angular/core';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { Course } from './model/course';
import { AlertService } from '../../core/services/alert.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CoursesService {
  constructor(private alertService: AlertService, private httpClient: HttpClient) { }

  //// COURSES METHODS

  getCourseById(id: number | string): Observable<Course | undefined> {
    return this.httpClient.get<Course>(`${environment.apiURL}/courses/${id}`);
  }

  getCourses() {
    return this.httpClient
      .get<Course[]>(`${environment.apiURL}/courses`)
      .pipe(
        catchError((error) => {
          this.alertService.showError('Error al cargar los cursos');
          return of([]);
        })
      );
  }

  createCourse(data: Course) {
    return this.httpClient
      .post<Course>(`${environment.apiURL}/courses`, {
        ...data, id: data.id.toString()
      })
      .pipe(mergeMap(() => this.getCourses()));     
  }

  updateCourse(data: Course) {
    return this.httpClient.put<Course>(`${environment.apiURL}/courses/${data.id}`, {
      ...data
    })
    .pipe(
      mergeMap(() => this.getCourses())
    );   
  }

  deleteCourse(id: number) {
    return this.httpClient
      .delete<Course>(`${environment.apiURL}/courses/${id}`)
      .pipe(
        tap(() => this.alertService.showSuccess('Realizado', 'Curso eliminado correctamente')),
        mergeMap(() => this.getCourses())
      );    
  }

  //// END COURSES METHODS
}
