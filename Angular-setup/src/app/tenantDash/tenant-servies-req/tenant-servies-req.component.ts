import { Component, OnInit } from '@angular/core';
import {TenantService } from '../../_services/tenant.service';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Url } from '../../mygloabal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'rxjs';
import * as jspdf from 'jspdf';  
import {ActivatedRoute} from "@angular/router";
import html2canvas from 'html2canvas'; 
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
declare var $ :any;
@Component({
  selector: 'app-tenant-servies-req',
  templateUrl: './tenant-servies-req.component.html',
  styleUrls: ['./tenant-servies-req.component.css']
})
export class TenantServiesReqComponent implements OnInit {
  closeResult: string;
  unitData:any;
  unit_id:any;
  url=Url;
  
  /*** Service Request Section Variable:Start */
  serviceRequest=false;
  name:string;
  unitName:any;
  Submit:any;
  unit_data:any;
  serviceAddForm:FormGroup;
  editServiceAddForm:FormGroup;
  transactionFile:any;
  serviceRequstData:any;
  editservice=[];
  editServiceRequestData:any;
  /*** Service Request Section Variable:End */

  /*** Transaction Section Variable:Start */
  transactionDetails:any;
  transactionHistory:any;
  transaction:any;
  additonal:any;
  deduction:any;
  land_id:any;
  in_progress_payment:any;
  /*** Transaction Section Variable:End */

  /*** History Section Variable:Start */
  history=false;
  /*** History Section Variable:End */

  /*** contact Section Variable:Start */
   contact=false;
   personalMessageForm:FormGroup;
   messageSubmit:any;
   subjects:any;
   tenantPrfilePhoto:any;
   subject:any;
   msg:any;
   sendbutton:any;
   subject_id:any;
   chat_msg:any;
   landDetails:any;
   land_profile:any;
   land_name:any
   AllMessage:any;
  /*** contact Section Variable:End */

   /*** Lease Section Variable:Start */
   leaseDetails=false;
   lease_data:any;
  /*** Lease Section Variable:End */

  /*** Files Section Variable:Start */
  addTenantDocumentForm:FormGroup;
  filesDetails=false;
  files_data:any;
  tenantDocument=false;
  addFilesSubmit=false;
  documentType:any;
  Doument:any;
  db:any;
  id:any;
  
  /*** Files Section Variable:End */ 
  constructor(private route:Router,private router:ActivatedRoute, public afs: AngularFirestore, public afAuth: AngularFireAuth,public tenantService:TenantService,public toastr:ToastrManager,public formBuilder:FormBuilder) {

    this.db = firebase.firestore();
   }

