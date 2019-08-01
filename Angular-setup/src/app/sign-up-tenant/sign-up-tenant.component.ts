import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormControl,FormGroup,Validator, Validators}from '@angular/forms';
import{UserService}from'../_services/user.service'; 
import{Router} from '@angular/router';
import {
  AuthService,
  GoogleLoginProvider,
} from "angular-6-social-login";


@Component({
  selector: 'app-sign-up-tenant',
  templateUrl: './sign-up-tenant.component.html',
  styleUrls: ['./sign-up-tenant.component.css']
})
export class SignUpTenantComponent implements OnInit {

  public signForm : FormGroup;
  public conpass:any=true;
  public existEmailAndphone  :boolean=false;
  public accountCreated :boolean=false;
  constructor(private _userService:UserService,private _route:Router ,private socialAuthService: AuthService) {
  
  
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

      this.signForm=new FormGroup({
              
           userName:new FormControl( res.userName,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
           email:new FormControl(res.email,[Validators.required,Validators.email]),
           phone : new FormControl(res.phone,[Validators.required,Validators.minLength(10)]),
           password: new FormControl(res.password, [Validators.required,Validators.minLength(5)]),
           cpassword: new FormControl(res.cpassword, [Validators.required,Validators.minLength(5)])
      });


      if (this.signForm.valid==true && this.conpass ==true){
               
         this.existEmailAndphone=false;
         this.accountCreated=false;
           this._userService.signUpAsTenant(res).subscribe((data)=>{    
              
                     if(data.msg=='error'){

                       this.existEmailAndphone=true;
                     
                     }else{
                      this.createSignObj();
                      this.accountCreated=true;
                         setTimeout(()=>{

                         this._route.navigate(['/login']);
                         },3000)
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
      this._userService.signUpAsTenantGoogle(userData).subscribe((data)=>{    
        this._route.navigate(['/landlord-dash']);
        
    
 } );
      
    })
 }

}

