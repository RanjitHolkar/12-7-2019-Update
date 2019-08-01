import { Component, OnInit } from '@angular/core';
import { TenantService} from '../../../_services/tenant.service';
import {Form,FormControl,FormArrayName,FormGroup,FormBuilder,Validators} from '@angular/forms'
import html2canvas from 'html2canvas'; 
import * as jspdf from 'jspdf';  
import { SafeMethodCall } from '@angular/compiler';
import { ToastrManager } from 'ng6-toastr-notifications';
import {formatDate } from '@angular/common';
declare var $;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
public in_progress_payment:any;
public transactionHistory:any;
public unitData:any;
public unit_id:any;
public landDetails:any;
public land_id:any;
public tenantPrfilePhoto:any;
public transaction:any;
public additonal:any;
public deduction:any;
public transactonType:any;
public addTransaction:FormGroup;
public submitted=false;
public totalAmount:any;
public today= new Date();
public jstoday = '';
public mobileNumber='';
public confirmation : Boolean;
public errorText : any;
public errorConfirmation : Boolean;
public transaction_id :Number;

constructor(private tenantService:TenantService,private formBuilder:FormBuilder,private toastr:ToastrManager) { }

  ngOnInit() {
    this.errorConfirmation = false;
    this.confirmation = false;
    this.mobileNumber='';
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.in_progress_payment=data['in_progress_payment'];
    this.transactionHistory=data['transaction_data'];
    this.unitData=data['unit_data'][0];
    this.unit_id=this.unitData['id'];
    this.landDetails=data['landlord_details'];
    this.land_id=this.landDetails['id'];
    this.tenantPrfilePhoto=this.unitData['profilephoto'];
    console.log(this.in_progress_payment);
    });

    this.addTransaction=this.formBuilder.group({
      'startDate':['',Validators.required],
      'endDate':['',Validators.required],
      'type':['',Validators.required],
      'amount':['',Validators.required],
      'note':['',Validators.required],
    })

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
  get f(){
    return this.addTransaction.controls;
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
  getTransactionType()
  {
    this.tenantService.getTransactionType(this.land_id).subscribe(res=>{
      this.transactonType=res;
    });
    $('#billingPeriod').modal('show');
  }
  sendMonay(totalAmount,id)
  {
    this.transaction_id=id;
    this.totalAmount=totalAmount;
    $('#mPesa').modal('show');
  }
  //send Payement Request:start
  sendPayementRequest()
  {
    if(this.mobileNumber !='')
    {
      this.confirmation = false;
      this.errorText = '';
      this.errorConfirmation = false;
      $(".overlayDivLoader").show();
      this.tenantService.sendPayementRequest({'mobile':this.mobileNumber,'id':this.transaction_id,'amount':this.totalAmount}).subscribe(res=>{
        if(res.ResponseDescription == 'Accept the service request successfully.')
        {
          this.confirmation=true;
          $(".overlayDivLoader").hide();
          setTimeout( ()=>{this.checkConfirmation() }, 8000);  
        }else{
          $(".overlayDivLoader").hide();
          this.errorText = res.errorMessage;
          this.errorConfirmation = true;
        }
        console.log(res);
      })
    }
    // console.log(this.mobileNumber);
  }
  //send Payement Request:End

  // function for check confirmation payment:Start
  checkConfirmation()
  {
    this.tenantService.checkConfirmation(this.transaction_id).subscribe(res=>{
      console.log(res);
      this.confirmation = false;
      this.errorText = '';
      this.errorConfirmation = false;
      this.mobileNumber='';
      $('#mPesa').modal('hide');
      if(res.length==1)
      {
        this.toastr.successToastr('Transaction successfully ', 'Success!');
        this.ngOnInit();
      }else{
        this.toastr.errorToastr('Transaction Failed', 'Success!');
      }
       });
  }
   // function for check confirmation payment:END
  saveTransaction()
  {
    this.submitted=true;
    if(this.addTransaction.valid)
    {
      var formData=new FormData();
      formData.append('transaction_type',this.addTransaction.value.type);
      formData.append('start_period',this.addTransaction.value.startDate);
      formData.append('totalAmount',this.addTransaction.value.amount);
      formData.append('end_period',this.addTransaction.value.endDate);
      formData.append('unit_id',this.unitData['id']);
      formData.append('amount',this.addTransaction.value.amount);
      formData.append('note',this.addTransaction.value.note);
      formData.append('landlord_id',this.land_id);
      formData.append('property_id',this.unitData['propertyId']);
      formData.append('payment_status','0');
      this.tenantService.saveAddTransaction(formData).subscribe(res=>{
      if(res==1)
      {
        $('#billingPeriod').modal('hide');
        this.toastr.successToastr('Transaction Type added successfully ', 'Success!');
        this.submitted=false;
        this.ngOnInit();
      }
      });

    }
  }
}
