import { Component } from '@angular/core';
import { UsersService } from '../../users.service';
import { Store } from '@ngrx/store';
import { LoadingService } from '../../../../core/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';
import { Inscription } from '../../../inscriptions/models/inscription';
import { selectInscriptions } from '../../../inscriptions/store/inscriptions.selectors';
import { Observable } from 'rxjs';
import { InscriptionsActions } from '../../../inscriptions/store/inscriptions.actions';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId: string | number;
  user: User | undefined;
  inscriptions$: Observable<Inscription[]>;

  constructor(    
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private usersService: UsersService,
    private store: Store
    ) {
      this.loadingService.setIsLoading(true);
      this.userId = this.route.snapshot.params['id'];
      this.inscriptions$ = this.store.select(selectInscriptions);
      this.store.dispatch(InscriptionsActions.loadInscriptionsByUserId( {id: this.userId} ));

      this.usersService.getUserById(this.userId).subscribe({
        next: (user) => {
          console.log(user);
          this.user = user;  
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });
  }

}
