import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../_services/admin.service';
import {UserService} from '../../_services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Url} from '../../mygloabal';
import { LandNavComponent } from '../land-nav/land-nav.component';
import{ LandlordService } from '../../_services/landlord.service'
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  public url=Url;
  public userProfile:FormGroup;
  public userInfo:any;
  public forgotForm:FormGroup;
  public conpass:any;
  public passwordUpdated=false;
  public currentPassNotCorrect=false;
  public ProfileUpdated=false;
 public uploads;
 public profile;
 public userData:any;
 public path:any='uploads/profile/';
  public profilephoto:any;
  public imagepath:any;
  public company_logo:string;
  public showspinner:boolean=false;
  public showCropImg:boolean=false
  public parentMessage:string;

public   imageChangedEvent: any = '';
public croppedImage: any = '';
public parentmsg=this.profilephoto ;

  constructor(private _adminService:AdminService,private _userService:UserService,public toastr: ToastrManager,
    private router:Router,public landlordService: LandlordService) {
 
    this.userInfo=JSON.parse(localStorage.getItem("currentUser"));
    this.userProfileObj();
    this.passwordFormObj();
   
   // this.profilephoto=Url+this.userInfo.userinfo.profilephoto;
    this.profilephoto= this.userInfo.userinfo.profilephoto;
    console.log(this.profilephoto);
   }
userProfileObj(){

   let res=this.userInfo.userinfo;
  this.userProfile=new FormGroup({
        userName :new FormControl(res.userName),
        email : new FormControl(res.email),
        phone:new FormControl(res.phone),
        address:new FormControl(res.address),
        country:new FormControl(res.country)
  });

}

 passwordFormObj(){

   this.forgotForm=new FormGroup({
      currentPass: new FormControl(),
      pass:new FormControl(),
      cpass: new FormControl() 

   });


 }



  ngOnInit() {
  }
  updateProfileInfo(){
    let res=this.userProfile.value;
    this.userProfile=new FormGroup({
          userName :new FormControl(res.userName,[Validators.required]),
          phone:new FormControl(res.phone,[Validators.required]),
          email : new FormControl(res.email),
          address:new FormControl(res.address),
          country:new FormControl(res.country)
    });
  
       if(this.userProfile.valid)
       {
        this._userService.updateProfileInfo(res).subscribe((data)=>{
         
          if(data.msg=='success'){
            this.toastr.successToastr('profile info updated successfully ', 'Success!');
            this.ProfileUpdated=true;
            let json = {"token":this.userInfo.token, "userinfo":data.info};
            let userInfo= JSON.stringify(json);
            localStorage.setItem("currentUser",userInfo);

          }else{
         
          }
          setTimeout(()=>{
           this.ProfileUpdated=false;
           },3000);   
          
        });
    }
}

updatePass(){

  let res=this.forgotForm.value;



       this.forgotForm = new FormGroup({      
        currentPass: new FormControl(res.currentPass, [Validators.required]),
        pass: new FormControl(res.pass, [Validators.required]),
        cpass: new FormControl(res.cpass, [Validators.required]),
       
      });

          if( this.forgotForm.valid && this.conpass ==true){
            ;  
            this._adminService.changePassword(res).subscribe((data)=>{
              // this.toastr.successToastr('profile info updated successfully ', 'Success!');
               
              if(data.msg=='success'){
                this.passwordFormObj();
                this.passwordUpdated=true;
               
                }else{
                  this.currentPassNotCorrect=true;
            
              }
              
              setTimeout(()=>{
                this.currentPassNotCorrect=false;
                this.passwordUpdated=false;
               },3000);

            });
      }

}



checkConformPwd(res){
  
  var pass = this.forgotForm.value;
  if(res!==pass.pass){
    this.conpass = false;
  }else{
    this.conpass =true;
  }
}
checkNewPwd(res){
   var pass = this.forgotForm.value;
   if(res!==pass.cpass)
  {
    this.conpass = false;
  }else{
    this.conpass =true;
  }
}




fileChangeEvent(event: any): void {
  this.imageChangedEvent = event;

  this.showCropImg=true;
  console.log( this.imageChangedEvent = event)
 
}
imageCropped(image: string) {
  this.croppedImage = image;
}
imageLoaded() {
  // show cropper
}
loadImageFailed() {
  // show message
}


public showcrop(){
  this.showCropImg=true;

}
public  uploadProfileImage(){

  if (this.croppedImage){
 var text = this.randomName();
 let file = this.dataURLtoFile(this.croppedImage, text + '.png');
 let formData = new FormData();
  formData.append('selectFile', file, file.name);

   this._adminService.uploadProfileImage(formData).subscribe(
     (data) => {        
      if(data.msg="success"){
                  
                     $("#ProfileUpdateModal").modal('hide');
                     this.toastr.successToastr('profile image successfully updated ', 'Success!'); 
                    this.profilephoto=Url+data.profilephoto;
                    let tempInfo =this.userInfo.userinfo;
                    tempInfo.profilephoto=data.profilephoto;
                    console.log(this.profilephoto); 
                    let json = {"token":this.userInfo.token, "userinfo":tempInfo};
                    let userInfo= JSON.stringify(json);
                    localStorage.setItem("currentUser",userInfo);
                    let nav =new LandNavComponent(this.router,this.landlordService);
                    nav.ngOnInit();
                    // setTimeout(()=>{
                    //   location.reload();
                    // },3000);
                   
             }else{
                 
             }	
     },
     error => {
     console.log(error);
     }
   )
    }else{
      alert("Please Select Image ...! ");
    }
}

public  randomName() {
 var text = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 for (var i = 0; i < 8; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
 }
 return text;
}
// Convert base64 image to byte array
public dataURLtoFile(dataurl, filename) {

let  arr = dataurl.base64.split(',')
     , mime = arr[0].match(/:(.*?);/)[1]
     , bstr = atob(arr[1])
     , n = bstr.length
     , u8arr = new Uint8Array(n);
 while (n--) {
     u8arr[n] = bstr.charCodeAt(n);
 }
 return new File([u8arr], filename, {
     type: mime
 });
}




}
