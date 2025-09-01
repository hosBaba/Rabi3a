import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);

  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve(true);
      } else {
        resolve(router.parseUrl('/login'));
      }
    });
  });
};
