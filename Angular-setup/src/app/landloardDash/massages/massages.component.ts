import { Component, OnInit ,Renderer} from '@angular/core';
import { LandlordService } from '../../_services/landlord.service';
import { Router } from '@angular/router';
import { Url } from '../../mygloabal';
import { ActivatedRoute} from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-massages',
  templateUrl: './massages.component.html',
  styleUrls: ['./massages.component.css']
})

export class MassagesComponent implements OnInit {
  tenantDetails:any;
  tenantSubject:any;
  intrval:any;
  chat_msg:any;
  sendbutton:any;
  subject_id:any;
  tenant_id:any;
  msg:any;
  landlord_details:any;
  url=Url;
  tenant_details:any;
  subject_name:any;
  activeRoute:any;
  constructor(private render:Renderer,private _landlordServices:LandlordService,private route:Router ,public router:ActivatedRoute) { }

  ngOnInit() {
  this.sendbutton=false;
  this.router.params.subscribe( params =>{ this.activeRoute=params['tenant_id']});
  if(this.activeRoute)
  {
    this.listClick('',this.activeRoute);
  }
    this._landlordServices.getSenderName().subscribe((data)=>{
      this.tenantDetails=data['sender_name'];
      this.landlord_details=data['landlord_details'];
      console.log(this.tenantDetails);
    })
  }

  showLandlordMsg(sub_id,subject)
  {
    this.subject_name=subject;
    this.subject_id=sub_id;
    this.intrval=false;
    var apiData={'subject_id':this.subject_id,'readFlag':false};
    this._landlordServices.getTenantMessage(apiData).subscribe((data)=>{
    this.chat_msg=data['messages'];
    this.tenant_details=data['tenant_details'];
    
     })
     this.intrval=true;
     $('#landlordMessage').modal('show');
     

      setTimeout(()=>{
        // scrollTop: $('#singleCommentDivMain').eq(0).scrollHeight}, 800);
        var objDiv = $("#singleCommentDivMain");
        var h = objDiv.get(0).scrollHeight;
        objDiv.animate({scrollTop: h});
      },800);

     const inter =setInterval(() => {
      if(!this.intrval && this.route.url !='/messages' ) {
       clearInterval(inter);
      }
      var apiData={'subject_id':this.subject_id,'readFlag':true};
      this._landlordServices.getTenantMessage(apiData).subscribe((data)=>{
        if(data['messages'].length>0)
        {
          this.chat_msg= this.chat_msg.concat(data['messages']);
          var objDiv = $("#singleCommentDivMain");
          var h = objDiv.get(0).scrollHeight;
          objDiv.animate({scrollTop: h});
        }
     })
     },2000);
  
  }

  public listClick(event:any,tenant_id) {
    this.tenant_id=tenant_id;
    var apiData={'tenant_id':tenant_id,'readFlag':false};
    
    if(event)
    {
      event.preventDefault();
      $("h5").removeClass('activeText');
      this.render.setElementClass(event.target,"activeText", true);
    }
  
    this._landlordServices.getTenantsubject(apiData).subscribe((data)=>{
     this.tenantSubject=data;
     const inter =setInterval(() => {
       if(this.route.url !='/messages') {
        clearInterval(inter);
       }
       var apiData={'tenant_id':tenant_id,'readFlag':true};
       this._landlordServices.getTenantsubject(apiData).subscribe((data)=>{
         if(data.length>0){
          this.tenantSubject=this.tenantSubject.concat(data);
         }
       });
      }, 2000);
    })
     
  }

  StopInterval()
  {
    this.intrval=false;
  }

  sendLandTenantMsg(msg)
  {
    var formData=new FormData();
    formData.append('message',msg);
    formData.append('subject_id',this.subject_id);
    formData.append('tenant_id',this.tenant_id);
    this._landlordServices.saveLandMsg(formData).subscribe((data)=>{ 
      console.log('data'+data);
      
      if(data)
      {
        this.chat_msg.push({'sender_status':1,'message':msg,'profilephoto':this.landlord_details.profilephoto,'userName':this.landlord_details.userName});
          var objDiv = $("#singleCommentDivMain");
          var h = objDiv.get(0).scrollHeight;
          objDiv.animate({scrollTop: h});
      }
     this.msg='';
      })
  }
  sendComment(event)
  {
     if(event.data !='')
     {
       this.sendbutton=true;
     }else{
       this.sendbutton=false;
     }
  }

}
