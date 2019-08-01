import { Component, OnInit } from '@angular/core';
import {LandlordService} from '../../_services/landlord.service';

import {FormGroup,FormControl, Validators} from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {ActivatedRoute} from "@angular/router";
declare var $ :any;
@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent implements OnInit {
 
  public tenantform:FormGroup;
  public existEmailAndphone=false;
  public showTenantForm=false;
  public tenantList:any;
  public unit_id:any;
  public onlink=false;
  public removeTenant_id:any;
  public formSubmit=false;
  public editTenantForm:any;
  public flatHouseNo:any;
  public tenantData:any;
  public editTenantId:any;
  public noRecordsPopup:any;
  constructor(private route:ActivatedRoute,  private _landlordService:LandlordService, private _userServies:UserService,public toastr: ToastrManager) { 

    this.createTenantForm();
    this.getTenantListCrByLand();
  }

  ngOnInit() {
    this.noRecordsPopup=false;
    this.editTenantForm=false;
    this.route.params.subscribe( params =>{ this.unit_id=atob(params['id']||'')} );
    if(this.unit_id !='')
    {
      this._landlordService.get_unit_data(this.unit_id).subscribe((data)=>{ 
        this.flatHouseNo=data[0]['flatHoseNo'];
               
     });
      this.onlink=true;
    }
    console.log(this.unit_id);
   
  }
  
  createTenantForm(){
     this.tenantform=new FormGroup({
      userName:new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
     });

  }



  getTenantListCrByLand(){
    this._landlordService.getTenantListCrByLand().subscribe((data)=>{ 
       console.log(data);
              if(data.msg=='success'){
                 this.tenantList=data.tenantList;
                  if(data.tenantList.length == 0)
                  {
                    this.noRecordsPopup=true;
                  }else{
                    this.noRecordsPopup=false;
                  }
              }else{

              }
    });

  }
  addTenantDiv(){
        
    this.showTenantForm=true;

  }

  // hideAddUsersDiv(){
  //     this.showTenantForm=false;
  //     this.ngOnInit();
  // }

  addTenant(){
      
    let res=this.tenantform.value;
    this.tenantform=new FormGroup({
      userName:new FormControl(res.userName,[Validators.required]),
      email: new FormControl(res.email,[Validators.required,Validators.email]),
      phone: new FormControl(res.phone,[Validators.required]),
     });

     if(this.tenantform.valid){
        $(".overlayDivLoader").show();
        this.formSubmit=true;
        this._landlordService.addTenant(res).subscribe((data)=>{
        this.formSubmit=false;
          if(data.msg=='success')
          {
            this.toastr.successToastr('Tenant added successfully ', 'Success!');
            this.existEmailAndphone=false;
            this.showTenantForm=false;
            $(".overlayDivLoader").hide();
            this.getTenantListCrByLand();
            this.ngOnInit();
          }else{
            $(".overlayDivLoader").hide();
            this.showTenantForm=true;
            this.existEmailAndphone=true;
          }
         
        console.log(data)
     })

     }else{

       }
            

  }

  
  


   numberOnly(event): boolean {
       return this._userServies.numberOnly(event);
    }

    linkTenant(id)
    {
      this.editTenantId=id;
      $('#myAddModel').modal('show');
     
    }
    addTeantsConfiramtion()
    {
      $('#myAddModel').modal('hide');
      var alldata={'unit_id':this.unit_id,'tenant_id':this.editTenantId};
      this._landlordService.linkTeants(alldata).subscribe((data)=>{ 
       if(data == true)
       {
        this.toastr.successToastr('Link Tenant successfully ', 'Success!');
        this.ngOnInit();
        this.getTenantListCrByLand();
       }
              
     });
    }
    removelinkTenant(id)
    {
      $('#myModal').modal('show');
      this.removeTenant_id=id;
    }
    removeConfiramtion()
    {
      this._landlordService.removelinkTeants(this.removeTenant_id).subscribe((data)=>{
        console.log(data); 
        if(data == true)
        {
         this.toastr.successToastr('Remove Tenant successfully ', 'Success!');
         this.ngOnInit();
         $('#myModal').modal('hide');
         this.getTenantListCrByLand();
        }
               
      });
    }
    hideAddTenantDiv()
    {
      this.showTenantForm=false;
      this.ngOnInit();
    }

    editTenant(id)
    {
      
     this.editTenantId=id;
      this._landlordService.get_tenant_data(this.editTenantId).subscribe((data)=>{ 
     this.tenantData=data;
               
     });
      this.editTenantForm=true;

    }
    deleteTenant(id)
    {
      this.editTenantId=id;
      $('#myDeleteModel').modal('show');
      
    }

    editTenantsave()
    {
      let res=this.tenantform.value;

      this.tenantform=new FormGroup({
      userName:new FormControl(res.userName,[Validators.required]),
      email: new FormControl(res.email,[Validators.required,Validators.email]),
      phone: new FormControl(res.phone,[Validators.required]),
     });
     if(this.tenantform.valid)
     {
        $(".overlayDivLoader").show();
        var alldata={'data':this.tenantform.value,'id':this.editTenantId};
      this._landlordService.save_editTenantData(alldata).subscribe((data)=>{ 
        console.log(data);
        if(data == 1)
        {
          
          this.toastr.successToastr('Tenant Update successfully ', 'Success!');
          this.existEmailAndphone=false;
          this.editTenantForm=false;
          $(".overlayDivLoader").hide();
          this.getTenantListCrByLand();
          this.ngOnInit();
        }else{
          $(".overlayDivLoader").hide();
          this.editTenantForm=true;
          this.existEmailAndphone=true;
        }
                   
         });
        }
     
    }
    deleteTeantsConfiramtion()
    {
      this._landlordService.deleteTenant_data(this.editTenantId).subscribe((data)=>{ 
        if(data == 1)
        {
          this.toastr.successToastr('Tenant Delete successfully ', 'Success!');
          $('#myDeleteModel').modal('hide');
          this.getTenantListCrByLand();
        }
                  
        });
    }



    

}
