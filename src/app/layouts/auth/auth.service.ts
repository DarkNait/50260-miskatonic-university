import { Injectable } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';
import { User } from '../../pages/users/model/user';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';
import { delay, finalize, map, of } from 'rxjs';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private MOCK_USER = {
    id: 50,
    email: 'test@mail.com',
    firstName: 'pruebaNombre',
    lastName: 'pruebaApellido',
    birthday: new Date(),
    password: '123456',
    role: 'ADMIN',
  };  

  authUser: User | null = null;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {}

  login(data: LoginData): void {
    if (
      data.email === this.MOCK_USER.email &&
      data.password === this.MOCK_USER.password
    ) {
      this.authUser = this.MOCK_USER;
      localStorage.setItem(
        'token',
        'numToken1112222'
      );
      this.router.navigate(['', 'home']);
    } else {
      this.alertService.showError('Email o password invalidos');
    }
  }

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    this.loadingService.setIsLoading(true);
    return of(localStorage.getItem('token')).pipe(
      delay(1000),
      map((response) => !!response),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }

  verifyLoggedUser(): void {
    this.verifyToken()
      .subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.authUser = this.MOCK_USER;
            this.router.navigate(['', 'home']);
          }
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });      
  }
}
