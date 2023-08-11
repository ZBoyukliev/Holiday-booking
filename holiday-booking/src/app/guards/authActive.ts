import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user/user.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticatedGuard implements CanActivate {
  
    constructor(private userService: UserService, private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.userService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
  }
  