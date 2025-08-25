import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {

 const auth = inject(Auth);
  const router = inject(Router);

  return new Promise(resolve => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(true); 
        
        
      } else {
        resolve(router.parseUrl('/login')); // 🚫 يوجهه للـ login
      }
    });
  });





  return true;
};
