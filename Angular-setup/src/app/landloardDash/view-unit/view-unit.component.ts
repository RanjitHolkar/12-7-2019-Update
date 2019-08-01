import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import{UserService}from '../../_services/user.service';
import {LandlordService} from '../../_services/landlord.service';
import {Router} from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { Url} from '../../mygloabal';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { a } from '@angular/core/src/render3';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
declare var $ :any;

@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.css']
})
export class ViewUnitComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public unit_services:UserService, 
    private formBuilder:FormBuilder,
    public toastr:ToastrManager,
    public _landlordService:LandlordService,
    private router:Router) {}
  id:any;
  submitted = false;
  submit=false;
  display_document:any;
  unit_data:any;
  propertyForm:FormGroup;
  description_data:any;
  houseImages:any;
  houseImage:any;
  img_id:any;
  unit_id_data:any;
  document_id:any;
  document_unit_id:any;
  leaseForm:FormGroup;
  editForm:FormGroup;
  addDocumentForm:FormGroup;
  addPropDocumentForm:FormGroup;
  addleasePopup:any;
  unit_id:any;
  unit_id_lease:any;
  AddImage: any = '';
  DvoumentImage:any = '';
  EditPImage:any = '';
  editleasePopup:any;
  editLeaseData:any;
  unitEditId:any;
  modelName:any;
  encript_id:any;
  noRecordsPopup:any;
  image_error:any;
  editPropertiesDiv=false;
  property_data=[];
  countries:any;
  unitType:any;
  property_id:any;
  addUnitPopup:any;
  property_img:any;
  propertyDeatils:any;
  unitService:any;
  url:any;
  unitpopup:any;
  public unitForm:FormGroup;
  addDocumentType:FormGroup;
  addtransactionForm:FormGroup;
  editUnitForm:FormGroup;
  editServiceRequestForm:FormGroup;
  replayMeassge:FormGroup;
  tenantform:FormGroup;
  public HouseFile:string [] = [];
  unitsPopupFiles:any;
  unitTrasactionPopup:any;
  leaseDeatils:any;
  tenantDeatils:any;
  unitFiles:any;
  unitImages:any;
  unitId:any;
  oneUnit_data:any;
  lease_data:any;
  noLeasePopup:any;
  tenant_data:any;
  addDocumentPopup:any;
  dataSubmit:any;
  document_Type:any;
  documentSubmit:any;
  documentPropSubmit:any;
  document_files:any;
  unit_img:any;
  addPropertyDoc:any;
  DocimentPropType:any;
  propertyDoc:any;
  addTransaction:any;
  transactionSubmit:any;
  tenant_type:any;
  editServiceRequest:any;
  editservices_req:any;
  services_data:any;
  chat_message:any;
  requestSubmit:any;
  request_id:any;
  vendors_data:any;
  alertBox:any;
  completeServiceReqdata:any;
  complete_services:any;
  unitSR:any;
  transactionData:any;
  showTenantForm:any;
  existEmailAndphone=false;
  declineServiceReqdata:any;
  pendingServiceReqdata:any;
  decline_services:any;
  ActiveDeactive_value:any;
  unitData:any;
  multiunit=true;
  editUnitPopUp:any;
  dayduties=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  ngOnInit() {
    this.url=Url;
    this.completeServiceReqdata=false;
    this.requestSubmit=false;
    this.unitService=false;
    this.documentSubmit=false;
    this.documentPropSubmit=false;
    this.addDocumentPopup=false;
    this.noLeasePopup=false;
    this.addUnitPopup=false;
    this.noRecordsPopup=false;
    this.modelName='24';
    this.editleasePopup=false;
    this.houseImage=false;
    this.display_document=false;
    this.addleasePopup=false;
    this.image_error=false;
    this.unitsPopupFiles=false;
    this.unitTrasactionPopup=false;
    this.leaseDeatils=false;
    this.tenantDeatils=false;
    this.unitFiles=false;
    this.unitImages=false;
    this.dataSubmit=false;
    this.addPropertyDoc=false;
    this.addTransaction=false;
    this.transactionSubmit=false;
    this.editServiceRequest=false;
    this.declineServiceReqdata=false;
    this.pendingServiceReqdata=true;
    this.route.params.subscribe( params =>{ this.id=params['id']} );
    this.route.params.subscribe( params =>{ this.unitData=params['unitId']} );

    
    
    // $(".overlayDivLoader").css('display','block');
   
   
this.property_id=this.id;

  this.unit_services.getUnitProperties_data(this.id).subscribe((data)=>{ 
    this.property_data=data[0];
    this.property_img=data;
    this.propertyDeatils=true;
    this.unitpopup=true;
    
    console.log(this.editPropertiesDiv);
    console.log(data);
  });
  this.getUnitData();
  this.leaseForm = this.formBuilder.group({
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    rent: ['', Validators.required],
    payment_day: ['', Validators.required],
    payment_frequency: ['', Validators.required],
    deposite_amount: ['', Validators.required],
    tenant_reminder: ['', Validators.required],
    overview_reminder: ['', Validators.required],
 
}); 

this.editServiceRequestForm = this.formBuilder.group({
  title: ['', Validators.required],
  property_Name: ['',],
  tenant_name: ['',],
  start_date: ['',],
  due_date: ['',],
  file: ['',],
  alert_status: ['',],
  status: ['',],
  alert_day: ['',],
  vendor_id: ['', Validators.required],
  priority: ['',],
  description: ['',]

}); 

this.unitForm = this.formBuilder.group({
  flatno: ['', Validators.required],
  unitType: ['', Validators.required],
  FurnishingType: ['', Validators.required],
  flatImage: ['', Validators.required]

}); 
this.editUnitForm = this.formBuilder.group({
  flatHoseNo: ['', Validators.required],
  unitType: ['', Validators.required],
  furnishing: ['', Validators.required]

}); 

this.addtransactionForm  = this.formBuilder.group({
  amount: ['', Validators.required],
  start_period: ['', Validators.required],
  end_period: ['', Validators.required],
  payment_status: ['', Validators.required],
  payment_type: ['', Validators.required],
  payment_date: ['', Validators.required],
  note:['', Validators.required],
  recipt:['', Validators.required],
  unit_id:['', Validators.required]

}); 

this.replayMeassge = this.formBuilder.group({
  message: ['',]

}); 

  this.unit_services.getDorpdownList().subscribe((data)=>{ 
            if(data.msg=='success'){
                this.countries=data.catList.countries;
                this.unitType=data.catList.unit_type;    
            }else{

            }
  });

this.addDocumentForm = this.formBuilder.group({
  document_name:['',Validators.required],
  document_type:['',Validators.required],
  tenant_name:['',Validators.required],
  document_file:['',Validators.required]
});

this.addPropDocumentForm = this.formBuilder.group({
  document_name:['',Validators.required],
  document_type:['',Validators.required],
  document_file:['',Validators.required]
});



  


  this.propertyForm = new FormGroup({
     propertyName: new FormControl(''),
     propertyType: new FormControl(''),
     country: new FormControl(''),
     streetName: new FormControl(''),
     city: new FormControl(''),
     state: new FormControl(''),
     pincode: new FormControl(''),
     landmark: new FormControl(''),
     suburbs:new FormControl(''),
     notes:new FormControl(''),
     phone:new FormControl('')

     
    });
  
    this.tenantform=new FormGroup({
      userName:new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
     });

this.editForm = this.formBuilder.group({
  start_date: ['', Validators.required],
  end_date: ['', Validators.required],
  rent: ['', Validators.required],
  payment_day: ['', Validators.required],
  payment_frequency: ['', Validators.required],
  deposite_amount: ['', Validators.required],
  tenant_reminder: ['', Validators.required],
  overview_reminder: ['', Validators.required],

}); 
this.addDocumentType=  this.formBuilder.group({
  docname: ['', Validators.required],

}); 
   }

