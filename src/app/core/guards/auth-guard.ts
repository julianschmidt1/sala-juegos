import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { supabase } from '../supabase/supabase';

export const authGuard: CanActivateFn = async () => {
  const _router = inject(Router);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    return true;
  }

  _router.navigate(['/login']);

  return false;
};