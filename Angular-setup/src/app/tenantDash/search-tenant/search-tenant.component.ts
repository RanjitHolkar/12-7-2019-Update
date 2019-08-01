import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { TenantService } from '../../_services/tenant.service';
import { Url } from '../../mygloabal';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
// import { AgGridModule } from 'ag-grid-angular';
declare var $: any;
@Component({
  selector: 'app-search-tenant',
  templateUrl: './search-tenant.component.html',
  styleUrls: ['./search-tenant.component.css']
})
export class SearchTenantComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages = [];
  searchForm: FormGroup;
  searchlandForm: FormGroup;
  sendInvitationFormPhone: FormGroup;
  sendInvitationForm: FormGroup;
  allsearchData: any;
  norecords: any;
  url: any;
  unitDetailsDiv: any;
  unitData: any;
  countImg: any;
  unitImges: any;
  data: any;
  findLandlord = true;
  placeHolder = 'Enter Landlord Name';
  keyword = 'name';
  property_data: any;
  unit_data: any;
  submit = false;
  inviteFormSubmit = false;
  userInfo: any;
  userName: any;

  constructor(private tenantServices: TenantService, public toastr: ToastrManager, public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.galleryOptions = [{ width: '600px', height: '400px', thumbnailsColumns: 4, imageAnimation: NgxGalleryAnimation.Slide },
    { breakpoint: 800, width: '100%', height: '600px', imagePercent: 80, thumbnailsPercent: 20, thumbnailsMargin: 20, thumbnailMargin: 20 },
    { breakpoint: 400, preview: false }
    ];

    this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.userInfo['userinfo']['userName'];
    this.url = Url;
    this.unitDetailsDiv = false;
    this.norecords = false;
    this.searchForm = new FormGroup({
      propertyName: new FormControl(''),
      propertyType: new FormControl(''),
      unit_no: new FormControl(''),
      unit_type: new FormControl(''),
      city: new FormControl('')
    })

    this.searchlandForm = this.formBuilder.group({
      landlord_id: ['', Validators.required],
      Property_id: ['', Validators.required],
      unit_id: ['', Validators.required]

    });

    this.sendInvitationForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      messgae: ['', Validators.required]

    });
    this.sendInvitationFormPhone = this.formBuilder.group({
      phone: ['',Validators.required],
      messgae: ['', Validators.required]

    });

    this.searchProperties();

  }
  searchPropertyPopUp() {
    this.findLandlord = false;
  }
  get f() {
    return this.searchlandForm.controls;
  }
  get form() {
    return this.sendInvitationForm.controls;
  }
  get formphone() {
    return this.sendInvitationFormPhone.controls;
  }
  searchProperties() {
    this.tenantServices.serachPropertyList(this.searchForm.value).subscribe((data) => {
      this.allsearchData = data;
      if (data.length == 0) {
        this.norecords = true;
      }
      console.log(data);

    });
    // console.log(this.searchForm.value);
  }
  unitDetailsDisplay(unit_id) {
    this.tenantServices.getUnitDetails(unit_id).subscribe((data) => {
      this.unitData = data.unit_data;
      console.log('unitData',this.unitData);
      this.unitImges = data.unit_imges;
      this.galleryImages = [];
      for (let index = 0; index < this.unitImges.length; index++) {
        console.log(this.unitImges[index]['home_img']);
        this.galleryImages.push({ small: this.url + this.unitImges[index]['home_img'], medium: this.url + this.unitImges[index]['home_img'], big: this.url + this.unitImges[index]['home_img'] });
      }
      this.unitDetailsDiv = true;
      this.countImg = data.unit_imges.length;
    });
  }
  /*Hide Unit Details Div:Start*/
  hideUnitDetailsDiv() {
    this.unitDetailsDiv = false;
  }
  /*Hide Unit Details Div:End*/
  selectEvent(item) {
    this.property_data = [];
    this.unit_data = [];
    this.tenantServices.get_Properties(item.id).subscribe((data) => {
      this.property_data = data;
      this.unit_data = [];
    });

  }

  onChangeSearch(val: string) {

  }
  hideSearchLandPop() {
    this.findLandlord = true;
    $('#myModal').modal('hide');
    this.searchlandForm.reset();
    
  }
  onFocused(e) {

  }
  sendInvation(status) {
    if(status == 0)
    {
      $('#myModal').modal('hide');
    $('#sendInvitaionEmail').modal('show');
    }
    if(status == 1)
    {
      $('#myModal').modal('hide');
      $('#sendInvitaionPhone').modal('show');
    }
   
  }

  hideSendInvitationForm() {
    $('#myModal').modal('show');
    $('#sendInvitaionEmail').modal('hide');
    $('#sendInvitaionPhone').modal('hide');
    this.sendInvitationFormPhone.reset();
    this.sendInvitationForm.reset();
    this.inviteFormSubmit=false;
  }
  sendNewRequest() {
    this.submit = true;
    if (this.searchlandForm.valid) {
      $('.overlayDivLoader').show();
      var data = { "unit_id": this.searchlandForm.value.unit_id, "property_id": this.searchlandForm.value.Property_id, "landlord_id": this.searchlandForm.value.landlord_id.id };
      this.tenantServices.saveRequest(data).subscribe((data) => {
        console.log(data);
        this.toastr.successToastr('Request Send successfully ', 'Success!');
        this.searchlandForm.reset();
        this.findLandlord = true;
        this.submit = false;
        this.data = [];
        this.searchProperties();
        $('#myModal').modal('hide');
        $('.overlayDivLoader').hide();
      });
    }
    // console.log(this.searchlandForm.value.landlord_id.id);

  }
  sendRequest(unit_id, P_id, landlord_id) {

    $('.overlayDivLoader').show();
    var data = { "unit_id": unit_id, "property_id": P_id, "landlord_id": landlord_id };
    this.tenantServices.saveRequest(data).subscribe((data) => {
      console.log(data);
      this.toastr.successToastr('Request Send successfully ', 'Success!');
      this.ngOnInit();
      $('.overlayDivLoader').hide();
      
    });
  }
  showFindLandlordPopup() {
    this.tenantServices.serachLandlord('').subscribe((data) => {
      this.data = data;
    });
    this.findLandlord = false;
    $('#myModal').modal('show');
  }
  getUnit(property_id) {
    this.tenantServices.getUnitData(property_id).subscribe((data) => {
      this.unit_data = data;
      console.log(this.unit_data);
    });
  }
  sendInvitation(status) {
    if(status == 0)
    {
      this.inviteFormSubmit = true;
      if (this.sendInvitationForm.valid) {
        $('.overlayDivLoader').show();
        this.tenantServices.inviteLandlord(this.sendInvitationForm.value).subscribe((data) => {
          this.findLandlord = true;
          this.toastr.successToastr('Request Send successfully ', 'Success!');
          $('#sendInvitaionEmail').modal('hide');
          this.inviteFormSubmit = false;
          this.sendInvitationForm.reset();
          $('.overlayDivLoader').hide();
        });
      }
    }
    if(status == 1)
    {
      this.inviteFormSubmit = true;
      if (this.sendInvitationFormPhone.valid) {
        $('.overlayDivLoader').show();
        this.tenantServices.inviteLandlordPhone(this.sendInvitationFormPhone.value).subscribe((data) => {
          this.findLandlord = true;
          console.log(data);
          // this.toastr.successToastr('Request Send successfully ', 'Success!');
          // $('#sendInvitaionPhone').modal('hide');
          // this.inviteFormSubmit = false;
          // this.sendInvitationForm.reset();
           $('.overlayDivLoader').hide();
        });
      }
    }
   
  }
}
