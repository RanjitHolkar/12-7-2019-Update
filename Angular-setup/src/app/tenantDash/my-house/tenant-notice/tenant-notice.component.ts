import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../_services/tenant.service';
import { Url } from '../../../mygloabal';

@Component({
  selector: 'app-tenant-notice',
  templateUrl: './tenant-notice.component.html',
  styleUrls: ['./tenant-notice.component.css']
})
export class TenantNoticeComponent implements OnInit {
  noticeData:any;
  url=Url;
  constructor(private tenant_service:TenantService) { }

  ngOnInit() {
    this.tenant_service.getNotice().subscribe(res=>{
    this.noticeData=res;
    console.log(res);
    });
  }

}
