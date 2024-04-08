import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService,private router: Router) {}
  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var bl:Boolean=true;
      let UerRoleAccess;
      if(state.url!="/" && state.url!="/auth/login" && state.url!="/" && (!state.url.includes("?")))
        {
          UerRoleAccess=JSON.parse(localStorage.getItem('UerRoleAccess'));
          if(UerRoleAccess.find(e=>e.MenuItemURL===state.url))
          {
            bl=true;
          }
          else
          {
            bl=false;
          }
        }

      let token=localStorage.getItem('token');
      if((!state.url.includes("?")) && state.url!="/" && this.router.url!="/auth/login" && (token==null || token==undefined || token==""))
      {
        bl=false;
      }
  
      if (bl) {
        // logged in so return true
        return true;
      }
  
      // not logged in so redirect to login page with the return url
      this.authService.logout();
      return false;
  }
  
}