getUnitData()
{
  this.unit_services.getUnit_data(this.id).subscribe((data)=>{ 
    this.unit_data=data;
    console.log('unit Data',this.unit_data);
    if(data.length==0)
    {
      this.noRecordsPopup=true;
    }else{
      this.noRecordsPopup=false;
      // this.propertyName=data[0]['propertyName'];
    }
    if(this.unitData != undefined)
    {
     this.unitId=this.unitData;
     this.showUnitDetils(this.unitId);
    }
  });
   
}

display_document_data(unit_id){
  $(".overlayDivLoader").css('display','block');
  if(unit_id !='')
  {
    this.document_unit_id=unit_id;
  }
  this.unit_services.getDoument(this.document_unit_id).subscribe((data)=>{ 
    this.description_data=data;
    if(data.length == 0)
    {
      this.noRecordsPopup=true;
    }else{
      this.noRecordsPopup=false;
    }
    $(".overlayDivLoader").css('display','none');
    console.log(this.description_data);
    this.display_document=true;
  });

  }
  hide_documentlistpopup()
  {
    this.display_document=false;
    this.ngOnInit();

  }
  display_homeImages(unit_id)
  {
    
    $(".overlayDivLoader").css('display','block');
    if(unit_id != '')
  {
  this.unit_id_data=unit_id;
  }
    this.unit_services.getHomeImages(this.unit_id_data).subscribe((data)=>{ 
     console.log(data);
     if(data.length == 0)
     {
      this.noRecordsPopup=true;
     }else{
      this.noRecordsPopup=false;
     }
     this.houseImages=data;
     this.houseImage=true;
     $(".overlayDivLoader").css('display','none');
    });
  }

  ActiveDeactiveUnit(unit_id,value)
  {
    this.unit_id=unit_id;
    this.ActiveDeactive_value=value;
    $('#ActiveDeactive').modal('show');
    //console.log(unit_id);
    //console.log()
   
  }

  activeDeactiveConfirm()
  {
    var data={unit_id:this.unit_id,value:this.ActiveDeactive_value};
    this.unit_services.activeDeactiveUnit(data).subscribe((data)=>{
      if(this.ActiveDeactive_value==0)
      {
        this.toastr.successToastr('Unit Active Successfully ', 'Success!');
      }else{
        this.toastr.successToastr('Unit Deactive Successfully ', 'Success!');
      }
      this.showUnitDetils(this.unitId);
    $('#ActiveDeactive').modal('hide');

      
    })
  }
  hideActiveDeactiveModal()
  {
    this.showUnitDetils(this.unitId);
  }
  completedServiceReq(status)
  {
    if(status == 1)
    {  
      this.pendingServiceReqdata=false;
      this.declineServiceReqdata=false;
      this.completeServiceReqdata=true;
    }
    if(status == 0)
    {
      this.completeServiceReqdata=false
      this.declineServiceReqdata=false;
      this.pendingServiceReqdata=true;
    }
    if(status == 2)
    {
      this.completeServiceReqdata=false;
      this.pendingServiceReqdata=false;
      this.declineServiceReqdata=true;
    }
   
  }

  hide_houseImagePopup()
  {
    this.houseImage=false;
    this.ngOnInit();
  }
  editImage(id)
  {
    this.img_id=id;
    $('#Edit_img_Modal').modal('show');
  }
  deleteImage(id)
  {
    this.img_id=id;
    $('#myModal').modal('show'); 
  }
  deleteconfirm_image()
  {
    this.unit_services.delete_imageHome(this.img_id).subscribe((data)=>{ 
      if(data==1)
      {
        this.display_homeImages('');
        $('#myModal').modal('hide');
      }
       
     });
  }
  hideEditServicePop()
  {
    this.editServiceRequest=false;
    this.editServiceRequestForm.reset();
    this.requestSubmit=false;
  }
  get editRequestForm(){
    return this.editServiceRequestForm.controls;
  }
  fileChangeEvent(event){
    this.image_error=false;
    this.AddImage=event.target.files;
  }
  detectDocumentFile(event)
  {
    this.DvoumentImage=event.target.files;
  }
  
  houseFileget(event)
  {
    this.image_error=false;
    this.EditPImage=event.target.files;
  }
  unitsFilesPopup()
  {
    $(".overlayDivLoader").css('display','block');
    this.unit_services.get_propDoc_details(this.id).subscribe((data)=>{ 
     this.propertyDoc=data;
       
     });
    this.unitsPopupFiles=true;
    this.unitpopup=false;
    this.unitTrasactionPopup=false;
    $(".overlayDivLoader").css('display','none');
  }
  unitsTransactionPopup()
  {
    $(".overlayDivLoader").css('display','block');
    this.unit_services.get_prop_transaction(this.id).subscribe((data)=>{ 
    this.transactionData=data;
        
      });
    this.unitsPopupFiles=false;
    this.unitpopup=false;
    this.unitTrasactionPopup=true;
    $(".overlayDivLoader").css('display','none');
  }
  unitPopup()
  {
    this.unitsPopupFiles=false;
    this.unitpopup=true;
    this.unitTrasactionPopup=false;
  }
  editProertyImage(img_id)
  {
    this.img_id=img_id;
   $('#Edit_Pimg_Modal').modal('show');
  }

  showUnitDetils(unitId)
  {
   this.propertyDeatils=false;
    $(".overlayDivLoader").css('display','block');
    this.unitId = unitId;
    this.unit_id_lease=unitId;
  
    this.unit_services.getOneUnit_data(this.unitId).subscribe((data)=>{ 
      this.oneUnit_data=data['unit_data'];
      this.lease_data=data['lease_data'];
      if(this.lease_data.length==0)
      {
        this.noLeasePopup=true;
      }
      console.log(this.oneUnit_data);
      console.log(this.lease_data);
    });
    this.leaseDeatils=true;
    this.unitImages=false;
    this.unitFiles=false;
    this.tenantDeatils=false;
    this.unitService=false;
    this.propertyDeatils=false;
    
    $(".overlayDivLoader").css('display','none');
    if(this.unitData != undefined)
    {
     this.unitServicePopup();
    }
  }
  link_tenant(tenant_id)
  {
    var alldata={'tenant_id':tenant_id,'unit_id':this.unitId};
    this.unit_services.linkTenant(alldata).subscribe((data)=>{ 
       this.tenantDeatilsPopup();
     console.log(data);
      
    });
      
  }
  addPropertyDocument()
  { 
    this.unit_services.getPropertyDocType('').subscribe((data)=>{ 
     this.DocimentPropType=data;  
    });
    this.addPropertyDoc=true;
   
  }

  // function for delete Property Show Modal
  deleteProperty()
  {
    $('#propertyModal').modal('show');
  }

  // function for delete property
  deleteConfirmProperty()
  {
    this.unit_services.deleteProperty({'PropertyId':this.property_id}).subscribe((data)=>{
      this.toastr.successToastr('property Delete Successfully ', 'Success!');
      $('#propertyModal').modal('hide');
      $('.modal-backdrop').removeClass("modal-backdrop");   
      this.router.navigate(['/add-properties']);
     });
  }


  addtransaction()
  {
    this.router.navigate(['/all-transactions',this.id]);
  }

  addPropertyDocumentsave()
  { 
    this.dataSubmit = true;
    if(this.addDocumentType.valid)
    {
      this.unit_services.addPropDcoumentType(this.addDocumentType.value).subscribe((data)=>{ 
       if(data == 1)
       {
         $('#documentTypePropModel').modal('hide');
         this.toastr.successToastr('Document Type added successfully ', 'Success!');
         this.addPropertyDocument();
       }
        
      });
    }
  }
  /**************************************Add Tenant Section:START *************************/
  add_tenant()
  {
    this.showTenantForm=true;
   
  }

  addTenant()
  {
    let res=this.tenantform.value;

    this.tenantform=new FormGroup({
      userName:new FormControl(res.userName,[Validators.required]),
      email: new FormControl(res.email,[Validators.required,Validators.email]),
      phone: new FormControl(res.phone,[Validators.required]),
     });

     if(this.tenantform.valid){
      $(".overlayDivLoader").show();
     
       this._landlordService.addTenant(res).subscribe((data)=>{
       
          if(data.msg=='success')
          {
            this.toastr.successToastr('Tenant added successfully ', 'Success!');
            this.existEmailAndphone=false;
            this.showTenantForm=false;
            $(".overlayDivLoader").hide();
            this.tenantDeatilsPopup();
            
          }else{
            $(".overlayDivLoader").hide();
            this.showTenantForm=true;
            this.existEmailAndphone=true;
          }
         
        console.log(data)
     })
     }
  }
  /**************************************Add Tenant Section:START *************************/
  AddNewDocument()
  {
    this.documentSubmit=true;
    console.log(this.addDocumentForm.value);
    if(this.addDocumentForm.valid)
    {
      $(".overlayDivLoader").css('display','block');
      var  formData = new FormData();
      formData.append('selectFile',this.DvoumentImage[0]);
      formData.append('unit_id',this.unitId);
      formData.append('tenant_id',this.addDocumentForm.value.tenant_name);
      formData.append('property_id',this.id);
      formData.append('document_name',this.addDocumentForm.value.document_name);
      formData.append('type',this.addDocumentForm.value.document_type);
      this.unit_services.addNewDocument(formData).subscribe((data)=>{ 
        console.log(data);
        this.toastr.successToastr('Document added successfully ', 'Success!');
       this.unitFilesPopup();
       this.addDocumentPopup=false;
       this.documentSubmit=false;
       this.addDocumentForm.reset();
       $(".overlayDivLoader").css('display','none');
       });
    }
  }
  saveEditRequest()
  {
    this.requestSubmit=true;
    if(this.editServiceRequestForm.valid)
    {
      $(".overlayDivLoader").css('display','block');
      var alldata={'request_id':this.request_id,'data':this.editServiceRequestForm.value}
      this.unit_services.saveEditRequst(alldata).subscribe((data)=>{ 
        this.toastr.successToastr('Service Request Update successfully ', 'Success!');
        this.editServiceRequest=false;
        this.editServiceRequestForm.reset();
        this.unitServicePopup();
        $(".overlayDivLoader").css('display','none');

       });
    }
  //console.log(this.editServiceRequestForm.value);
  }

  deleteDocument(document_id)
  {
    $('#myModal').modal('show');
  }

  alertMeBox(status)
  {
    if(status == 0)
    {
      this.alertBox=false;
    }else{
      this.alertBox=true;
    }
  }

  numberOnly(event): boolean {
    return this.unit_services.numberOnly(event);
  }
  
  remove_tenant(tenant_id)
  {
    this.unit_services.removeTenant(tenant_id).subscribe((data)=>{ 
     console.log(data);
     this.tenantDeatilsPopup(); 
    });
  }

  tenantDeatilsPopup()
  {
    this.unit_services.getTenantDetails(this.unitId).subscribe((data)=>{ 
      
     this.tenant_data=data;
     console.log(this.tenant_data);
    
      
    });
    this.leaseDeatils=false;
    this.unitImages=false;
    this.unitFiles=false;
    this.tenantDeatils=true;
    this.unitService=false;
  }
  unitFilesPopup()
  {
    var alldata={'unit_id':this.unitId};
    this.unit_services.getDocumentDetails(alldata).subscribe((data)=>{ 
      this.document_files=data;
    });
    this.leaseDeatils=false;
    this.unitImages=false;
    this.unitFiles=true;
    this.tenantDeatils=false;
    this.unitService=false;
  }
  unitPicturesPopup()
  {
    var alldata={'unit_id':this.unitId};
    this.unit_services.getUnitImages(alldata).subscribe((data)=>{ 
     this.unit_img=data;
    });
    this.leaseDeatils=false;
    this.unitImages=true;
    this.unitFiles=false;
    this.tenantDeatils=false;
    this.unitService=false;
  }
  unitServicePopup()
  {
   
    $(".overlayDivLoader").css('display','block');
    var alldata={'unit_id':this.unitId};
    this.unit_services.getUnitServices(alldata).subscribe((data)=>{ 
     this.services_data=data['pending'];
     this.complete_services=data['completed'];
     this.decline_services=data['decline'];
     console.log(data);
    });
    this.leaseDeatils=false;
    this.unitImages=false;
    this.unitFiles=false;
    this.tenantDeatils=false;
    this.unitService=true;
    $(".overlayDivLoader").css('display','none');

  }

  leaseDeatilsPopup()
  {
    this.unitId;
    this.leaseDeatils=true;
    this.unitImages=false;
    this.unitFiles=false;
    this.tenantDeatils=false;
    this.unitService=false;
  }
  unitDeatilsHide()
  {
    this.ngOnInit();
    // this.propertyDeatils=true;

  }
  showaddDocumentTypePop()
  {
    $('#documentTypeModel').modal('show');
  }
  add_new_img()
  {
    $('#add_img_modal').modal('show');
  }

  editService(id,unit_id)
  {
    this.request_id=id;
    this.unitSR=unit_id;
    var data={'id':id,'unit_id':unit_id};
    this.editServiceRequest=true;
    this.unit_services.getUnitServiceData(data).subscribe((data)=>{ 
      this.editservices_req=data['services_data'];
      this.chat_message=data['chat_data'];
      this.complete_services=data['complete_services'];
      this.vendors_data=data['vendor'];
      console.log(data);
     });
    
  }
  
 Add_unit_Image(){
   if(this.AddImage)
  {
  var  formData = new FormData();
     formData.append('selectFile',this.AddImage[0]);
     formData.append('id',this.unitId);
    console.log(formData);

    this.unit_services.AddHouseImg(formData).subscribe((data)=>{ 
     if(data==1)
     {
      this.unitPicturesPopup();
      $('#add_img_modal').modal('hide');
      // $('#Edit_img_Modal').modal('hide');
      // $('#selectFile').val('');
      // this.display_homeImages('');
      // this.AddImage='';

     }
     });
  }else{
   this.image_error=true;
  }

  }

  sendReplay(event:any)
  {
    var alldata={'unit_id':this.request_id,'message':this.replayMeassge.value.message};
    this.unit_services.sendLandReq(alldata).subscribe((data)=>{ 
      console.log(data);
      $('#myModalComment').modal('hide');
      this.editService(this.request_id,this.unitSR);
      
      
      });
    

  }

  addNewUnitShowPopup()
  {
    this.propertyDeatils=false;
    this.addUnitPopup=true;
  }
  addNewUnit()
 {
  this.submitted = true;
  if(this.unitForm.valid){
    var  fromData = new FormData();
    for (var i = 0; i < this.HouseFile.length; i++) 
    { 
      fromData.append("houseImage[]",this.HouseFile[i]);
    }
      fromData.append('flatno',this.unitForm.value['flatno']);
      fromData.append('unitType',this.unitForm.value['unitType']);
      fromData.append('FurnishingType',this.unitForm.value['FurnishingType']);
      fromData.append('proprtyId',this.property_id);
   
    
    this.unit_services.insert_unitData(fromData).subscribe((data)=>{ 
     console.log(data);
     this.toastr.successToastr('Unit added successfully ', 'Success!');
      this.addUnitPopup=false;
      this.ngOnInit();
      this.submitted = false;
      
      
    });

  }else{
   return false;
  }
}
// function for Edit Unit Details popup show

