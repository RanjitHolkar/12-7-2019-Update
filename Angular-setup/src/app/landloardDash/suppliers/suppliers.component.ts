import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import {LandlordService} from '../../_services/landlord.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $:any
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  addDesignationFrom: FormGroup;
  addsuppliersFrom :FormGroup;
  editsuppliersFrom:FormGroup;
  submitted = false;
  submit=false;
  editsubmit= false;

  public addPropertiesDiv:Boolean=false;
  public data : any;
  public loginMainDiv:any;
  public designation:any;
  public supplier_data:any;
  public supplier_edit_data:any;
  public editsuppliersId:any;
  constructor(private landServices:LandlordService,public toastr: ToastrManager,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.addDesignationFrom = this.formBuilder.group({
      desname: ['', Validators.required]
      
  });
  this.landServices.getDesignation('').subscribe((data)=>{ 
    console.log(data);  
      this.designation=data; 
    });
    this.landServices.getSuppliersList().subscribe((data)=>{ 
      console.log('data');
      this.supplier_data=data;              
    });
  this.addsuppliersFrom = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
    phone: ['', Validators.required],
    designation: ['', Validators.required]

    
});
this.editsuppliersFrom = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', [Validators.required,Validators.email]],
  phone: ['', Validators.required],
  designation: ['', Validators.required]

  
});


    this.loginMainDiv=true;
  }
  get f() { return this.addDesignationFrom.controls; }
  get from_err() { return this.addsuppliersFrom.controls; }
  get from_error() { return this.editsuppliersFrom.controls; }
  showAddpropertiesDiv(){
    this.landServices.getDesignation('').subscribe((data)=>{ 
     console.log(data);  
     $('#myModal').modal('show');
       this.loginMainDiv=false;
       this.designation=data; 
     });
    

  }
  hideAddpropertiesDiv(){

    $('#myModal').modal('hide');
    this.loginMainDiv=true;

  }
  addDesignation()
  {
    $('#designationModel').modal('show');
    $('#myModal').modal('hide');
  }
  hideAddDesignationDiv()
  {
    $('#designationModel').modal('hide');
    $('#myModal').modal('show');
  }
  addDesignationSave()
  {
    this.submitted = true;

    if (this.addDesignationFrom.invalid) {
           return false;
        }
        this.landServices.addDesignationNew(this.addDesignationFrom.value).subscribe((data)=>{ 
          console.log(data);
         if(data == true)
         {

          $('#designationModel').modal('hide');
          $('#myModal').modal('show');
          this.showAddpropertiesDiv();
          this.addDesignationFrom.reset();
          this.toastr.successToastr('Designation added successfully ', 'Success!');
          this.submitted = false;
          // this.ngOnInit();
         }
                  
        });
        
  }
  addsuppliersSave()
  {
    this.submit=true;
    if(this.addsuppliersFrom.invalid) 
    {
      return false;
    }
    this.landServices.addsuppliersNew(this.addsuppliersFrom.value).subscribe((data)=>{ 
      console.log(data);
     if(data == true)
     {
      $('#myModal').modal('hide');
      this.loginMainDiv=true;
      this.submit = false;
      this.toastr.successToastr('Suppliers added successfully ', 'Success!');
      this.ngOnInit();
     }
              
    });
   
  }

  editsuppliers(id)
  {
    this.editsuppliersId=id;
    this.landServices.getEditSuppliersData(id).subscribe((data)=>{ 
      console.log(data);
      this.supplier_edit_data=data;          
    });
    $('#editModal').modal('show');
  }
  hideeditpropertiesDiv()
  {
    $('#editModal').modal('hide');
    this.ngOnInit();
  }
  EditsuppliersSave()
  {
    this.editsubmit=true;
    if(this.editsuppliersFrom.invalid) 
    {
      return false;
    }
    var alldata={'id':this.editsuppliersId,'data':this.editsuppliersFrom.value};
    this.landServices.saveEditSuppliersData(alldata).subscribe((data)=>{ 
      console.log(data);
     
     if(data == true)
     {
      $('#editModal').modal('hide');
      this.editsubmit = false;
      this.ngOnInit();
      this.toastr.successToastr('Suppliers update successfully ', 'Success!');
     }
              
    });

  }
  deletesuppliers(id)
  {
    this.editsuppliersId=id;
    $('#supplier_model').modal('show');
  }
  deleteconfirm_supplier()
  {
    this.landServices.deleteConfirmSupplier(this.editsuppliersId).subscribe((data)=>{ 
      console.log(data);
      $('#supplier_model').modal('hide');
      this.ngOnInit();
    });
  }

}
