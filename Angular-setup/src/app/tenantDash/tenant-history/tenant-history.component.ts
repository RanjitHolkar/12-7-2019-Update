import { Component, OnInit } from '@angular/core';
import {TenantService } from '../../_services/tenant.service';

@Component({
  selector: 'app-tenant-history',
  templateUrl: './tenant-history.component.html',
  styleUrls: ['./tenant-history.component.css']
})
export class TenantHistoryComponent implements OnInit {
  transactionData:any;
  constructor( private tenantService:TenantService) { }

  ngOnInit() {

    this.tenantService.getTransactionDetails().subscribe((data)=>{
      this.transactionData=data;
      console.log(data);
    });
  }

}
