import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import * as mygloabal  from'../mygloabal';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private BaseUrl :string;

  constructor(private http: HttpClient) {

    this.BaseUrl=mygloabal.BaseUrl;
   }

getAllUsers(){
  return this.http.get<any>(this.BaseUrl +'getAllUsers').pipe(map((res:any)=>{
    return res;
  }));
}


addUser(info:any){
    return this.http.post<any>(this.BaseUrl +'addUserByAdmin',info).pipe(map((res:any)=>{
      return res;
    }));
  }
  
deleteUser(info:any){

  return this.http.post<any>(this.BaseUrl +'deleteUserByAdmin',info).pipe(map((res:any)=>{
    return res;
  }));

}

activeDeactivateUser(info:any){

  return this.http.post<any>(this.BaseUrl +'activeDeactivateUser',info).pipe(map((res:any)=>{
    return res;
  }));

}

updateUserInfo(info:any){

  return this.http.post<any>(this.BaseUrl +'updateUserInfoByAdmin',info).pipe(map((res:any)=>{
    return res;
  }));

}

updateAdminProfile(info:any){

  return this.http.post<any>(this.BaseUrl +'updateAdminProfile',info).pipe(map((res:any)=>{
    return res;
  }));

}

changePassword(info:any){

  return this.http.post<any>(this.BaseUrl +'changePassword',info).pipe(map((res:any)=>{
    return res;
  }));

}

uploadProfileImage(info:any){

  return this.http.post<any>(this.BaseUrl +'uploadProfileImage',info).pipe(map((res:any)=>{
    return res;
  }));

}


numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

// this service for get Mpesa Payment Deatils

getMpesaPayment()
{
  return this.http.get<any>(this.BaseUrl +'getMpesaPayment').pipe(map(res=>{
    return res;
  }));
}



}
