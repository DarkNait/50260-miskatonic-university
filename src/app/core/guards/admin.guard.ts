import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/selectors/selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const store = inject(Store);

  
  return store.select(selectAuthUser).pipe(
    map((user) => { 
      return user?.role.role === 'ADMIN' ? true : router.createUrlTree(['', 'home']);
    })
  )
  

  

  /*
  return authService
  .verifyToken()
  .pipe(
    map((isAuthenticated) => {
        return store.select(selectAuthUser).pipe(
          map((user) => { 
            return user?.role.role === 'ADMIN' ? true : router.createUrlTree(['', 'home']);
          })
        )
      }
    )
  );
  */
  
  
  

  /*
  return authService
  .verifyToken()
  .pipe(
    map((isAuthenticated) =>
      authService.authUser?.role.role === 'ADMIN' ? true : router.createUrlTree(['', 'home'])
    )
  );
  */
  
  
};
