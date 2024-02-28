import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptions, selectInscriptionsIsLoading } from './store/inscriptions.selectors';
import { Observable, Subscription } from 'rxjs';
import { Inscription } from './model/inscription';
import { selectAuthUser } from '../../core/store/auth/selectors/selectors';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnDestroy {
  
  isAdminUser: boolean = false;
  subscriptions: Subscription[] = [];
  //isLoading$: Observable<boolean>;
  inscriptions: Inscription[] = [];

  displayedColumns: string[] = ['id', 'user', 'course', 'role', 'actions'];

  constructor(private loadingService: LoadingService, private store: Store){    
    //this.isLoading$ = this.store.select(selectInscriptionsIsLoading);
    this.loadingService.setIsLoading(true);

    this.subscriptions.push(
      this.store
       .select(selectAuthUser)
       .subscribe({
         next: (value) => {
           this.isAdminUser = value?.role.role === 'ADMIN';
         },
       })
    );

    this.subscriptions.push(
      this.store
       .select(selectInscriptionsIsLoading)
       .subscribe({
         next: (value) => {
          this.loadingService.setIsLoading(value);
         },
       })
    );

    this.subscriptions.push(
      this.store
       .select(selectInscriptions)
       .subscribe({
         next: (inscriptions) => {
           this.inscriptions = inscriptions;
         },
       })
    );

    this.store.dispatch(InscriptionsActions.loadInscriptions());
  }

  onCreate(): void {
    /*
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
    */
  }

  onEdit(inscription: Inscription) {
    /*
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
            result.token = user.token;
            
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
      */
  }

  onDelete(inscription: Inscription): void {
    /*
    this.loadingService.setIsLoading(true);
    this.usersService.deleteUser(user.id).subscribe({
      next: (users) => {
        this.users = [...users];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
    */
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element?.unsubscribe();  
    });    
  }
}
