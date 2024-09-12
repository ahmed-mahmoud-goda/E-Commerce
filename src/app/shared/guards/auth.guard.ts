import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let _router = inject(Router)
  if(localStorage.getItem('userToken') !== null){
    return true
  }
  else{
    localStorage.setItem("navigateTo",state.url);
    return _router.navigate(['/login'])
  }
};
