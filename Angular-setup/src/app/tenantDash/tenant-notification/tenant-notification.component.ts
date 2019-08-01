import { Component, OnInit } from '@angular/core';
import { TenantService} from '../../_services/tenant.service';
@Component({
  selector: 'app-tenant-notification',
  templateUrl: './tenant-notification.component.html',
  styleUrls: ['./tenant-notification.component.css']
})
export class TenantNotificationComponent implements OnInit {
  notification:any;
  constructor(private tenantService:TenantService) { }

  ngOnInit() {
    this.tenantService.getAllNotification().subscribe((data)=>{
      this.notification=data;
      console.log(data);
    });
    
  }

}
