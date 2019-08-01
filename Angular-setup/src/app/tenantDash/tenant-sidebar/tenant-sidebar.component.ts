import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';
@Component({
  selector: 'app-tenant-sidebar',
  templateUrl: './tenant-sidebar.component.html',
  styleUrls: ['./tenant-sidebar.component.css']
})
export class TenantSidebarComponent implements OnInit {
 public activestate:string;
 public userInfo:any;
 public status:any;
  constructor(private router:Router ) { 
    this.activestate = this.router.url;	
 }

  ngOnInit() {
    this.userInfo=JSON.parse(localStorage.getItem('currentUser'));
     this.status=this.userInfo['userinfo']['onLease'];
     
  }

}
