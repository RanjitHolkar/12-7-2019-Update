import { Component, OnInit } from '@angular/core';
import { LandlordService } from '../../_services/landlord.service'

@Component({
  selector: 'app-notification-landloard',
  templateUrl: './notification-landloard.component.html',
  styleUrls: ['./notification-landloard.component.css']
})
export class NotificationLandloardComponent implements OnInit {
  notification:any;
  constructor(private landlordService:LandlordService) { }

  ngOnInit() {

        this.landlordService.getAllNotification().subscribe((data)=>{
          this.notification=data;
          console.log(data);
        });

        // setInterval(()=> {
        //   this.landlordService.getNotification().subscribe((data)=>{
        //     this.notification=data;
        //     console.log(data);
        //   }) ; },4000); 
  }

}
