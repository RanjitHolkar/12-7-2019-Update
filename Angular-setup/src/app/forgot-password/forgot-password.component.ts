import { Component, OnInit } from '@angular/core';
import{ FormBuilder,FormControl,Validator, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  public  forgotForm:any;
  public forgotStr:any;
 public  passLinkCreated =false;
 public emailNotExist=false;
 public formSubmited=false;
  constructor( private userService: UserService , private activatedRoute: ActivatedRoute) {

          this.createForgotForm();

       
            /*this.activatedRoute.params.subscribe((params) => {
              this.forgotStr=params['id'];
            alert(this.forgotStr)
             }); */
   }


   createForgotForm(){

    this.forgotForm= new FormGroup({
      phoneOrEmail:new FormControl()

    });
   }

  ngOnInit() {



  }



  forgotPass(){
   let res= this.forgotForm.value;
   this.forgotForm = new FormGroup({      
         phoneOrEmail : new FormControl(res.phoneOrEmail,[Validators.required] ),
      });
          this.emailNotExist=false;      
          this.passLinkCreated=false;
          if( this.forgotForm.valid){
             this.formSubmited=true;
             this.userService.forgotPassword(res).subscribe((data)=>{
               this.formSubmited=false;
                  this.createForgotForm();
               
                   if(data.msg=='success'){
                   
                    this.passLinkCreated=true;
                    setTimeout(()=>{
                      this.passLinkCreated=false;
                  },3000);
                   } else{
                        
                    this.emailNotExist=true;

                   }
                   
              },
              error=>{
                console.log(error);
              }
              
              );

          }else{


          }
       
    
 } 

}
