import { Injectable } from '@angular/core';
import { Role, User } from './model/user';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AlertService } from '../../core/services/alert.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {

  constructor(private alertService: AlertService, private httpClient: HttpClient) { }

  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  //// USERS METHODS

  getUserById(id: number | string): Observable<User | undefined> {
    //return of(users.find((user) => user.id == id)).pipe(delay(1000));
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`);
  }

  getUsers() {
    //return of(users).pipe(delay(1000));
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users`)
      .pipe(
        catchError((error) => {
          this.alertService.showError('Error al cargar los usuarios');
          return of([]);
        })
      );
  }

  createUser(data: User) {
    //data = { ...data, id: new Date().getTime() };
    //users.push(data);
    //return this.getUsers();
    return this.httpClient
      .post<User>(`${environment.apiURL}/users`, {
        ...data,
        token: this.generateString(10),
      })
      .pipe(mergeMap(() => this.getUsers()));    
  }

  updateUser(data: User) {
    /*
    users = users.map((el) => (el.id === data.id ? { ...el, ...data } : el));
    return this.getUsers();
    */
    return this.httpClient.put<User>(`${environment.apiURL}/users/${data.id}`, {
      ...data
    })
    .pipe(
      mergeMap(() => this.getUsers())
    ); 
  }

  deleteUser(id: number) {
    /*
    users = users.filter((user) => user.id !== id);
    return this.getUsers().pipe(
      tap(() =>
        this.alertService.showSuccess('Realizado', 'Usuario eliminado correctamente')
      )
    );*/
    return this.httpClient
      .delete<User>(`${environment.apiURL}/users/${id}`)
      .pipe(
        tap(() => this.alertService.showSuccess('Realizado', 'Usuario eliminado correctamente')),
        mergeMap(() => this.getUsers())
      );    
  }

  //// END USERS METHODS

  //// ROLES METHODS

  getRoles() {
    return this.httpClient
    .get<Role[]>(`${environment.apiURL}/roles`)
    .pipe(
      catchError((error) => {
        this.alertService.showError('Error al cargar los roles');
        return of([]);
      })
    );
  }

  /*
  getRoles(): Observable<string[]> {
    return of(roles).pipe(delay(1000));
  }
  */

  //// END ROLES METHODS
}
