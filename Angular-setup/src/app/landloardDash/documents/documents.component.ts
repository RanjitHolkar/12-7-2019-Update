import { Component, OnInit } from '@angular/core';
import{UserService}from '../../_services/user.service';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as mygloabal  from '../../mygloabal';
declare var $:any;
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  docdetails:any;
  addbt:number=0;
  properties:any;
  Documentform:FormGroup;
  doctype:FormGroup;
  unittype:any;
  documenttype:any;
  files:File;
  unitdata:any;
  tenantdata:any;
  submitted = false;
  Url:string;







  constructor(public userservice:UserService,private formBuilder: FormBuilder,public toastr:ToastrManager) {
  
    
   
   }

  ngOnInit() {
    this.Url=mygloabal.Url;
    this.getAllDocumentDetails();
    this.getPropertyName();
    this.getDocumentType();
    
    this.doctype=this.formBuilder.group({
      documenttype:['',Validators.required]
    })

    this.Documentform= this.formBuilder.group({
      document_name:['',Validators.required],
      property_id:['',Validators.required],
      tenant_id:['',Validators.required],
      id:['',Validators.required],
       type:['',Validators.required],
       file:['',Validators.required]
      });
   
  }
  get f()
  { return this.Documentform.controls ;}
  
  getAllDocumentDetails()
  {
    this.userservice.getAllDocumentDetails().subscribe((data)=>{
      this.docdetails=data;
     
    })
  }

  getPropertyName()
  {
      this.userservice.getPropertyName().subscribe((data)=>{
          this.properties=data;
          console.log(data);
      })
  }

  getTenant(id:number)
  {
    // console.log(id);
      this.userservice.getTenant(id).subscribe((data)=>{
      this.tenantdata=data;
       console.log(data);
      })
  }

  getUnit(id:number)
  {
      this.userservice.getUnit(id).subscribe((data)=>{
       this.unitdata=data;
       console.log(data);
      })
  }

  addDocType(data:any)
  {
    this.userservice.addDocType(data).subscribe((data)=>{
      console.log(data);
     if(data==1)
     { 
        this.getDocumentType();
     }
   })
  }

  getDocumentType()
  {
    let data;
    this.userservice.getDocumentType(data).subscribe((data)=>{
      console.log(data);
      this.documenttype=data.document_type;
    })
  }

  uploadDFile(file)
  {
    this.files=file.item(0);
    console.log(this.files);
  }

  addDocument(data:any)
  {
  console.log(data);
    this.submitted = true;
    let  adddocumentdata:any;
       if (this.Documentform.invalid) {
        return;
       }
     adddocumentdata = new FormData();
      adddocumentdata.append('selectFile',this.files,this.files.name);
      adddocumentdata.append('tenant_id',data.tenant_id);
      adddocumentdata.append('property_id',data.property_id);
      adddocumentdata.append('document_name',data.document_name);
       adddocumentdata.append('type',data.type);
       adddocumentdata.append('unit_id',data.id);

    this.userservice.addNewDocument(adddocumentdata).subscribe((data)=>{
      console.log(data);
      this.submitted=false;
      this.toastr.successToastr('Document added successfully ', 'Success!');
      this.addbt=0;
     console.log(this.Documentform);
      this.ngOnInit();
     })
 
  }

  deleteDoc(id:number)
  {
    console.log(id);
      return this.userservice.deleteDoc(id).subscribe((data)=>{
        if(data==1)
        {  
          this.toastr.successToastr('Document deleted successfully ', 'Success!');
           this.getAllDocumentDetails();
        }
      })
  }

 

}
