import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandlordService } from '../../_services/landlord.service';
import { Url } from '../../mygloabal';
@Component({
  selector: 'app-tenant-nav',
  templateUrl: './tenant-nav.component.html',
  styleUrls: ['./tenant-nav.component.css']
})
export class TenantNavComponent implements OnInit {
 public profilephoto:any;
 url=Url;
 userInfo:any;
 public notification:any;
 
  constructor(private router:Router , public landlord_Service:LandlordService) { 

   this.userInfo= JSON.parse(localStorage.getItem('currentUser'));
   this.profilephoto=this.userInfo.userinfo.profilephoto;

  }

  ngOnInit() {
    this.getNotificationdata();
  }

  
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.router.navigate(['/login']);
}

getNotificationdata()
  {
      this.landlord_Service.getNotification().subscribe((data)=>{
        this.notification=data;
        // console.log(data);
      });
    //  alert(this.userInfo.userinfo.length);
     console.log(this.userInfo.userinfo);
     
      setInterval(()=> {
        this.landlord_Service.getNotification().subscribe((data)=>{
          this.notification=data;
          console.log('tenant');
        })  },2000); 
     
      
  }
  getdata()
  {
    this.landlord_Service.gettransactionData().subscribe((data)=>{
      console.log(data);
    });
  }
}
