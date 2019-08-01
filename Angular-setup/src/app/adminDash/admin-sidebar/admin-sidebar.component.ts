import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  public activestate:string;
  constructor( private router: Router) { 

    this.activestate = this.router.url;	
   }

  ngOnInit() {
  }

}
