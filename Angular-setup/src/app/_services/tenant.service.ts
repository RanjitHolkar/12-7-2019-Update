import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import * as mygloabal  from'../mygloabal';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private BaseUrl :string;

  constructor(private http: HttpClient) {

    this.BaseUrl=mygloabal.BaseUrl;
   }

   addLandStaff(info:any){
    return this.http.post<any>(this.BaseUrl +'addLandStaff',info).pipe(map((res:any)=>{
      return res;
    }));
  }
  serachPropertyList(info:any){
    return this.http.post<any>(this.BaseUrl +'search_properties',info).pipe(map((res:any)=>{
      return res;
    }));
  }
  getUnitDetails(info:any){
    return this.http.post<any>(this.BaseUrl +'get_unit_Deatils',info).pipe(map((res:any)=>{
      return res;
    }));
  }
  
  saveRequest(info:any){
    return this.http.post<any>(this.BaseUrl +'send_request_land',info).pipe(map((res:any)=>{
      return res;
    }));
  }
  getTenantServiceData(){
    return this.http.get<any>(this.BaseUrl +'getTenantServiceData').pipe(map((res:any)=>{
      return res;
    }));
  }
  addRequest(info:any)
  {
    return this.http.post<any>(this.BaseUrl +'add_new_Request',info).pipe(map((res:any)=>{
      return res;
    }));
  }
  editRequest(info:any)
{
  return this.http.post<any>(this.BaseUrl+"saveEditRequest",info).pipe(map(res=>{
    return res;
  }))
}
  
getTransactionDetails()
{
  return this.http.get<any>(this.BaseUrl+"get_transaction_data").pipe(map(res=>{
    return res;
  }))
}
getTenantDocumnets()
{
  return this.http.get<any>(this.BaseUrl+"get_tenant_document").pipe(map(res=>{
    return res;
  }))
}

getleaseDetails()
{
  return this.http.get<any>(this.BaseUrl+"get_lease_details").pipe(map(res=>{
    return res;
  }))
}

getFilesDetails()
{
  return this.http.get<any>(this.BaseUrl+"get_files_details").pipe(map(res=>{
    return res;
  }))
}

getDocumnetType(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_document_type",info).pipe(map(res=>{
    return res;
  }))
}

saveAddTenantDocument(info:any)
{
  return this.http.post<any>(this.BaseUrl+"saveTenantDocument",info).pipe(map(res=>{
    return res;
  }))
}
getReciptData(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_generat_recipt",info).pipe(map(res=>{
    return res;
  }))
}

serachLandlord(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_serach_landlord",info).pipe(map(res=>{
    return res;
  }))
}

get_Properties(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_land_properties",info).pipe(map(res=>{
    return res;
  }))
}

getUnitData(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_unit_details_tenent",info).pipe(map(res=>{
    return res;
  }))
}

inviteLandlord(info:any)
{
  return this.http.post<any>(this.BaseUrl+"invite_landlord",info).pipe(map(res=>{
    return res;
  }))
}

inviteLandlordPhone(info:any)
{
  return this.http.post<any>(this.BaseUrl+"invite_landlord_phone",info).pipe(map(res=>{
    return res;
  }))
} 

sendPersonalMessage(info:any)
{
  return this.http.post<any>(this.BaseUrl+"savePersonalMsgTenant",info).pipe(map(res=>{
return res;
  }))
}

getMessageLand()
{
  return this.http.get<any>(this.BaseUrl+"get_message_land").pipe(map(res=>{
  return res;
  }))
}

getAllMessage(info:any)
{
  return this.http.post<any>(this.BaseUrl+'get_all_message',info).pipe(map(res=>{
    return res;
  }))
}
saveTeantMsg(info:any)
{
  return this.http.post<any>(this.BaseUrl+"save_Tenant_msg",info).pipe(map(res=>{
    return res;
  }))
}
getChatMsg()
{
  return this.http.get<any>(this.BaseUrl+"get_personal_chat_msg").pipe(map(res=>{
    return res;
  }))
}
getNotice()
{
  return this.http.get<any>(this.BaseUrl + "getNotice").pipe(map((res:any)=>{
    return res;
  }))
}
getChatUserTenant()
{
  return this.http.get<any>(this.BaseUrl + "getChatUserTenant").pipe(map((res:any)=>{
    return res;
  }))
}
getAllNotification()
{
  return this.http.get<any>(this.BaseUrl + "getAllNotification").pipe(map((res:any)=>{
    return res;
  }))
}

getTransactionType(info)
{
  return this.http.post<any>(this.BaseUrl + "getTransactionType",info).pipe(map((res:any)=>{
    return res;
  }))
}

//save Tenant Added Transaction
saveAddTransaction(info:any)
{
  return this.http.post<any>(this.BaseUrl + "saveAddTransaction",info).pipe(map((res:any)=>{
    return res;
  }))

}
sendPayementRequest(info)
{
  return this.http.post<any>(this.BaseUrl+'sendPaymentRequest',info).pipe(map(res=>{
    return res;
  }))
}

/*this service for Check transaction completed or Not */
checkConfirmation(info:any)
{
  return this.http.post<any>(this.BaseUrl+'checkConfirmation',info).pipe(map(res=>{
    return res;
  }))
}

}
