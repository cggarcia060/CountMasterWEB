import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/utils/token.service';
import { Constant } from 'src/app/shared/utils/constant/constant';

export const AuthorizacionGuard = () => {
  const authService = inject(TokenService);
  const router = inject(Router);

  if (authService.getLocalStorage(Constant.COMPONENTS)) {
    return true;
  }
  return router.parseUrl('/admin/auth/login');
};
