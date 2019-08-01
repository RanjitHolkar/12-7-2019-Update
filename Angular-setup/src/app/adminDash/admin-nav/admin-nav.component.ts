import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService} from'../../_services/authentication.service'


@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  public profilephoto:string;
  @Input() childMessage: string;
  constructor(public router:Router, private auth:AuthenticationService) { 

    let userInfo= JSON.parse(localStorage.getItem('currentUser'));
    
   this.profilephoto=userInfo.userinfo.profilephoto;

    
  }

  ngOnInit() {
  }
 
  logout(){
    this.auth.logout();
  // localStorage.removeItem('currentUser');
  }

}
