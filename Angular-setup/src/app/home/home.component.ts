import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public users:any=[];
  constructor(private _AuthService:AuthenticationService,private router: Router , private _Userservice:UserService) { 
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers(){
     
  }

  logout(){   
    this._AuthService.logout();
    this.router.navigate(['/login']);
  }
}
