
import {inject} from '@angular/core';
import { TokenService } from '../service/utils/token.service';

export const SuperAdminGuard = () => {
  const authService = inject(TokenService);

  if (authService.isSuperAdmin()) {
    return true;
  }
  return false;
};
