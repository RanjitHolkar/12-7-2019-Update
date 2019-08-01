import { Component, OnInit } from '@angular/core';
import {TenantService } from '../../../_services/tenant.service';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Url } from '../../../mygloabal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'rxjs';
import * as jspdf from 'jspdf';  
import {ActivatedRoute} from "@angular/router";

import html2canvas from 'html2canvas'; 
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-house-nav',
  templateUrl: './my-house-nav.component.html',
  styleUrls: ['./my-house-nav.component.css']
})

export class MyHouseNavComponent implements OnInit {
  public in_progress_payment:any;
  public transactionHistory:any;
  public unitData:any;
  public unit_id:any;
  public landDetails:any;
  public land_id:any;
  public tenantPrfilePhoto:any;
  constructor(private tenantService:TenantService) { }

  ngOnInit() {
    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.in_progress_payment=data['in_progress_payment'];
    this.transactionHistory=data['transaction_data'];
    this.unitData=data['unit_data'][0];
    this.unit_id=this.unitData['id'];
    this.landDetails=data['landlord_details'];
    this.land_id=this.landDetails['id'];
    this.tenantPrfilePhoto=this.unitData['profilephoto'];
    });
  }

}
