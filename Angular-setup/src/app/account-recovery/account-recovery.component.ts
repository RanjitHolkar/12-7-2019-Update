import { Component, OnInit } from '@angular/core';
import{ FormBuilder,FormControl,Validator, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent implements OnInit {
  public  forgotForm:any;
  public forgotStr:any;
  public conpass:any=true;
  public passwoedUpdated=false;
  constructor( private userService: UserService , private activatedRoute: ActivatedRoute,private router:Router) {

            this.forgotForm= new FormGroup({
              password:new FormControl(),
              cpassword:new FormControl(),
              

            });


            this.activatedRoute.params.subscribe((params) => {
              this.forgotStr=params['id'];
              
             });
   }



  ngOnInit() {



  }



  changePass(){
   let res= this.forgotForm.value;
   this.forgotForm = new FormGroup({      
        password: new FormControl(res.password, [Validators.required,Validators.minLength(5)]),
        cpassword: new FormControl(res.cpassword, [Validators.required,Validators.minLength(5)]),
       
      });

          if( this.forgotForm.valid && this.conpass ==true){
            res.forgotStr=this.forgotStr; 
            this.passwoedUpdated=false;
                 
             this.userService.changePassword(res).subscribe((data)=>{
                    if(data.msg =='success'){
                      this.passwoedUpdated=true;
                      setTimeout(()=>{
                           this.router.navigate(['/login']);
                      },3000);
                    
                    }else{
                     

                    }
              },
              error=>{
                console.log(error);
              }
              
              );

          }else{


          }
       
    
 } 


 checkConformPwd(res){
  var pass = this.forgotForm.value;
  if(res!==pass.password){
    this.conpass = false;
  }else{
    this.conpass =true;
  }
}
checkNewPwd(res){
  var pass = this.forgotForm.value;
  if(res!==pass.cpassword)
  {
    this.conpass = false;
  }else{
    this.conpass =true;
  }
}


}

