import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService
  .verifyToken()
  .pipe(
    map((isAuthenticated) =>
      authService.authUser?.role.role === 'ADMIN' ? true : router.createUrlTree(['', 'home'])
    )
  );
};