editUnitDeatils(id,index)
{
  this.unit_id = id;
  this.editUnitPopUp = true;
  this.editUnitForm.setValue({
    flatHoseNo : this.unit_data[index].flatHoseNo,
    unitType : this.unit_data[index].unitType,
    furnishing : this.unit_data[index].furnishing
  })
 
}
// function for edit Form Error 
get editFormerr()
{
  return this.editUnitForm.controls;
}
// function for Edit Unit Details
saveEditUnit()
{
  this.submitted = true;
  if(this.editUnitForm.valid)
  {
    this.unit_services.saveEditUnit({'data':this.editUnitForm.value,'id':this.unit_id}).subscribe((res)=>{ 
      this.editUnitPopUp = false;
      this.submitted = false;
      this.toastr.successToastr('Unit Details Updated successfully ', 'Success!');
      this.ngOnInit(); 
      });
  }
  
}
addPropDocument()
{
  this.documentPropSubmit=true;
  if(this.addPropDocumentForm.valid)
  {
    var  formData = new FormData();
      formData.append('selectFile',this.DvoumentImage[0]);
      formData.append('property_id',this.id);
      formData.append('document_name',this.addPropDocumentForm.value.document_name);
      formData.append('type',this.addPropDocumentForm.value.document_type);
    this.unit_services.savePropDoc(formData).subscribe((data)=>{ 
     if(data == 1)
     {
         this.toastr.successToastr('property document added successfully ', 'Success!');
         this.documentPropSubmit=false;
         this.addPropertyDoc=false;
         this.unitsFilesPopup();
         this.addPropDocumentForm.reset();
     }
     
       
       
     });
  }
}
addPropDocumentSave()
{

}
hidepropPopUp()
{
  this.documentPropSubmit=false;
  this.addPropertyDoc=false;
  this.addPropDocumentForm.reset();
}
showaddDocumentTypePropPop()
{
  $('#documentTypePropModel').modal('show');
}
/* Edit Property Details Popup Show:Start */
  editProperty()
  {
    this.editPropertiesDiv = true
  }

