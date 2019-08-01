import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../_services/tenant.service'
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $ :any;
@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
public serviceAddForm:FormGroup;
public editServiceAddForm:FormGroup;
public Submit:any;
public serviceRequestFile=[];
public unitData:any;
public unit_id:any;
public land_id:any;
public unitName:any;
public serviceRequstData:any;
public editServiceRequestData:any;
public editservice:any;
public property_id:any;


  constructor(private formBuilder:FormBuilder ,private tenantService: TenantService, private toastr:ToastrManager) { }

  ngOnInit() {
    // $('.overlayDivLoader').show();
    this.tenantService.getTenantServiceData().subscribe((data)=>{
      if(data['unit_data'].length !=0)
      {
         this.unitName=data['unit_data'][0]['flatHoseNo'];
        //  this.unit_data=data['unit_data'][0]['id'];
      }
     
      this.serviceRequstData=data['service_request'];
      this.editServiceRequestData=data['service_request'];
      //console.log(data);
      //console.log('dzgv');
    });
    // $('.overlayDivLoader').hide();
    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.unitData=data['unit_data'][0];
    this.unit_id=this.unitData['id'];
    this.land_id=data['landlord_details']['id'];
    this.property_id=data['landlord_details']['property_id'];
    });
    this.serviceAddForm=this.formBuilder.group({
      unit_id:['', Validators.required],
      title:['', Validators.required],
      details:['', Validators.required],
      file:['']
      
    });

    this.editServiceAddForm=this.formBuilder.group({
      unit:['', Validators.required],
      title:['', Validators.required],
      details:['', Validators.required],
      file:['']
    });

  }

  detectTransactionFile(event)
  {
    this.serviceRequestFile=event.target.files;
  }
  sendRequest()
  {
    this.Submit=true;
    if(this.serviceAddForm.valid)
    {
      var  formData = new FormData();
      if(this.serviceRequestFile !=undefined)
      {
        formData.append('selecteFiles',this.serviceRequestFile[0]);
      }
      formData.append('unit_id',this.unit_id);
      formData.append('title',this.serviceAddForm.value.title);
      formData.append('landlord_id',this.land_id);
      formData.append('property_id',this.property_id);
      
      formData.append('description',this.serviceAddForm.value.details);

     // this.serviceAddForm.controls['unit_id'].setValue(this.unit_data);
      this.tenantService.addRequest(formData).subscribe((data)=>{
        this.toastr.successToastr(' Service request sent successfully ','Success!');
        $('#ProfileUpdateModal').modal('hide');
        this.Submit=false;
       this.ngOnInit();
      })
    }
    
  }

  SentServiceRequest()
  {
    $('#ProfileUpdateModal').modal('show');
  }
  get addServiceForm()
  {
    return this.serviceAddForm.controls;
  }
  get editServiceForm()
  {
    return this.editServiceAddForm.controls;
  }
  hideAddRequest()
  {
    $('#ProfileUpdateModal').modal('hide');
    this.serviceAddForm.reset();
  }
  hideEditRequest()
  {
    $('#editServiceRequst').modal('hide');
  }

  editServiceRequest(ind)
  {
    this.editservice=this.editServiceRequestData[ind];
    console.log(this.editservice);
    $('#editServiceRequst').modal('show');
  }

}
