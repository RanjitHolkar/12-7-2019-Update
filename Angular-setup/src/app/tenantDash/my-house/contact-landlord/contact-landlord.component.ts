import { Component, OnInit } from '@angular/core';
import { Url } from '../../../mygloabal';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import {TenantService } from '../../../_services/tenant.service';
import { Router } from '@angular/router';
import * as Pusher from 'pusher-js';
import {environment} from '../../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-contact-landlord',
  templateUrl: './contact-landlord.component.html',
  styleUrls: ['./contact-landlord.component.css']
})
export class ContactLandlordComponent implements OnInit {
public url=Url;
public personalMessageForm : FormGroup;

public subjects:any;
public sendbutton=false;
public chat_msg:any;
public subject_id:any;
public land_id:any;
public msg:any;
public subject:any;
public AllMessage:any;
public land_profile:any;
public land_name:any;
public messageSubmit=false;
public pusher:any;
public channel:any;
public tenantPrfilePhoto:any;

  constructor(private tenantService: TenantService,public route:Router,public formBuilder:FormBuilder) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.tenantPrfilePhoto=currentUser['userinfo']['profilephoto'];
    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.land_id=data['landlord_details']['id'];
    // this.unitData=data['unit_data'][0];
    // this.unit_id=this.unitData['id'];
    });   
    this.getSUbject();
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
getSUbject()
{
  this.personalMessageForm=this.formBuilder.group({
    subject:['',Validators.required]
  });
  this.tenantService.getMessageLand().subscribe((data)=>{
    this.subjects=data;
  });
  const inter =setInterval(() => {
    if(this.route.url !='/my-house' ) {
     clearInterval(inter);
    }
    this.tenantService.getMessageLand().subscribe((data)=>{
      this.subjects=data;
      console.log(data);
     })
    }, 2000);
}
get personalform(){
  return this.personalMessageForm.controls;
}
  sendTenantLandMsg(msg)
    {
      var formData=new FormData();
      formData.append('message',msg);
      formData.append('subject_id',this.subject_id);
      formData.append('landlord_id',this.land_id);

      this.tenantService.saveTeantMsg(formData).subscribe((data)=>{ 
        console.log(data);
        if(data){
          this.chat_msg.push({'sender_status':0,'message':msg,'profilephoto':this.land_profile,'userName':this.land_name});
          var objDiv = $("#chatDiv");
          var h = objDiv.get(0).scrollHeight;
          objDiv.animate({scrollTop: h});
        }
        //this.showAllMessage(this.subject_id,this.subject);
        this.msg='';
        })
    }

    showAllMessage(subject_id,subject)
    {
      var readFlag=false;
      this.subject=subject;
      this.subject_id=subject_id;
      this.AllMessage=true;
      var apiData={'subject_id':this.subject_id,'readFlag':false};
      this.tenantService.getAllMessage(apiData).subscribe((data)=>{
        console.log(data);
      this.chat_msg=data['messages'];
      this.land_profile=data['landlord_info']['profilephoto'];
      this.land_name=data['landlord_info']['userName'];
      /* var container = document.getElementById("chatDiv");    
          container.scrollTop = container.scrollHeight; */
         
      })
      this.AllMessage=false;
      const inter =setInterval(() => {
        if(!this.AllMessage && this.route.url !='/tenant-contact') {
         clearInterval(inter);
        }
        apiData={'subject_id':this.subject_id,'readFlag':true};
        this.tenantService.getAllMessage(apiData).subscribe((data)=>{
          if(data['messages'].length>0){
            console.log(data);
            this.chat_msg=this.chat_msg.concat(data['messages']);
          this.land_profile=data['landlord_info']['profilephoto'];
          this.land_name=data['landlord_info']['userName'];
          var objDiv = $("#chatDiv");
          var h = objDiv.get(0).scrollHeight;
          objDiv.animate({scrollTop: h});
          }
          
          })
         
        }, 2000);
        setTimeout(()=>{
          var objDiv = $("#chatDiv");
          var h = objDiv.get(0).scrollHeight;
          objDiv.animate({scrollTop: h});
        },800);
      $('#tenantMessage').modal('show');
    }
    hideModal()
    {
      this.AllMessage=true;
    }

    
   sendMessageLand()
   {
     
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true,
      useTLS: true
     
    });
   
    // var channel = pusher.subscribe(channelName);
    this.channel = this.pusher.subscribe('my-channel');
    // var callback = function(data) {};
    // this.Newdata = this.pusher.get('my-channel');
    // console.log('Get',this.Newdata);
    // $response = $pusher->get( '/channels' );
    // if( $response[ 'status'] == 200 ) {
    //   // convert to associative array for easier consumption
    //   $channels = json_decode( $response[ 'body' ], true );
    // }
      this.channel.bind('new', function(data) {
        // var triggered = channel.trigger(this.data, data[0]);
         alert(JSON.stringify(data));
        //  this.data.new = true;
        // this.Newdata=JSON.stringify(data);
        // this.Newdata.push(data[0]['id']);
       console.log(this.Newdata);
      
        // $('#newData').val(this.Newdata);

        // if(data.length > 0 && data['key']=='Msg')
        // {
        //   this.chat_msg= this.chat_msg.concat(data['messages']);
        //   var objDiv = $("#singleCommentDivMain");
        //   var h = objDiv.get(0).scrollHeight;
        //   objDiv.animate({scrollTop: h});
        // }
        // else if(data.length > 0 )
        // {
        //   this.data=1;
        //   alert(this.data);
          
        //   // // console.log(data[0]);
        //   // // console.log(JSON.parse(data));
        //   // console.log('tenant subject',this.tenantSubject);
        //   // // this.tenantSubject= this.tenantSubject.push(data);
        //   // this.tenantSubject=data;
        // }
       
      });
     this.messageSubmit=true;
     if(this.personalMessageForm.valid)
      {
        var formData= new FormData();
        formData.append('subject',this.personalMessageForm.value.subject);
        formData.append('landlord_id',this.land_id);
       this.tenantService.sendPersonalMessage(formData).subscribe((data)=>{
        console.log('noti',data);
         this.personalMessageForm.reset();
         this.messageSubmit=false;
         this.ngOnInit();
       })
      }
 
   }


}
