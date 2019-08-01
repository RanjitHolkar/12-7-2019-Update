import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leases-report',
  templateUrl: './leases-report.component.html',
  styleUrls: ['./leases-report.component.css']
})
export class LeasesReportComponent implements OnInit {
  public addPropertiesDiv:Boolean=false;
  public data : any
  constructor() { }

  ngOnInit() {
  }

  showAddpropertiesDiv(){

      this.addPropertiesDiv=true;

  }
  hideAddpropertiesDiv(){

    this.addPropertiesDiv=false;

}

}