/* Edit Property Details Popup Show:ENd */
  get formError() 
  {
     return this.leaseForm.controls; 
  }
  get f()
  {
    return this.editForm.controls;
  }
get documentForm()
{
  return this.addDocumentType.controls;
}
get documentsaveForm()
{
  return this.addDocumentForm.controls;
}
get saveTransactionForm()
{
  return this.addtransactionForm.controls;
}
get documentPropsaveForm()
{
  return this.addPropDocumentForm.controls;
}
  /* Delete Document Data PopUp show :start */
  delete_document(id)
  {
    this.document_id=id;
    $('#document_model').modal('show');
  }
  delete_document_prp(id)
  {
    $('#document_model_prop').modal('show');
    this.document_id=id;
  }
  /* Delete Document Data PopUp show :stop */

  // Edit Property Image:start
  Upload_PEditImage()
  {
    if(this.EditPImage !='')
    {
      $('#Edit_Pimg_Modal').modal('hide');
      console.log(this.EditPImage);
      var  fromData = new FormData();
      
        fromData.append("property_id",this.img_id);
        fromData.append("select_file",this.EditPImage[0]);
        this.unit_services.EditPropertyImage(fromData).subscribe((data)=>{ 
          this.toastr.successToastr('Image update successfully ', 'Success!');
          console.log(data);
          this.ngOnInit();
         });
      
    }else{
      this.image_error=true;
    }
  }
  // Edit Property Image:End

  // function for Delete Unit Details show confirmation Popup
  deleteUnitDetails(unitId)
  {
    this.unit_id = unitId;
    $('#unitModal').modal('show');
  }

  // function for confirm Delete unit
  unitConfirmDelete()
  {
    this.unit_services.unitConfirmDelete({unitId:this.unit_id}).subscribe((data)=>{ 
      $('#unitModal').modal('hide');
      this.ngOnInit();
     });
  }
  deleteconfirm_document()
  {
    this.unit_services.delete_document(this.document_id).subscribe((data)=>{ 
      if(data==1)
      {
        $('#document_model').modal('hide');
        this.unitFilesPopup();
      }
       
     });
  }

  deleteconfirm_document_pro()
  {
    this.unit_services.delete_document(this.document_id).subscribe((data)=>{ 
      if(data==1)
      {
        $('#document_model_prop').modal('hide');
        this.unitsFilesPopup();
       
      }
       
     });
  }

  addTransactionSave()
  {
    this.transactionSubmit=true;
    if(this.addtransactionForm.valid)
    {
      alert('valid');
    }else{
      alert('not Valid');
    }
    console.log(this.addtransactionForm.value);
  }

  removeUnitImg(img_id)
  {
    this.unit_services.removeunitImage(img_id).subscribe((data)=>{ 
      console.log(data);
     this.unitPicturesPopup();
       
     });
  }
  get formerr() 
  {
    return this.unitForm.controls; 
  }
  add_lease()
  { 
    this.addleasePopup=true;
  }

  hide_addleasePopup()
  {
    this.addleasePopup=false;
    this.ngOnInit();
  }

 add_unit()
 {
  this.addUnitPopup=true;
 }

 hide_addUnitPopup()
 {
  this.addUnitPopup=false;
  this.ngOnInit();
 }

 addDocumentPopupshow()
 {
  this.unit_services.getDocumentType(this.unitId).subscribe((data)=>{ 
   this.document_Type=data['document_type'];
   this.tenant_type=data['tenant_name'];
   console.log(data);
         
       });
   this.propertyDeatils=false;
  this.addDocumentPopup=true;
 }

 hidePopUP()
 {
  this.addDocumentPopup=false;;
 }
 detectFiles(event:any)
 {
    for (var i = 0; i < event.target.files.length; i++) { 
    this.HouseFile.push(event.target.files[i]);
    }
 }

