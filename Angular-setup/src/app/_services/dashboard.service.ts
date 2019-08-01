import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as mygloabal from '../mygloabal';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private BaseUrl=mygloabal.BaseUrl;
  constructor(private httpClient:HttpClient) {  }
  getDashboardData()
  {
    return this.httpClient.get<any>(this.BaseUrl +'getDashboardData').pipe(map(res=>{
      return res;
    }))
  }
}
