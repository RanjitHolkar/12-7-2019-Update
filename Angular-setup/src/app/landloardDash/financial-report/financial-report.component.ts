import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent implements OnInit {

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
