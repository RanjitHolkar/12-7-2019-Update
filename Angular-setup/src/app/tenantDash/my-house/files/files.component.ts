import { Component, OnInit } from '@angular/core';
import {TenantService } from '../../../_services/tenant.service';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Url} from '../../../mygloabal';



@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
 public files_data:any;
 public tenantDocument=false;
 public land_id:any;
 public documentType:any;
 public addTenantDocumentForm:FormGroup;
 public addFilesSubmit:any;
 public unitData:any;
 public unit_id:any;
 public Doument:any;
 public url=Url;
  constructor(private tenantService:TenantService,private formBuilder:FormBuilder,private toastr:ToastrManager) { }

  ngOnInit() {
    
    /* Files Details Section :Start */
    this.addTenantDocumentForm = this.formBuilder.group({
      document_name:['',Validators.required],
      document_type:['',Validators.required],
      document_file:['',Validators.required]
    });
    /* Files Details Section :END */

    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.land_id=data['landlord_details']['id'];
    this.unitData=data['unit_data'][0];
    this.unit_id=this.unitData['id'];
    });
    this.tenantService.getFilesDetails().subscribe((data)=>{
      this.files_data=data;
      });
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
       this.ngOnInit();
       this.addFilesSubmit=false;
       this.tenantDocument=false;
       //this.documentType=data['document_type'];
       });
    }
    
  }
  detectDocumentFile(event:any)
  {
    this.Doument=event.target.files;
  }
  cancelTenantDocumentPopup()
  {
    this.tenantDocument=false;
  }

}
