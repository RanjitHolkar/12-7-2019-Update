import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as myGloabal from'../mygloabal';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  public BaseUrl:string;
  constructor(private http: HttpClient,private router:Router) { 
    this.BaseUrl=myGloabal.BaseUrl;

  }


  login(info:any) {
    return this.http.post<any>(this.BaseUrl+'login',info)
        .pipe(map((res:any) => {    

           console.log(res);        
            // login successful if there's a jwt token in the response         
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes           
                localStorage.setItem('currentUser', JSON.stringify({ token: res.token,userinfo:res.userinfo }));
                return "success";
            }else{
              if(res['msg'] == "deactive")
              {
                return "Deactivate";
              }
                return "fail";
            }
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  saveOnesignalId(info:any)
  {
    return this.http.post<any>(this.BaseUrl+'saveOneSignalUserId',info).pipe(map((res:any)=>{
      return res;
    }));
  }
}
