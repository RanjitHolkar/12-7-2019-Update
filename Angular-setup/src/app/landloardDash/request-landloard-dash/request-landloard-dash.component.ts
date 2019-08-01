import { Component, OnInit } from '@angular/core';
import { LandlordService } from '../../_services/landlord.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-request-landloard-dash',
  templateUrl: './request-landloard-dash.component.html',
  styleUrls: ['./request-landloard-dash.component.css']
})
export class RequestLandloardDashComponent implements OnInit {
  data: any[] = [];
  searchForm: FormGroup;
  decline_data: any[];
  accept_data: string;
  accept_decline_data: any;
  config: any;
  info: {};
  indexRow: number;
  allData:any;
  options = ['Pending', 'Accepted', 'Declined'];
  changeStatusId: any;
  statusid: {};
  id: any;
  updateStatus: any;
  delete = false;
  deleteIndex: number;
  filterData: any;
  arrayIndex: number;
  tenant_id: any;
  searchText;
  constructor(private landlordService: LandlordService, public toastr: ToastrManager, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder, ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.data.length
    };
  }
  ngOnInit() {
    this.get_request_data();
    this.searchForm = this.formBuilder.group({
      searchData: [''],
      optionSelect: ['']
    })
  }
  get_request_data() {
    this.landlordService.get_request_data().subscribe((res: any) => {
      this.data = res;
      
      this.filterData=res;
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  accept_decline_request_status(item, status, tenant_id) {

    this.info = { 'id': item.id, 'status': status,'tenant_id':tenant_id };
    this.landlordService.accept_decline_request_status(this.info).subscribe((res: any) => {
      // this.accept_decline_data = res;
      console.log(res);
      if (res.status) {
        status == 'accept' ? this.toastr.successToastr('Accepted!.', 'Success!') : this.toastr.successToastr('Declined!.', 'Success!');
        status == 'accept' ? item.status = 1 : item.status = 2;
      }
    }, (error) => {
      console.log(error);
    })
  }
  onOptionSelected(event) {
    console.log(event);
  }

  search(term: string) {
    console.log(term);
    if(!term) {
      this.allData = this.filterData;
    } else {
      this.allData = this.filterData.filter(x => 
         x.userName.trim().toLowerCase().includes(term.trim().toLowerCase())
      ); 
    }
    console.log(this.allData);
    this.data=this.allData;
  }
  onSearch() {
    let res = this.searchForm.value;
    console.log(res);
    // if (res.searchData == '' && res.optionSelect == null) {
    //   this.toastr.errorToastr('Please enter atleast one field for filter  !!!.', 'Oops!');
    // }
  
      this.searchForm = new FormGroup({
        searchData: new FormControl(res.searchData),
        optionSelect: new FormControl(res.optionSelect)
      })
      console.log(this.searchForm.value);
      this.landlordService.searchRequestData(this.searchForm.value).subscribe((res: any) => {
        this.data = res;
        this.filterData = res;
        this.search(this.searchForm.value.searchData);
      });
    
  }
  deleteRequestStatus(id, arrayIndex, updateStatus,a ,tenant_id) {
    this.changeStatusId = id;
    this.tenant_id=tenant_id;
    this.arrayIndex = arrayIndex;
    this.updateStatus = updateStatus;
    console.log(this.updateStatus);
    $('#deleteModal').modal('show');
  }
  deleteRequestStatusConfiramtion() {
    console.log({ id: this.changeStatusId, status: this.updateStatus ,tenant_id:this.tenant_id});
    this.landlordService.deleteRequestStatusConfiramtion({ id: this.changeStatusId, status: this.updateStatus }).subscribe((response) => {
      // console.log(this.statusid);
      console.log('jsdg',response);
      if (!!response) {
        this.toastr.successToastr('Request deleted successfully!!!', 'Success!');
        $('#deleteModal').modal('hide');
        this.data.splice(this.arrayIndex, 1);
      }
    });
  }
}