addDocumentSave()
{
  this.dataSubmit=true;
  if(this.addDocumentType.valid)
  {
    
    this.unit_services.saveDocumentType(this.addDocumentType.value).subscribe((data)=>{ 
      if(data == true)
      {
        this.addDocumentType.reset();
        $('#documentTypeModel').modal('hide');
        this.toastr.successToastr('Document Type Added successfully ', 'Success!');
        this.addDocumentPopupshow();
        this.dataSubmit=false;
      }
      console.log(data);
           
         });
  }

}

hideaddDocType()
{
  $('#documentTypeModel').modal('hide');
}

addNewLease(){
    this.submitted = true;
    if(this.leaseForm.valid)
    {
      
    $(".overlayDivLoader").css('display','block');
     var alldata={'alldata':this.leaseForm.value,'unit_id':this.unit_id_lease};
      this.unit_services.insert_lease(alldata).subscribe((data)=>{ 
    if(data==true)
    {
      this.addleasePopup=false;
      this.toastr.successToastr('Unit Leaves added successfully ', 'Success!');
      this.submitted = false;
      this.showUnitDetils(this.unitId);
    }
     
    $(".overlayDivLoader").css('display','none');    
       });
      // console.log(this.leaseForm.value);


    }
    
  }
 
  edit_lease(id)
  {
    this.editleasePopup = true;
  }
  updateLease()
  {
    this.submit=true;
    if(this.editForm.valid)
    {
      $(".overlayDivLoader").css('display','block');
      var alleditdata={'alldata':this.editForm.value,id:this.unit_id_lease};
      this.unit_services.saveEditdata(alleditdata).subscribe((data)=>{ 
        if(data == true)
        {
          this.toastr.successToastr('Unit Leaves update successfully ', 'Success!');
          this.editleasePopup=false;
          this.submit=false;
          this.showUnitDetils(this.unitId);
          
        }
        $(".overlayDivLoader").css('display','none');
       
             
           });
    }
  }
  editProperties()
 {
  let res= this.propertyForm.value;
  this.propertyForm = new FormGroup({
    propertyName: new FormControl(res.propertyName,[Validators.required]),
    propertyType: new FormControl(res.propertyType,[Validators.required]),
    country: new FormControl(res.country,[Validators.required]),
    streetName: new FormControl(res.streetName,[Validators.required]),
    city: new FormControl(res.city,[Validators.required]),
    state: new FormControl(res.state,[Validators.required]),
    pincode: new FormControl(res.pincode,[Validators.required]),
    landmark: new FormControl(res.landmark,[Validators.required]),
    suburbs:new FormControl(res.suburbs,[Validators.required]),
    notes:new FormControl(res.notes,[Validators.required]),
    phone:new FormControl(res.notes,[Validators.required])

  
  });
  if(this.propertyForm.valid)
  {
    $(".overlayDivLoader").show();
    var alldata={'property_id':this.property_id,'res':res};
    this.unit_services.editProperties(alldata).subscribe((data)=>{
      console.log(data);
        if(data== true){
          this.toastr.successToastr('property update successfully ', 'Success!');

        }
            $(".overlayDivLoader").hide();
          // this.getPropertyCrByLand();
          this.editPropertiesDiv=false;        
    });

  }
}
hideEditpropertiesDiv()
{
  this.editPropertiesDiv = false;
  this.ngOnInit();
}

}
