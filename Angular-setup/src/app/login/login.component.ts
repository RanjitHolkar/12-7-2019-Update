import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signin:any;
  public abc:any;
  public oneSignalToken:any;
  public userInfo:any = [];
  public invalidCredential=false;
  deactive=false;


  
  constructor(private _AuthService:AuthenticationService,private router: Router) {
    this.signin = new FormGroup({      
      phoneOrEmail:new FormControl(),
      pass:new FormControl()                                   
       });
       this.checklogin();
   }
  
  ngOnInit() {
    
  }

  formSubmit(){
    this.deactive=false
    this.invalidCredential=false;
      var res = this.signin.value;   
      this.signin = new FormGroup({      
        phoneOrEmail : new FormControl(res.phoneOrEmail,[Validators.required] ),
        pass : new FormControl(res.pass,[Validators.required])                                       
      });
      
      if(this.signin.valid){    
        $("#overlayDivLoader").show();   
        this._AuthService.login(res).subscribe((data)=>{   
          
          $("#overlayDivLoader").hide();
          if(data=='success'){
            var OneSignal = window['OneSignal'] || [];
            OneSignal.push(() => {
              OneSignal.init({
                appId: "f71ff64f-0e6d-47c2-b52a-f7844be498fd",
              });
            });
           
                OneSignal.getUserId().then( (userId) => {
                  console.log(userId);
                   this._AuthService.saveOnesignalId(userId).subscribe((data)=>{
                   console.log(data)
                 })
                 
            });
           
           this.checklogin();
           
          }else{
         if(data=='Deactivate')
         {
          this.deactive=true;
         }else{
          this.invalidCredential=true;
         }
          
          }
        },
        error=>{
          console.log(error);
        }    
      );
    }  

    
    
      
  }
  // saveToken(){
  //   alert('hiii');
   
  // }
  


  checklogin(){

      
    let currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    if (currentUser !=null){

           let  info=JSON.parse(currentUser);
          if(info.userinfo.role =='tenant'){
           
              if(info.userinfo.onLease =='Yes')
              {
                this.router.navigate(['/my-house']);
              }else{
                this.router.navigate(['/tenant-search']);
              }

              }else if(info.userinfo.role =='landlord'){

                this.router.navigate(['/landlord-dash']);
              }else if (info.userinfo.role =='admin'){

                this.router.navigate(['/admin-dash']);
              }
          
      else{
            this.router.navigate(['/login']);
            }
      } else{
            
       this.router.navigate(['/login']);
      }

  }

}
