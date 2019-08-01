import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
@Component({
  selector: 'app-admin-mpesa',
  templateUrl: './admin-mpesa.component.html',
  styleUrls: ['./admin-mpesa.component.css']
})
export class AdminMpesaComponent implements OnInit {
public paymentDetails:any;
  constructor(private _adminService:AdminService) { }

  ngOnInit() {
   this._adminService.getMpesaPayment().subscribe(res=>{
     this.paymentDetails=res;
     console.log(res);
   })

  }

}
