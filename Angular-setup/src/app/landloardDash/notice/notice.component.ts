import { Component, OnInit } from '@angular/core';
import { LandlordService } from '../../_services/landlord.service';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications'
import { Url } from '../../mygloabal';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  files=[];
  urls:any;
  noticeData:any;
  propertyList:any;
  addNoticeForm: FormGroup;
  submitted=false;
  url=Url;

  constructor(private landlord_service:LandlordService,private formBuilder:FormBuilder,private toastr:ToastrManager) { }

  ngOnInit() {
    this.addNoticeForm=this.formBuilder.group({
      'title':['',Validators.required],
      'description':['',Validators.required],
      'property_id':['',Validators.required]


    })

    this.landlord_service.getNotice().subscribe(res=>{
      this.noticeData=res['notice'];
      console.log(this.noticeData);
      this.propertyList=res['propertylist'];
    })
  }

  get f(){ return  this.addNoticeForm.controls}

  fileChangeEvent(event)
  {      
   
    this.files = event.target.files;

    if (this.files) {
      for (let file of this.files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls=e.target.result;
        }
        console.log(this.urls);
        reader.readAsDataURL(file);
      console.log(this.urls);
      }
    }
    this.files = event.target.files;
   
    if (this.files) {
      console.log(this.files);

        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls=e.target.result;
          console.log(e.target.result);
        reader.readAsDataURL(this.files[0]);
      
      }
    }

  }
  addNotice()
  {
    this.submitted=true;
    if(this.addNoticeForm.valid)
    {
      var formData=new FormData();
      if(this.files.length !=0)
      {
       formData.append('selectFile',this.files[0]);
      }
      formData.append('selectFile',this.addNoticeForm.value.property_id);
      formData.append('property_id',this.addNoticeForm.value.property_id);
      formData.append('title',this.addNoticeForm.value.title);
      formData.append('description',this.addNoticeForm.value.description);
      this.landlord_service.addNewNotice(formData).subscribe(res=>{
        this.toastr.successToastr('Notice Send successfully ', 'Success!');
        this.submitted=false;
        this.files=[];
        this.urls='';
        this.ngOnInit();
      })
    }

  }

}
