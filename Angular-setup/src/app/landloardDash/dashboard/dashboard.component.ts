import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public unitDetails:any;
public paymentList:any;
public latePayment:any;


  constructor(private _dashboardService:DashboardService) { }

  ngOnInit() {
    this._dashboardService.getDashboardData().subscribe(res=>{
      console.log(res);
      this.unitDetails = res.unitDetails;
      this.paymentList = res.paymentList;
      this.latePayment = res.latePayment;

    })
  }

}
