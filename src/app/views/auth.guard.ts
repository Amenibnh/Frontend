import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  let token=localStorage.getItem("token");
  console.log(token)
  if(token){
    return true;
  }else{
    alert("Please login,redirecting to login page !!");
    _router.navigate(['/login'])
    return false;
  }
};


export const loggedInGuard: CanActivateFn =(route, state) =>{
  const _router=inject(Router)
  let token=localStorage.getItem("token");
  console.log(token)

  if(token){
    const confirmLogout = confirm("Vous etes déja connecté. Voules-vous vous déconnecter et aller a la page de connexion ?");
    if(confirmLogout){
      localStorage.removeItem("token");
      return true;
    }else{
      _router.navigate(['/dashboard']);
      return false;
    }
    }else{
      return true;
      }
};
