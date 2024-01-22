import { Component } from '@angular/core';
import { User } from './model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns: string[] = ['id', 'fullName', 'age', 'email', 'role'];

  students : User[] = [
    {
      id: 1,
      firstName: "Roland",
      lastName: "Banks",
      birthday: new Date(1981, 9, 5),
      email: "rbanks@arkhammail.com",
      password: "123456",
      role: "STUDENT"
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
      role: "STUDENT"
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
      role: "STUDENT"
    },             
  ]


  onUserSubmitted(ev: User): void {
    this.students = [...this.students, { ...ev, id: this.students.length + 1, birthday: new Date(ev.birthday) }];
  }
}
