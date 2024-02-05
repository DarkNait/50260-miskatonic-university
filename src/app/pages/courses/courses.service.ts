import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { Course } from './model/course';
import { AlertService } from '../../core/services/alert.service';

let courses : Course[] = [
  {
    id: 10,
    name: "Análisis Matemático",
    hours: 96,
    modality: "Anual"    
  },    
  {
    id: 20,
    name: "Arquitectura de Computadoras",
    hours: 96,
    modality: "Anual"    
  },  
  {
    id: 30,
    name: "Algoritmos y Estructuras de Datos",
    hours: 192,
    modality: "Cuatrimestral"    
  },             
]

@Injectable()
export class CoursesService {
  constructor(private alertService: AlertService) { }

  //// COURSES METHODS

  getCourseById(id: number | string): Observable<Course | undefined> {
    return of(courses.find((course) => course.id == id)).pipe(delay(1000));
  }

  getCourses() {
    return of(courses).pipe(delay(1000));
  }

  createCourse(data: Course) {
    courses.push(data);
    return this.getCourses();
  }

  updateCourse(data: Course) {
    courses = courses.map((el) => (el.id === data.id ? { ...el, ...data } : el));
    return this.getCourses();
  }

  deleteCourse(id: number) {
    courses = courses.filter((course) => course.id !== id);
    return this.getCourses().pipe(
      tap(() =>
        this.alertService.showSuccess('Realizado', 'Curso eliminado correctamente')
      )
    );
  }

  //// END COURSES METHODS
}
