import { Component, OnInit } from '@angular/core';
import {LandlordService} from '../../_services/landlord.service';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {
  searchLease:FormGroup;
  constructor(private _landlordService:LandlordService,private formBuilder:FormBuilder) { }
  lease_data:any;
  filte_data:any;
  ngOnInit() {
    this.searchLease= this.formBuilder.group({
      'property_id':[],
      'tenant_id':[],
      'status':[],
      'start_date':[],
      'end_date':[]


    });
    
    
this.getsearchLease();

  }
  getsearchLease()
  {
    console.log(this.searchLease.value);
    this._landlordService.getLeaseData(this.searchLease.value).subscribe((data)=>{ 
      console.log(data);
     this.lease_data=data['search_data'];
     this.filte_data=data['filter_data'];
   });
  }

 
}
