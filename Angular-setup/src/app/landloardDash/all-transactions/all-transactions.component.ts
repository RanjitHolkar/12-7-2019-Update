import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { a } from '@angular/core/src/render3';
import{UserService}from '../../_services/user.service';
import {ActivatedRoute} from "@angular/router";
import { empty } from 'rxjs';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
// import { NgScrolltopModule } from 'ng-scrolltop';
declare var $ :any;
@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {
    /********************************Add Transaction Varable:START ****************************************** */
transactionSubmit:any;
addtransactionForm:FormGroup;
editTransactionForm:FormGroup;
addtranscactiontype:FormGroup;
transactionTypeSubmit:any;
today=new Date();
income:any;
expence:any;
unitData:any;
unit_id:any;
property_data:any;
unitid:number;
tennatName:string;
tennatId:number;
tenant_data:any;
totalamount:any;
mainTotalValue:any;
deductionValue:any;
payment_type:any;
todayDate:any;
transactionbDocImg=[];
addTransaction:any;
proerty_id:any;
vendor:any;
transaction_data:any;
addtional:any;
deduction:any;
transaction_id:any;
editTransaction:any;
editTransaction_data:any;
editAddtional:any;
editDeduction:any;
/********************************Add Transaction Varable:END ****************************************** */

/*******************************Get  Transaction List Varable:Start ****************************************** */
trnasactionData:any;
/*******************************Get  Transaction List Varable:END ****************************************** */


  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrManager,
    public user_service:UserService,
    public route:ActivatedRoute) { }

  ngOnInit() {
  /*******************************Get  Transaction List:Start ****************************************** */
  this.user_service.getTransactionList().subscribe((data)=>{ 
    this.trnasactionData=data;
   
   
  });
 /*******************************Get  Transaction List:END ****************************************** */
    /********************************Add Transaction Data:START ****************************************** */
    this.todayDate=Date();
    this.payment_type=true;
    this.editTransaction=false;
    this.transactionSubmit=false;
    this.transactionTypeSubmit=false;
    this.addTransaction=false;
    this.addtransactionForm  = this.formBuilder.group({
      payment_date:['', Validators.required],
      amount: ['', Validators.required],
      start_period: ['', Validators.required],
      end_period: ['', Validators.required],
      transaction_type: ['', Validators.required],
      vender_name:  [''],
      property_document: ['', Validators.required],
      unit_number: ['', Validators.required],
      tenant_name: ['', Validators.required],
     
      add: this.formBuilder.array([
        this.addFiled()
      ]),
      remove: this.formBuilder.array([
        this.removeFiled()
      ]),
      note: [''],
      document_file: [''],
      payment_status: ['', Validators.required],
      payment_method: ['', Validators.required],
      totalValue: ['', Validators.required]
    }); 
    
    this.editTransactionForm  = this.formBuilder.group({
      payment_date:['', Validators.required],
      amount: ['', Validators.required],
      start_period: ['', Validators.required],
      end_period: ['', Validators.required],
      transaction_type: ['', Validators.required],
      vender_name:  [''],
      property_document: ['', Validators.required],
      unit_number: ['', Validators.required],
      tenant_name: ['', Validators.required],
      add: this.formBuilder.array([
        //  this.editAddFiled('','')
      ]),
      remove: this.formBuilder.array([
        // this.editremoveFiled('','')
      ]),
      note: [''],
      document_file: [''],
      payment_status: ['', Validators.required],
      payment_method: ['', Validators.required],
      totalValue: ['', Validators.required]
    }); 
    this.addtranscactiontype=this.formBuilder.group({
      type:['',Validators.required],
      type_name:['',Validators.required]
    })
    this.route.params.subscribe( params =>{ this.proerty_id=params['id']} );
   
   
   /********************************Add Transaction Data:END ****************************************** */  
  }
  
   /********************************Add Transaction Data:START ****************************************** */
