import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-land-sidebar',
  templateUrl: './land-sidebar.component.html',
  styleUrls: ['./land-sidebar.component.css']
})
export class LandSidebarComponent implements OnInit {
 public activestate:string;
  constructor( private router: Router) 
  { 
    this.activestate = this.router.url;	 
  }

  ngOnInit() {
  }

}
