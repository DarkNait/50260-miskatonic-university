import { Injectable } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';
import { User } from '../../pages/users/model/user';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';
import { Observable, catchError, delay, finalize, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { authActions } from '../../core/store/auth/actions/actions';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: User | null = null;
  
  constructor(
    private router: Router,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private httpClient: HttpClient,
    private store: Store
  ) {}

  private setAuthUser(user: User): void {
    this.authUser = user;
    this.store.dispatch(authActions.setAuthUser( { user }))
    localStorage.setItem('token', user.token);
  }

  login(data: LoginData): Observable<User[]> {
    this.loadingService.setIsLoading(true);

    return this.httpClient
      .get<User[]>(
        `${environment.apiURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        delay(1000),
        tap((response) => {
          if (!!response[0]) {
            this.setAuthUser(response[0]);
            this.loadingService.setIsLoading(false);
            this.router.navigate(['', 'home']);
          } else {
            this.loadingService.setIsLoading(false);
            this.alertService.showError('Email o password invalidos');
          }
        })
      );
  }

  logout(): void {
    this.authUser = null;
    this.store.dispatch(authActions.logout());
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    this.loadingService.setIsLoading(true);

    return this.httpClient
    .get<User[]>(
      `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
    )
    .pipe(
      delay(1000),
      map((response) => {
        if (response.length) {
          this.setAuthUser(response[0]);
          return true;
        } else {
          this.authUser = null;
          this.store.dispatch(authActions.logout());
          localStorage.removeItem('token');
          return false;
        }
      }),
      catchError(() => of(false)),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }
}