getAddTransaction(){
  this.addTransaction=true;
  this.user_service.getTransactionType().subscribe((data)=>{
    this.income=data['Income'];
    this.expence=data['Expence'];
    this.property_data=data['property'];
    this.vendor=data['Vender'];
    console.log(data);
  })
}
  saveTransaction()
  {
    this.transactionSubmit=true;
   
    if(this.addtransactionForm.valid)
    {
     console.log(this.addtransactionForm.value);
      var  formData = new FormData();
      //console.log(this.transactionbDocImg[0]);
      if(this.transactionbDocImg.length!=0)
      formData.append('transaction_file',this.transactionbDocImg[0]);
      else
      formData.append('transaction_file','');

      formData.append('payment_date',this.addtransactionForm.value.payment_date);
      formData.append('amount',this.addtransactionForm.value.amount);
      formData.append('start_period',this.addtransactionForm.value.start_period);
      formData.append('end_period',this.addtransactionForm.value.end_period);
      formData.append('transaction_type',this.addtransactionForm.value.transaction_type);
      formData.append('vender_name',this.addtransactionForm.value.vender_name);
      formData.append('property_id',this.addtransactionForm.value.property_document);
      formData.append('unit_id',this.addtransactionForm.value.unit_number); 
      formData.append('tenant_id',this.addtransactionForm.value.tenant_name); 
      formData.append('add',JSON.stringify(this.addtransactionForm.value.add)); 
      formData.append('remove',JSON.stringify(this.addtransactionForm.value.remove));  
      formData.append('note',this.addtransactionForm.value.note); 
      formData.append('payment_status',this.addtransactionForm.value.payment_status); 
      formData.append('payment_type',this.addtransactionForm.value.payment_method); 
      formData.append('totalAmount',this.addtransactionForm.value.totalValue); 
      $(".overlayDivLoader").css('display','block');
      this.user_service.saveTeansactionData(formData).subscribe((data)=>{
        this.toastr.successToastr('Transaction successfully ', 'Success!');
        this.transactionSubmit=false;
          this.ngOnInit();
          $(".overlayDivLoader").css('display','none');
        // this.addtransactionForm.reset();
    
      });
     
    }
    
  }
  numberOnly(event): boolean {
    return this.user_service.numberOnly(event);
  }
  gnerateRecipt(transaction_id)
  {
    this.user_service.getReciptData(transaction_id).subscribe((data)=>{
    this.transaction_data=data['transaction'];
    this.addtional=data['additonal'];
    this.deduction=data['deduction'];
    console.log(data);
      
    });
  }

  SendEmailRecipt(transaction_id)
  {
    $(".overlayDivLoader").show();
    this.user_service.sendEmailRecipt(transaction_id).subscribe((data)=>{
    console.log(data);
    this.toastr.successToastr('Email Send  successfully ', 'Success!');
    $(".overlayDivLoader").hide();
      
    });
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

  get saveTransactionForm()
  {
    return this.addtransactionForm.controls;
  }
  get editTranForm()
  {
    return this.editTransactionForm.controls;
  }
  get saveTransactionTypeForm()
  {
    return this.addtranscactiontype.controls;
  }
  addTransactionType()
  {
    $('#addTransactionModal').modal('show');
  }
  saveTransactionType()
  {
   
    this.transactionTypeSubmit=true;
    if(this.addtranscactiontype.valid)
    {
      $(".overlayDivLoader").css('display','block');
      this.user_service.saveTrsactionType(this.addtranscactiontype.value).subscribe((data)=>{ 
        this.toastr.successToastr('Transaction Type added successfully ', 'Success!');
        $('#addTransactionModal').modal('hide');
          this.transactionTypeSubmit=false;
          this.getAddTransaction();
          $(".overlayDivLoader").css('display','none'); 
        //this.getAddTransaction();
        
      });
    }
  }
  addFiled() {
    // initialize our address
    return this.formBuilder.group({
      add_text: [''],
      add_type: [''],
      add_digit: ['']
    });
  }

  editAddFiled(text,value) {
    // initialize our address
    return this.formBuilder.group({
      add_text: [text],
      add_type: [''],
      add_digit: [value]
    });
  }
  editremoveFiled(text,value)
  {
    return this.formBuilder.group({
      remove_text: [text],
      remove_type: [''],
      remove_digit: [value]
    });
  }
  removeFiled()
  {
    return this.formBuilder.group({
      remove_text: [''],
      remove_type: [''],
      remove_digit: ['']
    });
  }
  additonalForm(status) {
    // add address to the list
      if(status == 1)
      {
        const control = <FormArray>this.addtransactionForm.controls['add'];
        control.push(this.addFiled());
      }

      if(status == 0)
      {
        const control = <FormArray>this.addtransactionForm.controls['remove'];
        control.push(this.removeFiled());
      }
    
    }

    editAdditonalForm(status,text,value) {
      // add address to the list
        if(status == 1)
        {
          const control = <FormArray>this.editTransactionForm.controls['add'];
          control.push(this.editAddFiled(text,value));
        }
  
        if(status == 0)
        {
          const control = <FormArray>this.editTransactionForm.controls['remove'];
          control.push(this.editremoveFiled(text,value));
        }
      
      }

    deleteTransaction(transaction_id)
    {
      this.transaction_id=transaction_id;
      $('#myModal').modal('show');
    } 

  deleteconfirm_Transaction()
  {
    $("#overlayDivLoader").css('display','block');  
    this.user_service.deleteTransaction(this.transaction_id).subscribe((data)=>{
      this.ngOnInit();
      $('#myModal').modal('hide');
      $("#overlayDivLoader").css('display','none');  
    });
  }
  cancelAddTransaction()
  {
    this.ngOnInit();
  }

  deductionForm(i: number,status)
  {
      if(status == 1)
      {
        const control = <FormArray>this.addtransactionForm.controls['add'];
        control.removeAt(i);
        this.calculation(i);
      }
      if(status == 0)
      {
        const control = <FormArray>this.addtransactionForm.controls['remove'];
        control.removeAt(i);
        this.calculation(i);
      }
        // remove address from the list    
  }
  editDeductionForm(i: number,status)
  {
      if(status == 1)
      {
        const control = <FormArray>this.editTransactionForm.controls['add'];
        control.removeAt(i);
        this.editcalculation(i);
      }
      if(status == 0)
      {
        const control = <FormArray>this.editTransactionForm.controls['remove'];
        control.removeAt(i);
        this.editcalculation(i);
      }
        // remove address from the list    
  }
  getUnitDetails(status)
  {
    if(status== 1)
    {
      this.addtransactionForm.controls['unit_number'].setValue('');
      this.unitData=[];
      var data={'property_id':this.addtransactionForm.value.property_document};
    }
    if(status == 0)
    {
      this.editTransactionForm.controls['unit_number'].setValue('');
      this.unitData=[];
      var data={'property_id':this.editTransactionForm.value.property_document};
    }
   
    this.user_service.getUnitdeatils(data).subscribe((data)=>{ 
     this.unitData=data;
     console.log(data);
     
    });
  }

  getTenantDeatails(status)
  {
    if(status == 1)
    {
      this.addtransactionForm.controls['tenant_name'].setValue('');
      this.user_service.getTenantDeatils(this.addtransactionForm.value.unit_number).subscribe((data)=>{ 
      this.tenant_data=data;
      });
    }
    if(status == 0)
    {
        this.editTransactionForm.controls['tenant_name'].setValue('');
        this.user_service.getTenantDeatils(this.editTransactionForm.value.unit_number).subscribe((data)=>{ 
        this.tenant_data=data; 
        });
    }
  }

  detectTransactionFile(event)
  {
    this.transactionbDocImg=event.target.files;
  }
  
   
  calculation(index)
  {
    this.totalamount=0;
    console.log(this.addtransactionForm.value.add.length);
    for(let i=0;i< this.addtransactionForm.value.add.length; i++)
    {
       if(this.addtransactionForm.value.add[i].add_type == '1')
        {
          this.totalamount= this.totalamount + (Number(this.addtransactionForm.value.amount) / 100)* Number(this.addtransactionForm.value.add[i].add_digit);             
        }else{
          this.totalamount=this.totalamount + Number(this.addtransactionForm.value.add[i].add_digit);  
        }
    }
    this.deductionValue=0;
    for(let i=0;i< this.addtransactionForm.value.remove.length; i++)
    {
      if(this.addtransactionForm.value.remove[i].remove_type == '1')
      {  
        this.deductionValue = this.deductionValue + (Number(this.addtransactionForm.value.amount) / 100)* Number(this.addtransactionForm.value.remove[i].remove_digit); 
      }else{
        this.deductionValue = this.deductionValue + Number(this.addtransactionForm.value.remove[i].remove_digit); 
        // console.log(this.mainTotalValue);
      }
    }
    this.mainTotalValue = Number(this.totalamount) + Number(this.addtransactionForm.value.amount);
    this.mainTotalValue =  this.mainTotalValue - Number(this.deductionValue);
    console.log(Number(this.totalamount));
    console.log(this.mainTotalValue);
    console.log(Number(this.deductionValue)); 
  }
  
  editcalculation(index)
  {
    this.totalamount=0;
    console.log(this.editTransactionForm.value.add.length);
    for(let i=0;i< this.editTransactionForm.value.add.length; i++)
    {
        if(this.editTransactionForm.value.add[i].add_type == '1')
        {
          this.totalamount= this.totalamount + (Number(this.editTransactionForm.value.amount) / 100)* Number(this.editTransactionForm.value.add[i].add_digit);
        }else{
          this.totalamount=this.totalamount + Number(this.editTransactionForm.value.add[i].add_digit); 
        }
    }
    this.deductionValue=0;
    for(let i=0;i< this.editTransactionForm.value.remove.length; i++)
    {
      if(this.editTransactionForm.value.remove[i].remove_type == '1')
      {
        this.deductionValue = this.deductionValue + (Number(this.editTransactionForm.value.amount) / 100)* Number(this.editTransactionForm.value.remove[i].remove_digit);
      }else{
        this.deductionValue = this.deductionValue + Number(this.editTransactionForm.value.remove[i].remove_digit);     
        // console.log(this.mainTotalValue);
      }
    }
    this.mainTotalValue = Number(this.totalamount) + Number(this.editTransactionForm.value.amount);
    this.mainTotalValue =  this.mainTotalValue - Number(this.deductionValue);
    this.editTransaction_data[0]['totalAmount']=this.mainTotalValue;
    //  console.log(); 
    // console.log(Number(this.totalamount));
    console.log(this.mainTotalValue);
    // console.log(Number(this.deductionValue));
  }

  editTransactionData(transaction_id)
  {
      this.transaction_id=transaction_id;
      this.editTransaction=true;
      this.user_service.getEditTransactionData(transaction_id).subscribe((data)=>{
      this.editTransaction_data=data['transaction'];
      this.editAddtional=data['additonal'];
      this.editDeduction=data['deduction'];
      this.income=data['Income'];
      this.expence=data['Expence'];
      this.property_data=data['property'];
      this.vendor=data['Vender'];
      this.unitData=data['unit_data'];
      this.tenant_data=data['tenant_details'];
      console.log(data);
      if(this.editAddtional.length !=0)
      {
        for(var i=0;i<this.editAddtional.length;i++)
        {
          this.editAdditonalForm(1,this.editAddtional[i]['add_text'],this.editAddtional[i]['add_digit']);
        }
        
      }else
      {
         this.editAdditonalForm(1,'','');
      }

      if(this.editDeduction.length !=0)
      {
        for(var i=0;i<this.editDeduction.length;i++)
        {
          this.editAdditonalForm(0,this.editDeduction[i]['remove_text'],this.editDeduction[i]['remove_digit']);
        }
        
      }else
      {
        this.editAdditonalForm(0,'','');
      }
      
      });
  }

  saveEditTransaction()
  {
    this.transactionSubmit=true;
    console.log(this.editTransactionForm.value);
    if(this.editTransactionForm.valid)
    {

     console.log(this.editTransactionForm.value);
      var  formData = new FormData();
      //console.log(this.transactionbDocImg[0]);
      // console.log(this.transactionbDocImg);
      if(this.transactionbDocImg !=undefined)
      {
        formData.append('transaction_file',this.transactionbDocImg[0]);
      }
      formData.append('id',this.transaction_id); 
      formData.append('payment_date',this.editTransactionForm.value.payment_date);
      formData.append('amount',this.editTransactionForm.value.amount);
      formData.append('start_period',this.editTransactionForm.value.start_period);
      formData.append('end_period',this.editTransactionForm.value.end_period);
      formData.append('transaction_type',this.editTransactionForm.value.transaction_type);
      formData.append('vender_name',this.editTransactionForm.value.vender_name);
      formData.append('property_id',this.editTransactionForm.value.property_document);
      formData.append('unit_id',this.editTransactionForm.value.unit_number); 
      formData.append('tenant_id',this.editTransactionForm.value.tenant_name); 
      formData.append('add',JSON.stringify(this.editTransactionForm.value.add)); 
      formData.append('remove',JSON.stringify(this.editTransactionForm.value.remove));  
      formData.append('note',this.editTransactionForm.value.note); 
      formData.append('payment_status',this.editTransactionForm.value.payment_status); 
      formData.append('payment_type',this.editTransactionForm.value.payment_method); 
      formData.append('totalAmount',this.editTransactionForm.value.totalValue); 
      $(".overlayDivLoader").css('display','block');
      this.user_service.saveEditTeansactionData(formData).subscribe((data)=>{
      this.toastr.successToastr('Transaction successfully Update ', 'Success!');
      console.log(data);
      this.transactionSubmit=false;
      this.ngOnInit();
      $(".overlayDivLoader").css('display','none');
      this.addtransactionForm.reset();
      this.editTransactionForm.reset();
      });
      // $(".transactionPage").scrollTop(0,0);
      // $('.content').toggleClass('scrolled', $(this).scrollTop() > 50);
     
    }
   
  }
  // checkPaymentSatues(payment_index)
  // {
    
  //   if(payment_index == '0')
  //   {
  //    this.addtransactionForm.controls['payment_method'].setValidators([]);
  //     this.payment_type=false;
  //   }else{
  //     this.addtransactionForm.controls['payment_method'].setValidators([Validators.required]);
  //     this.payment_type=true;
  //   }
    
  // }
   /********************************Add Transaction Data:END ****************************************** */
  
}
