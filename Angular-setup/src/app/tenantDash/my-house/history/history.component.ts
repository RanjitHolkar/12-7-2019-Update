import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../_services/tenant.service';
import * as jspdf from 'jspdf';  
import {ActivatedRoute} from "@angular/router";

import html2canvas from 'html2canvas'; 
declare var $:any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
 public transactionHistory:any;
 public transaction:any;
 public additonal:any;
 public deduction:any;


  constructor(private tenantService:TenantService) { }

  ngOnInit() {
    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.transactionHistory=data['transaction_data'];
    });
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
}
