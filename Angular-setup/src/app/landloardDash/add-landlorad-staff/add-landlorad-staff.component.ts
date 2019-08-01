import { Component, OnInit } from '@angular/core';

import {FormControl,FormGroup,Validator, Validators} from '@angular/forms';
import { from } from 'rxjs';
import {LandlordService } from '../../_services/landlord.service';
import {UserService} from '../../_services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $ :any

@Component({
  selector: 'app-add-landlorad-staff',
  templateUrl: './add-landlorad-staff.component.html',
  styleUrls: ['./add-landlorad-staff.component.css']
})
export class AddLandloradStaffComponent implements OnInit {

  public land_staff:FormGroup;
  public land_staff_edit:FormGroup;
  public staffList:any;
  public staff_id:any;
  public stafe_data:any;
 
  constructor( public _landlordService: LandlordService,public toastr: ToastrManager, private userService:UserService) { 

    this.staff_form_obj();
    this.edit_staff_form_obj();
    this.getLandStaff();
  }
 staff_form_obj(){
  this.land_staff= new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    phone :new FormControl(),
    user_type: new FormControl(),
   });
  

 }
 edit_staff_form_obj(){
  this.land_staff_edit= new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    phone :new FormControl(),
    user_type: new FormControl(),
   });
  }


  ngOnInit() {
  }

getLandStaff(){
 this._landlordService.getStaffCrByLand().subscribe((data)=>{


     if (data.msg=='success'){
         this.staffList=data.staffList;
         console.log(this.staffList);
     }
 });


}

 addStaff(){
      let res=this.land_staff.value;
      this.land_staff= new FormGroup({
        userName: new FormControl(res.userName,[Validators.required]),
        email: new FormControl(res.email,[Validators.required,Validators.email]),
        phone :new FormControl(res.phone,[Validators.required]),
        user_type: new FormControl(res.user_type,[Validators.required]),
      });

        if(this.land_staff.valid){
              this._landlordService.addLandlordStaff(res).subscribe( (data)=>{
                        if(data.msg=='success'){
                          this.toastr.successToastr('Staff added successfully ', 'Success!');
                          $("#addStaffModal").modal('hide');
                          this.getLandStaff();
                        }
                  },
                (error)=>{
                  console.log(error);
                }
                  
                  )
          
        }
  
 }


 numberOnly(event): boolean {
  return this.userService.numberOnly(event);
}



editUsersInfo(id){
  this.staff_id=id;
  this._landlordService.getLandlordStaff_data(id).subscribe( (data)=>{
   this.stafe_data=data;
   $("#editStaffModal").modal('show');
   

  });

 }
 saveEditStaff()
 {
  let res=this.land_staff_edit.value;
  this.land_staff_edit= new FormGroup({
    userName: new FormControl(res.userName,[Validators.required]),
    email: new FormControl(res.email,[Validators.required,Validators.email]),
    phone :new FormControl(res.phone,[Validators.required]),
    user_type: new FormControl(res.user_type,[Validators.required]),
  });
  if(this.land_staff_edit.valid)
  {
    var alldata={'staff_id':this.staff_id,'data':this.land_staff_edit.value};
    this._landlordService.saveLandlordStaff_data(alldata).subscribe( (data)=>{
      if(data == true)
      {
          this.toastr.successToastr('User Update successfully ', 'Success!');
          $("#editStaffModal").modal('hide');
          this.getLandStaff();
      }
    });
  }
 }

 deletestaff(id)
 {
  this.staff_id=id;
  $("#Staff_delete_model").modal('show');
 }

 deleteconfirm_staff()
 {
  this._landlordService.DeleteLandlordStaff_data(this.staff_id).subscribe( (data)=>{
    console.log(data);
    if(data == true)
    {
        this.toastr.successToastr('User Delete successfully ', 'Success!');
        $("#Staff_delete_model").modal('hide');
        this.getLandStaff();
    }
  });
 }

 activeDeactivateUser(id,status){


   let info={'status':status,'id':id}
   var r = confirm( status + "User ");
     if (r == true) {
       $(".overlayDivLoader").show()
       this._landlordService.activeDeactivateLandStaff(info).subscribe((res)=>{
        this.getLandStaff();
        this.toastr.successToastr("successfully  user " + status , 'Success!');
        $(".overlayDivLoader").hide()
       }
       ,(error)=>{
         console.log(error);
       }
       
       );
     } else {
      
     }


 }

}
