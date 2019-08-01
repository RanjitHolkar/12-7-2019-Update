import { Component, OnInit } from '@angular/core';
import {TenantService } from '../../_services/tenant.service';

@Component({
  selector: 'app-tenant-files',
  templateUrl: './tenant-files.component.html',
  styleUrls: ['./tenant-files.component.css']
})
export class TenantFilesComponent implements OnInit {

  constructor(private tenantService:TenantService) { }

  ngOnInit() {
    this.tenantService.getTenantDocumnets().subscribe((data)=>{
      console.log(data);
    })
  }

}
