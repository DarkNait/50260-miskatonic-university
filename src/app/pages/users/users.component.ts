import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Role, User } from './model/user';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import { UsersService } from './users.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'age', 'email', 'role', 'actions'];

  users: User[] = [];
  roles: Role[] = [];

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private usersService: UsersService,
    public dialog: MatDialog   
  ) {
    console.log(this.route.snapshot.queryParams);     
  }

  ngOnInit(): void {
    this.loadPageData();
  }

  loadPageData(): void {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.usersService.getRoles(),
      this.usersService.getUsers(),
    ]).subscribe({
      next: (value) => {
        this.roles = value[0];
        this.users = value[1];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

  onCreate(): void {
    this.dialog
      .open(UserModalComponent, {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.loadingService.setIsLoading(true);
            this.usersService.createUser(data).subscribe({
              next: (users) => { 
                (this.users = [...users] ); 
              },
              complete: () => {
                this.loadingService.setIsLoading(false);
              },
            });
          }
        }
      });
  }

  onEdit(user: User) {
    this.dialog
      .open(UserModalComponent, {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            result.id = user.id;
            this.loadingService.setIsLoading(true);
            this.usersService
              .updateUser(result).subscribe({
                next: (users) => { 
                  (this.users = [...users] ); 
                },
                complete: () => {
                  this.loadingService.setIsLoading(false);
                },
              });
          }
        }
      })
  }

  /*
  onUserSubmitted(user: User): void {
    this.loadingService.setIsLoading(true);
    user = { ...user, id: new Date().getTime(), birthday: new Date(user.birthday) };

    this.usersService
      .createUser(user)
      .subscribe({
        next: (users) => {
          this.users = [...users];
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });
  }
  */

  onDeleteUser(user: User): void {
    this.loadingService.setIsLoading(true);
    this.usersService.deleteUser(user.id).subscribe({
      next: (users) => {
        this.users = [...users];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

}
