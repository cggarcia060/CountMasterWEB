import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/utils/token.service';

export const AuthGuard = () => {
  const authService = inject(TokenService);
  const router = inject(Router);

  if (authService.getToken()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/admin/auth/login');
};
