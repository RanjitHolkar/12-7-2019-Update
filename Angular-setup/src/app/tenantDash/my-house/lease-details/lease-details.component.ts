import { Component, OnInit } from '@angular/core';
import {TenantService } from '../../../_services/tenant.service';

@Component({
  selector: 'app-lease-details',
  templateUrl: './lease-details.component.html',
  styleUrls: ['./lease-details.component.css']
})
export class LeaseDetailsComponent implements OnInit {
  lease_data:any;
  constructor(private tenantService:TenantService) { }

  ngOnInit() {
    
  /*########### Show Lease Details PopUp:Start ###########*/
  
    this.tenantService.getleaseDetails().subscribe((data)=>{
      this.lease_data=data;
    });
 /*########### Show Lease Details PopUp:End ###########*/
  }

}