  ngOnInit() {
    /* Transaction Details Section in ngOnInit:start */
    this.router.params.subscribe( params =>{ this.id=params['Msg']});
    this.transactionDetails=true;
    this.messageSubmit=false;
    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.in_progress_payment=data['in_progress_payment'];
    this.transactionHistory=data['transaction_data'];
    this.unitData=data['unit_data'][0];
    this.unit_id=this.unitData['id'];
    this.landDetails=data['landlord_details'];
    this.land_id=this.landDetails['id'];
    this.tenantPrfilePhoto=this.unitData['profilephoto'];
    });
    if(this.id != undefined)
    {
      this.contactLandlordShow();
    }
    /* Transaction Details Section in ngOnInit:END*/

    /* Files Details Section :Start */
    this.addTenantDocumentForm = this.formBuilder.group({
      document_name:['',Validators.required],
      document_type:['',Validators.required],
      document_file:['',Validators.required]
    });
    /* Files Details Section :END */

    this.Submit=false;
   

    this.serviceAddForm=this.formBuilder.group({
      unit_id:['', Validators.required],
      title:['', Validators.required],
      details:['', Validators.required],
      file:['']
      
    });

    this.editServiceAddForm=this.formBuilder.group({
      unit:['', Validators.required],
      title:['', Validators.required],
      details:['', Validators.required],
      file:['']
    });
    this.personalMessageForm=this.formBuilder.group({
      subject:['',Validators.required]
    });
  }
  detectTransactionFile(event)
  {
    this.transactionFile=event.target.files;
  }
  
  sendRequest()
  {
    this.Submit=true;
    if(this.serviceAddForm.valid)
    {
      var  formData = new FormData();
      if(this.transactionFile !=undefined)
      {
        formData.append('selecteFiles',this.transactionFile[0]);
      }
      formData.append('unit_id',this.unit_data);
      formData.append('title',this.serviceAddForm.value.title);
      formData.append('landlord_id',this.land_id);
      formData.append('description',this.serviceAddForm.value.details);

     // this.serviceAddForm.controls['unit_id'].setValue(this.unit_data);
      this.tenantService.addRequest(formData).subscribe((data)=>{
        this.toastr.successToastr(' Service request sent successfully ','Success!');
        $('#ProfileUpdateModal').modal('hide');
        this.Submit=false;
        this.serviceRequestDetailsShow();
      })
    }
    
  }

  hideAddRequest()
  {
    $('#ProfileUpdateModal').modal('hide');
    this.serviceAddForm.reset();
  }
  hideEditRequest()
  {
    $('#editServiceRequst').modal('hide');
  }

  editServiceRequest(ind)
  {
    this.editservice=this.editServiceRequestData[ind];
    console.log(this.editservice);
    $('#editServiceRequst').modal('show');
  }
  get addServiceForm()
  {
    return this.serviceAddForm.controls;
  }
  
  get editServiceForm()
  {
    return this.editServiceAddForm.controls;
  }

  SentServiceRequest()
  {
    $('#ProfileUpdateModal').modal('show');
  }

  /********************************************Transaction  Section :Start **************************************/

  /*########### Transaction Details PopUp:Start ###########*/
  transactionDetailsShow()
  {
    this.contact=false;
    this.history=false;
    this.transactionDetails=true;
    this.serviceRequest=false;
    this.leaseDetails=false;
    this.filesDetails=false;
  }
  showReciptPopup(transaction_id)
  {
    this.tenantService.getReciptData(transaction_id).subscribe((data)=>{
     this.transaction=data['transaction'];
     this.additonal=data['additonal'];
     this.deduction=data['deduction'];
     console.log(data);
    })
    $('#myModalRecipt').modal('show');
  }
  hideRecipt()
  {
    $('#myModalRecipt').modal('hide');
  }
  genratePdf()
  {
    var data = document.getElementById('PdfRecipt');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Transaction.pdf'); // Generated PDF   
    });  
    
  }
 /*########### Transaction Details PopUp:End ###########*/
  /********************************************Transaction Section :END **************************************/
  
  /********************************************Lease Section :Start **************************************/

  /*########### Show Lease Details PopUp:Start ###########*/
  leaseDeatilsShow()
  {
    this.tenantService.getleaseDetails().subscribe((data)=>{
      this.lease_data=data;
    });
    this.contact=false;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=true;
    this.filesDetails=false;
  }
 /*########### Show Lease Details PopUp:End ###########*/
  /********************************************Lease Section :END **************************************/
  
  /********************************************Files Section :Start **************************************/



  filesDetailsShow()
  {
    this.tenantService.getFilesDetails().subscribe((data)=>{
    this.files_data=data;
    });
    this.filesDetails=true;
    this.contact=false;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=false;

  }
  get addDocTenantForm(){
    return this.addTenantDocumentForm.controls;
  }
  addTenantDocumentPopup()
  {   
    this.tenantService.getDocumnetType(this.land_id).subscribe((data)=>{
    this.documentType=data['tenant_document'];
    console.log(data);
      });
    this.tenantDocument=true;
  }

  detectDocumentFile(event:any)
  {
    this.Doument=event.target.files;
  }

 

    
  cancelTenantDocumentPopup()
  {
     this.tenantDocument=false;
  }
  

 
   addTenantDocument()
   {
    this.addFilesSubmit=true;
     if(this.addTenantDocumentForm.valid)
     {
      // document_name:['',Validators.required],
      // document_type:['',Validators.required],
      // document_file:['',Validators.required]
       var formData= new FormData();
       formData.append('selectFile',this.Doument[0]);
       formData.append('unit_id',this.unit_id);
       formData.append('document_name',this.addTenantDocumentForm.value.document_name);
       formData.append('document_type',this.addTenantDocumentForm.value.document_type);
       formData.append('document_file',this.addTenantDocumentForm.value.document_file);


       //var alldata={'unit_id':this.unit_id,'data':this.addTenantDocumentForm.value}
       this.tenantService.saveAddTenantDocument(formData).subscribe((data)=>{
         //console.log(data);
        this.toastr.successToastr('Document Added successfully ', 'Success!');
        this.addTenantDocumentForm.reset();
        this.filesDetailsShow();
        this.addFilesSubmit=false;
        this.tenantDocument=false;
        //this.documentType=data['document_type'];
        });
     }
     
   }
 
  /********************************************Files Section :END **************************************/

   /********************************************History Section :Start **************************************/

   /*############ Display History Details:Start ##############*/
  historyDetailsShow()
  {
    this.contact=false;
    this.history=true;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=false;
    this.filesDetails=false;
  }

  /*############ Display History Details:END ##############*/
  /********************************************History Section :END **************************************/

  /************************************Service Request Section :Start **************************************/

   /*############ Service Request Details:Start ##############*/
  serviceRequestDetailsShow()
  {
    $('.overlayDivLoader').show();
    this.tenantService.getTenantServiceData().subscribe((data)=>{
      if(data['unit_data'].length !=0)
      {
         this.unitName=data['unit_data'][0]['flatHoseNo'];
         this.unit_data=data['unit_data'][0]['id'];
      }
     
      this.serviceRequstData=data['service_request'];
      this.editServiceRequestData=data['service_request'];
      //console.log(data);
      //console.log('dzgv');
    });
    this.contact=false;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=true;
    this.leaseDetails=false;
    this.filesDetails=false;
    $('.overlayDivLoader').hide();
  }

   /*############ Service Request Details:End ##############*/

  /**************************************Service Request Section :END **************************************/
  
  /************************************Contact Landlord Section :Start **************************************/

   /*############ Contact Landlord Details:Start ##############*/
   get personalform(){
     return this.personalMessageForm.controls;
   }
   contactLandlordShow()
   {
    this.contact=true;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=false;
    this.filesDetails=false;
    
    this.tenantService.getMessageLand().subscribe((data)=>{
     this.subjects=data;
     //console.log(data);
    })
    const inter =setInterval(() => {
      if(this.contact && this.route.url !='/my-house' ) {
       clearInterval(inter);
      }
      this.tenantService.getMessageLand().subscribe((data)=>{
        this.subjects=data;
        //console.log(data);
       })
      }, 2000);
   }
 
   sendMessageLand()
   {
     this.messageSubmit=true;
     if(this.personalMessageForm.valid)
      {
        var formData= new FormData();
        formData.append('subject',this.personalMessageForm.value.subject);
        formData.append('landlord_id',this.land_id);
       this.tenantService.sendPersonalMessage(formData).subscribe((data)=>{
        // console.log(data);
         this.personalMessageForm.reset();
         this.messageSubmit=false;
         this.contactLandlordShow();
       })
      }
 
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
    
    // getTenantMsg()
    // {
    //   this.tenantService.getChatMsg().subscribe((data)=>{
    //     console.log(data);
    //     })
    // }
  
    /*############ Contact Landlord Details:End ##############*/


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
        if(!this.AllMessage && this.route.url !='/my-house' ) {
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
   /**************************************Contact Landlord Section :END **************************************/
   
   
 
  
  
  editRequest()
  {
    this.Submit=true;
    if(this.editServiceAddForm.valid)
    {
      var  formData = new FormData();
      console.log(this.transactionFile);
      if(this.transactionFile !=undefined)
      {
        formData.append('selecteFiles',this.transactionFile[0]);
      }
     formData.append('id',this.editservice['id']);
      formData.append('unit_id',this.editservice['unit_id']);
      formData.append('title',this.editServiceAddForm.value.title);
      formData.append('description',this.editServiceAddForm.value.details);

     // this.serviceAddForm.controls['unit_id'].setValue(this.unit_data);
      this.tenantService.editRequest(formData).subscribe((data)=>{
        
         this.toastr.successToastr(' Service request Update successfully ', 'Success!');
        $('#editServiceRequst').modal('hide');
        this.Submit=false;
        this.serviceRequestDetailsShow();
        // this.ngOnInit();
      })
    }
    
  }
 
  // /* Firebase send Message : START */
  // newMessage() {
  //   this.db.collection("messages").add({
  //     message: "demo demo 123",
  //     sender_id: '3',
  //     unit_id: '5',
  //     role:'tenant'
  //   })
  //     .then(function () {
  //       console.log("Document successfully written!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error writing document: ", error);
  //     });
  //   this.getMessages();
  // }
  // /* Firebase send Message : END */

  // /* Get All Firebase message : START */
  // getMessages() {
  //   this.db.collection("messages").where("sender_id","==", '3')
  //     .get()
  //     .then(function (querySnapshot) {
  //       querySnapshot.forEach(function (doc) {
  //         console.log(doc.id, " => ", doc.data());
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       console.log("Error getting documents: ", error);
  //     });
  // }
  // /* Get All Firebase message : START */
  // open(content) {
  //    this.name="amol";
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {

  //     console.log(reason)
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
 
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  // save(content){

  // }

}
