import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptions, selectInscriptionsIsLoading } from './store/inscriptions.selectors';
import { Observable, Subscription } from 'rxjs';
import { Inscription } from './models/inscription';
import { selectAuthUser } from '../../core/store/auth/selectors/selectors';
import { LoadingService } from '../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionModalComponent } from './components/inscription-modal/inscription-modal.component';

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

  constructor(private loadingService: LoadingService, private store: Store, private matDialog: MatDialog) {    
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
    this.matDialog
      .open(InscriptionModalComponent, {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
      });            
  }

  onEdit(inscription: Inscription) {
    this.matDialog
      .open(InscriptionModalComponent, {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
        data: inscription,
      });
  }

  onDelete(inscription: Inscription): void {
    this.store.dispatch(InscriptionsActions.deleteInscription({ id: inscription.id }) );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element?.unsubscribe();  
    });    
  }
}
