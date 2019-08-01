import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import{UserService}from '../../_services/user.service';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Url} from '../../mygloabal';
import { error } from 'util';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { P } from '@angular/core/src/render3';
declare var $:any
@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent implements OnInit {
  public addPropertiesDiv:Boolean=false;
  public data : any;
  url=Url;
  newUnitForm:FormGroup;
  newDescriptionArray:FormArray;
  property_image:any;
  submitted = false;
  items:FormArray;
  public newAttribute: any = {};
  public countries:any; 
  public unitType:any;
  public propertyForm:FormGroup;
  public propertyList:any;
 
  public searchForm:FormGroup;
  public urls = new Array<string>();
  public addUnitPopup:Boolean=false;
  public firstField = true;
  public firstFieldName = 'First Item name';
  public isEditItems: boolean;
  noRecordsPopup:any;
  public property_id:any;
//  public HouseFile: File;
// public documentImage:File;

 public HouseFile:string [] = [];
 public documentImages:string [] = [];
 public editPropertiesDiv=false;
 public editpropertyData:any;
 public P_Image:string [] = [];
 public editPropertyImage:any ='';
  
  constructor(public userService:UserService,public toastr: ToastrManager, private formBuilder:FormBuilder) { 
   
     this.getDorpdownList();
     this.propertiesForm();
     this.getPropertyCrByLand();
    
  }

  
   propertiesForm(){
   this.propertyForm = new FormGroup({
      propertyName: new FormControl(''),
      propertyType: new FormControl(''),
      country: new FormControl(''),
      streetName: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl(''),
      landmark: new FormControl(''),
      suburbs:new FormControl(''),
      notes:new FormControl(''),
      phone:new FormControl('')
     });
   }
  
  getDorpdownList(){
    this.userService.getDorpdownList().subscribe((data)=>{ 
      if(data.msg=='success'){
          this.countries=data.catList.countries;
          this.unitType=data.catList.unit_type;    
      }
    });

  }

  getPropertyCrByLand(){

    this.userService.getPropertyCrByLand().subscribe((data)=>{ 
      console.log(data);
              if(data.msg=='success')
              {
                 if(data.properties.length==0)
                 {
                   this.noRecordsPopup=true;
                 }else{
                  this.noRecordsPopup=false;
                 }
                  this.propertyList=data.properties;
              }
    });

  }

  ngOnInit() {
    this.property_image= false;
    this.noRecordsPopup=false;
    this.searchForm = this.formBuilder.group({
      propertyValue: ['']
    }); 
    console.log(this.items);
  }

  showAddpropertiesDiv(){

      this.addPropertiesDiv=true;
  }

  hideAddpropertiesDiv(){

    this.addPropertiesDiv=false;
    this.editPropertiesDiv = false;
    this.ngOnInit(); 
    this.editpropertyData='';

  }

  fileChangeEvent(event:any)
  {
    this.property_image=false;
    this.P_Image=event.target.files;
  }

addProperties(){
let res= this.propertyForm.value;
this.propertyForm = new FormGroup({
  propertyName: new FormControl(res.propertyName,[Validators.required]),
  propertyType: new FormControl(res.propertyType,[Validators.required]),
  country: new FormControl(res.country,[Validators.required]),
  streetName: new FormControl(res.streetName,[Validators.required]),
  city: new FormControl(res.city,[Validators.required]),
  state: new FormControl(res.state,[Validators.required]),
  pincode: new FormControl(res.pincode,[Validators.required]),
  landmark: new FormControl(res.landmark,[Validators.required]),
  suburbs:new FormControl(res.suburbs,[Validators.required]),
  notes:new FormControl(res.notes,[Validators.required]),
  phone:new FormControl(res.phone,[Validators.required]),

});

var  formData = new FormData();
  if(this.P_Image.length != 0)
  {
    for (var i = 0; i < this.P_Image.length; i++) 
    { 
      formData.append("property_image[]",this.P_Image[i]);
    }
   formData.append('propertyName',this.propertyForm.value['propertyName']);
   formData.append('propertyType',this.propertyForm.value['propertyType']);
   formData.append('country',this.propertyForm.value['country']);
   formData.append('streetName',this.propertyForm.value['streetName']);
   formData.append('city',this.propertyForm.value['city']);
   formData.append('state',this.propertyForm.value['state']);
   formData.append('pincode',this.propertyForm.value['pincode']);
   formData.append('landmark',this.propertyForm.value['landmark']);
   formData.append('suburbs',this.propertyForm.value['suburbs']);
   formData.append('notes',this.propertyForm.value['notes']);
   formData.append('phone',this.propertyForm.value['phone']);
   //  formData.append('alldata',res);
    if(this.propertyForm.valid)
    {
      $(".overlayDivLoader").css('display','block');
      this.userService.addProperties(formData).subscribe((data)=>{
        console.log(data);
      if(data.msg=='success')
      {
        this.toastr.successToastr('property added successfully ', 'Success!');
      }
        $(".overlayDivLoader").css('display','none');
        this.ngOnInit();
        this.getPropertyCrByLand();
        this.addPropertiesDiv=false;        
      });
    }
  }else{
    this.property_image=true;
  }
}

numberOnly(event): boolean {
  return this.userService.numberOnly(event);
}

hide_addUnitPopup()
{
  this.addUnitPopup=false;
 
}

// add_filed(): FormGroup {
  
//   return this.formBuilder.group({
//     des:['',Validators.compose([Validators.required])],
//     image:['',Validators.compose([Validators.required])]
//   });
// }
// add_document(): void
// {
//   this.items = this.unitForm.get('items') as FormArray;
//   this.items.push(this.add_filed()); 
 
// }
// mines_document(index)
// {
//   this.items = this.unitForm.get('items') as FormArray;
//     this.items.removeAt(index);
// }

detectFiles(event:any)
{
  for (var i = 0; i < event.target.files.length; i++) 
  { 
    this.HouseFile.push(event.target.files[i]);
  }
}
ChangeEvent(event:any)
{
  this.editPropertyImage=event.target.files[0];
  console.log(this.editPropertyImage);
}
// multipleform(event :any){
//   for (var i = 0; i < event.target.files.length; i++)
//    { 
//     this.documentImages.push(event.target.files[i]);
//    }
  
  
// }

// function for delete Property
deleteProperty(property_id)
{
  alert(property_id);
}

searchPropertyList()
{
  this.userService.getsearchdata(this.searchForm.value).subscribe((data)=>{
  this.propertyList=data;
  console.log(data);
  if(data.length==0)
  {
    this.noRecordsPopup=true;
  }else{
    this.noRecordsPopup=false;
  }             
  });
 console.log(this.searchForm.value);
}
exportPropertyList()
{
  var options = {
    headers: ["Property Name", "Country", "Property Type" , "Street Name" , "City" , "State" ,"Landmark" ,"Pincode" ,"suburbs","notes" ]
  }; 
  this.userService.ExportProperties('').subscribe((data)=>{
    new Angular5Csv(data,'Property List',options);
  });
}
// remove_images(index:any)
// {
//   this.documentImages.unshift(index);
//   //this.documentImages.unshift(index);
// }
// public  randomName() {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < 8; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
//  }
//  // Convert base64 image to byte array
//  public dataURLtoFile(dataurl, filename) {
 
//  let  arr = dataurl.base64.split(',')
//       , mime = arr[0].match(/:(.*?);/)[1]
//       , bstr = atob(arr[1])
//       , n = bstr.length
//       , u8arr = new Uint8Array(n);
//   while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, {
//       type: mime
//   });
//  }

}
 
 

