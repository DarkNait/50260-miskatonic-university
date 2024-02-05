import { Injectable } from '@angular/core';
import { User } from './model/user';
import { Observable, delay, of, tap } from 'rxjs';
import { AlertService } from '../../core/services/alert.service';

let roles: string[] = ['ADMIN', 'STUDENT', 'PROFESSOR'];

let users : User[] = [
  {
    id: 1,
    firstName: "Roland",
    lastName: "Banks",
    birthday: new Date(1981, 9, 5),
    email: "rbanks@arkhammail.com",
    password: "123456",
    role: "PROFESSOR"
  },    
  {
    id: 2,
    firstName: "Jenny",
    lastName: "Barnes",
    birthday: new Date(1986, 6, 7),
    email: "jbarnes@arkhammail.com",
    password: "123456",
    role: "STUDENT"
  },    
  {
    id: 3,
    firstName: "Preston",
    lastName: "Fairmont",
    birthday: new Date(1982, 11, 15),
    email: "pfairmonts@arkhammail.com",
    password: "123456",
    role: "ADMIN"
  },    
  {
    id: 4,
    firstName: "Calvin",
    lastName: "Wright",
    birthday: new Date(1986, 3, 5),
    email: "cwright@arkhammail.com",
    password: "123456",
    role: "STUDENT"
  },    
  {
    id: 5,
    firstName: "Diana",
    lastName: "Stanley",
    birthday: new Date(1999, 8, 12),
    email: "dstanley@arkhammail.com",
    password: "123456",
    role: "STUDENT"
  },    
  {
    id: 6,
    firstName: "Rita",
    lastName: "Young",
    birthday: new Date(1992, 10, 16),
    email: "ryoung@arkhammail.com",
    password: "123456",
    role: "PROFESSOR"
  },             
]

@Injectable()
export class UsersService {

  constructor(private alertService: AlertService) { }

  //// USERS METHODS

  getUserById(id: number | string): Observable<User | undefined> {
    return of(users.find((user) => user.id == id)).pipe(delay(1000));
  }

  getUsers() {
    return of(users).pipe(delay(1000));
  }

  createUser(data: User) {
    data = { ...data, id: new Date().getTime() };
    users.push(data);
    return this.getUsers();
  }

  updateUser(data: User) {
    users = users.map((el) => (el.id === data.id ? { ...el, ...data } : el));
    return this.getUsers();
  }

  deleteUser(id: number) {
    users = users.filter((user) => user.id !== id);
    return this.getUsers().pipe(
      tap(() =>
        this.alertService.showSuccess('Realizado', 'Usuario eliminado correctamente')
      )
    );
  }

  //// END USERS METHODS

  //// ROLES METHODS

  getRoles(): Observable<string[]> {
    return of(roles).pipe(delay(1000));
  }

  //// END ROLES METHODS
}
