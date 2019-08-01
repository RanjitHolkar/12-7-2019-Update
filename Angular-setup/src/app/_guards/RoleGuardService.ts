import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        const currentUser = localStorage.getItem('currentUser');
        let  Payload=JSON.parse(currentUser);
        console.log(Payload);
      if(Payload == null)
      {
        this.router.navigate(['login']);
        return false;
      }
        const tokenPayload = decode(Payload.token,'Y2xlYW5pbmcgbWFuYWdlbWVudCAxMjM0NTY3ODk=');
              
       // console.log(tokenPayload);

          let d = new Date();
          let currntTime = d.getTime();

          if ( tokenPayload.exp >= currntTime || tokenPayload.role !== expectedRole) {
            this.router.navigate(['/login']);
            return false;
          }
          //console.log("token="+token);
          return true;
    }
}