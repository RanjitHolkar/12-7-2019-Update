import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormControl,FormGroup,Validator, Validators}from '@angular/forms';
import {Router}from '@angular/router';
import{UserService}from'../_services/user.service'; 
import * as $ from "jquery";
import {
  AuthService,
  GoogleLoginProvider,
} from "angular-6-social-login";

@Component({
  selector: 'app-sign-up-landloard',
  templateUrl: './sign-up-landloard.component.html',
  styleUrls: ['./sign-up-landloard.component.css']
})
export class SignUpLandloardComponent implements OnInit {

  public signForm : FormGroup;
  public conpass:any=true;
  public existEmailAndphone  :boolean=false;
  public accountCreated :boolean=false;
  constructor(private _userService:UserService, private _router:Router, private socialAuthService: AuthService) {
    $("#overlayDivLoader").show();    
  
     this.createSignObj();
   
   }


   createSignObj (){
      this.signForm=new FormGroup({
           userName :new FormControl(),
           email :new FormControl(),
           password:new FormControl(),
           cpassword:new FormControl(),
           phone: new FormControl()

          
      });

     
   }
   
   signUp(){
       
     let res=this.signForm.value;
    // $("#overlayDivLoader").show(); 
      this.signForm=new FormGroup({
              
           userName:new FormControl( res.userName,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
           email:new FormControl(res.email,[Validators.required,Validators.email]),
           phone : new FormControl(res.phone,[Validators.required,Validators.minLength(10)]),
           password: new FormControl(res.password, [Validators.required,Validators.minLength(5)]),
           cpassword: new FormControl(res.password, [Validators.required,Validators.minLength(5)])
      });

       if (this.signForm.valid==true && this.conpass ==true){
         
         this.existEmailAndphone=false;
         this.accountCreated=false;
           this._userService.signUpAsLandlord(res).subscribe((data)=>{    

       
                     if(data.msg=='error'){
                      $("#overlayDivLoader").hide();
                      
                       this.existEmailAndphone=true;
                      
                     /// md.showNotification('bottom','center');
                     }else{
                      this.createSignObj();
                      this.accountCreated=true;
                      setTimeout(() => {
                         this._router.navigate(['/login']);
                      }, 3000);
                     }
                 
              } );

           
          
       }else{

        
       }
      
   }


   checkConformPwd(res){
		var pass = this.signForm.value;
		if(res!==pass.password){
			this.conpass = false;
		}else{
			this.conpass =true;
		}
	}
	checkNewPwd(res){
		var pass = this.signForm.value;
		if(res!==pass.cpassword)
		{
			this.conpass = false;
		}else{
			this.conpass =true;
		}
	}


ngOnInit() {
 
 
  }

  
  numberOnly(event): boolean {
    return this._userService.numberOnly(event);
 }
 socialSignIn()
 {
  //  alert('sdg');
  let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      
      console.log(" sign in data : " , userData['email']);
      this._userService.signUpAsLandlordGoogle(userData).subscribe((data)=>{    
        this._router.navigate(['/landlord-dash']);
        // localStorage.setItem('currentUser', JSON.stringify({ token: res.token,userinfo:res.userinfo }));
        // return "success";
        // if(data.msg=='error'){
        //  $("#overlayDivLoader").hide();
        //   //this.existEmailAndphone=true;
         
        // /// md.showNotification('bottom','center');
        // }else{
        //  this.createSignObj();
        //  this.accountCreated=true;
        //  setTimeout(() => {
        //     this._router.navigate(['/login']);
        //  }, 3000);
        //}
    
 } );
      
    })
 }
//  onSignIn(googleUser)
//  {
//    alert('hi');
//    var profile = googleUser.getBasicProfile();
//    console.log("ID: " + profile.getId()); 
//         console.log('Full Name: ' + profile.getName());
//  }

//  onSignIn(googleUser) {
//    alert('hiii');
//   // var profile = googleUser.getBasicProfile();
//   // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   // console.log('Name: ' + profile.getName());
//   // console.log('Image URL: ' + profile.getImageUrl());
//   // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }
}


