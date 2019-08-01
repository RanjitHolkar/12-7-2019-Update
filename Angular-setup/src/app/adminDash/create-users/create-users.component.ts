import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AdminService } from 'src/app/_services/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $:any;
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {


  public userform:FormGroup;
  public existEmailAndphone=false;
  public showUserForm=false;
  public usersList:any;
  public formSubmit=false;
  public showSaveBtn=false;
  constructor( private _userServies:UserService, private _adminService:AdminService,public toastr: ToastrManager) { 

    this.createUserForm();
    this.getAllUsers();
  }

  ngOnInit() {
   
  }
  
  createUserForm(){
     this.userform=new FormGroup({
      userName:new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      role:new FormControl(),
     });

  }



  getAllUsers(){

    this._adminService.getAllUsers().subscribe((data)=>{ 
             if(data.msg=='success'){
                 this.usersList=data.allUsers;
                  
              }else{

              }
    });

  }
  addUsersDiv(){
        
    this.showUserForm=true;
    this.showSaveBtn=true;
    this.createUserForm();

  }

  hideAddUsersDiv(){
      this.showUserForm=false;
      this.showSaveBtn=false;
  }

  addUser(){
      
    let res=this.userform.value;

    this.userform=new FormGroup({
      userName:new FormControl(res.userName,[Validators.required]),
      email: new FormControl(res.email,[Validators.required]),
      phone: new FormControl(res.phone,[Validators.required]),
      role: new FormControl(res.role,[Validators.required]),
     });

     if(this.userform.valid){
       $(".overlayDivLoader").show()
          this.formSubmit=true;
          this._adminService.addUser(res).subscribe((data)=>{
          this.formSubmit=false;
          if(data.msg=='success'){
           
            this.toastr.successToastr(" Your successfully  added user  role " + res.role, 'Success!');
            this.createUserForm();
            this.existEmailAndphone=false;
            this.showUserForm=false;
            this.getAllUsers();
          }else{
            this.showUserForm=true;
            this.existEmailAndphone=true;
          }
          $(".overlayDivLoader").hide();
             })

     }else{
       }
            

  }
  editUsersInfo(res){
     this.showSaveBtn=false;
    this.showUserForm=true;
    this.userform=new FormGroup({
      userName:new FormControl(res.userName,[Validators.required]),
      email: new FormControl(res.email,[Validators.required]),
      phone: new FormControl(res.phone,[Validators.required]),
      role: new FormControl(res.role,[Validators.required]),
      id:new FormControl(res.id),
     });
    console.log(res);
  }

  //----- updateUserInfo ----

  updateUserInfo(){
   let res= this.userform.value;
    if(this.userform.valid){
      $(".overlayDivLoader").show()
      this._adminService.updateUserInfo(res).subscribe((data)=>{
        this.formSubmit=false;
        if(data.msg=='success'){
          this.toastr.successToastr(" successfully updated user information ", 'Success!');
          this.createUserForm();
           this.createUserForm();
          this.existEmailAndphone=false;
          this.showUserForm=false;
          this.getAllUsers();
        }else{
          this.showUserForm=true;
          this.existEmailAndphone=true;
        }
        $(".overlayDivLoader").hide();
           })
    }
  }


  deleteUsers(user){
  
   let user_id={'id':user.id}
    var r = confirm("Delete User ");
      if (r == true) {
        $(".overlayDivLoader").show()
        this._adminService.deleteUser(user_id).subscribe((res)=>{
          this.toastr.successToastr("User deleted successfully ", 'Success!');
         this.getAllUsers();
         $(".overlayDivLoader").hide()
        }
        ,(error)=>{
          console.log(error);
        }
        
        );
      } else {
       
      }
  }

  activeDeactivateUser(id,status){


    let info={'status':status,'id':id}
    var r = confirm( status + "User ");
      if (r == true) {
        $(".overlayDivLoader").show()
        this._adminService.activeDeactivateUser(info).subscribe((res)=>{
         this.getAllUsers();
         this.toastr.successToastr(" successfully  user " + status , 'Success!');
         $(".overlayDivLoader").hide()
        }
        ,(error)=>{
          console.log(error);
        }
        
        );
      } else {
       
      }


  }


   numberOnly(event): boolean {
       return this._userServies.numberOnly(event);
    }



}
