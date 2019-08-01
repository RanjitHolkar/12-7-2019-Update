import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import * as mygloabal  from '../mygloabal';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BaseUrl :string;

  constructor(private http: HttpClient) {

    this.BaseUrl=mygloabal.BaseUrl;
   }

register(info:any){
  return this.http.post<any>(this.BaseUrl +' ',info).pipe(map((res:any)=>{
    return res;
  }));
}

signUpAsLandlord(info:any){

  return this.http.post<any>(this.BaseUrl +"signUpAsLandlord",info).pipe(map(res=>{
    
       return res;
  }));

}

signUpAsTenant(info:any){

  return this.http.post<any>(this.BaseUrl +"signUpAsTenant",info).pipe(map(res=>{
    
    return res;
  }));

}

forgotPassword(info:any){
  return this.http.post<any>(this.BaseUrl +"forgotPassword",info).pipe(map(res=>{
    
    return res;
  }))
}

changePassword(info:any){

  return this.http.post<any>(this.BaseUrl +"changePasswordByLink",info).pipe(map(res=>{
    
    return res;
  }))
}

//-------- get dropdwon val ( like  country , state ,city )

getDorpdownList(){
 

  return this.http.get<any>(this.BaseUrl+"getDorpdownList").pipe(map((res:any)=>{
    return res;
  }));

}
//--- 

addProperties(info:any){

  return this.http.post<any>(this.BaseUrl +"addProperties",info).pipe(map(res=>{
    
    return res;
  }))
}

//---  getPropertyCrByLand

getPropertyCrByLand(){

  return this.http.get<any>(this.BaseUrl +"getPropertyCrByLand").pipe(map(res=>{
    
    return res;
  }))
}

updateProfileInfo(info:any){
  
  return this.http.post<any>(this.BaseUrl +"updateProfileInfo",info).pipe(map(res=>{
    
    return res;
  }))
}

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
insert_unitData(info:any){
  
  return this.http.post<any>(this.BaseUrl +"inset_unit_data",info).pipe(map(res=>{
    
    return res;
  }))
}
getUnit_data(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_unit_data",info).pipe(map(res=>{
    
    return res;
  }))
}
getDoument(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_document",info).pipe(map(res=>{
    
    return res;
  }))
}
getHomeImages(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_all_Images",info).pipe(map(res=>{
    
    return res;
  }))
}
delete_imageHome(info:any){
  
  return this.http.post<any>(this.BaseUrl +"delete_home_image",info).pipe(map(res=>{
    
    return res;
  }))
}
AddHouseImg(info:any){
  
  return this.http.post<any>(this.BaseUrl +"add_unit_img",info).pipe(map(res=>{
    
    return res;
  }))
}
delete_document(info:any){
  
  return this.http.post<any>(this.BaseUrl +"delete_Document_data",info).pipe(map(res=>{
    
    return res;
  }))
}
insert_lease(info:any){
  
  return this.http.post<any>(this.BaseUrl +"insert_lease_data",info).pipe(map(res=>{
    
    return res;
  }))
}
getEditleasedata(info:any){
  
  return this.http.post<any>(this.BaseUrl +"getEditLeaves_data",info).pipe(map(res=>{
    
    return res;
  }))
}
saveEditdata(info:any){
  
  return this.http.post<any>(this.BaseUrl +"saveEditLeaves_data",info).pipe(map(res=>{
    
    return res;
  }))
}
get_tenants(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_tenants_data",info).pipe(map(res=>{
    
    return res;
  }))
}
getPropertyData(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_property_data",info).pipe(map(res=>{
    
    return res;
  }))
} 
editProperties(info:any){
  
  return this.http.post<any>(this.BaseUrl +"edit_property_data",info).pipe(map(res=>{
    
    return res;
  }))
}
getsearchdata(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_search_data",info).pipe(map(res=>{
    
    return res;
  }))
}
ExportProperties(info:any){
  
  return this.http.post<any>(this.BaseUrl +"export_properties",info).pipe(map(res=>{
    return res;
  }))
}
getUnitProperties_data(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_unit_properties_data",info).pipe(map(res=>{
    return res;
  }))
}
EditPropertyImage(info:any){
  
  return this.http.post<any>(this.BaseUrl +"edit_properties_image",info).pipe(map(res=>{
    return res;
  }))
}
getOneUnit_data(info:any){
  
  return this.http.post<any>(this.BaseUrl +"get_oneUnit_data",info).pipe(map(res=>{
    return res;
  }))
} 
getTenantDetails(info:any)
{
  return this.http.post<any>(this.BaseUrl +"get_tenant_details",info).pipe(map(res=>{
    return res;
  }))
}

linkTenant(info:any)
{
  return this.http.post<any>(this.BaseUrl +"linkUnitTenants",info).pipe(map(res=>{
    return res;
  }))
}
removeTenant(info:any)
{
  return this.http.post<any>(this.BaseUrl +"removeTenants",info).pipe(map(res=>{
    return res;
  }))
}
saveDocumentType(info:any)
{
  return this.http.post<any>(this.BaseUrl +"save_document_type",info).pipe(map(res=>{
    return res;
  }))
}
getDocumentType(info:any)
{
  return this.http.post<any>(this.BaseUrl +"get_document_type",info).pipe(map(res=>{
    return res;
  }))
}
addNewDocument(info:any)
{

  return this.http.post<any>(this.BaseUrl +"save_new_document",info).pipe(map(res=>{
    return res;
  }))
}
getDocumentDetails(info:any)
{
  return this.http.post<any>(this.BaseUrl +"get_document_details",info).pipe(map(res=>{
    return res;
  }))
}
getUnitImages(info:any)
{
  return this.http.post<any>(this.BaseUrl +"get_unit_images",info).pipe(map(res=>{
    return res;
  }))
}
removeunitImage(info:any)
{
  return this.http.post<any>(this.BaseUrl +"remove_unit_img",info).pipe(map(res=>{
    return res;
  }))
}
addPropDcoumentType(info:any)
{
  return this.http.post<any>(this.BaseUrl +"add_propDoc_type",info).pipe(map(res=>{
    return res;
  }))
}
getPropertyDocType(info:any)
{
  return this.http.post<any>(this.BaseUrl +"get_PropDoc_type",info).pipe(map(res=>{
    return res;
  }))
}
savePropDoc(info:any)
{
  return this.http.post<any>(this.BaseUrl +"save_prop_doc",info).pipe(map(res=>{
    return res;
  }))
}
get_propDoc_details(info:any)
{
  return this.http.post<any>(this.BaseUrl +"get_prop_document",info).pipe(map(res=>{
    return res;
  }))
}

getAllDocumentDetails()
{
  
   return this.http.get<any>(this.BaseUrl +"getalldocumentdetails").pipe(map(res=>{
     console.log(res);
    return res;
  }))
}

getPropertyName()
{
  return this.http.get<any>(this.BaseUrl+"getpropertyname").pipe(map(res=>{
    console.log(res);
    return res
  }))
}

getTenant(id:any)
{
  return this.http.post<any>(this.BaseUrl+"getTenant",id).pipe(map(res=>{
    return res;
  }))
}

getUnit(id:number)
{
  return this.http.post<any>(this.BaseUrl+"getunit",id).pipe(map(res=>{
    return res;
  }))
}


addDocType(data:any)
{
   return this.http.post<any>(this.BaseUrl+"adddoctype",data).pipe(map(res=>{
     return res;
   }))
}

deleteDoc(id:any)
{
  return this.http.post<any>(this.BaseUrl+"deletedocrecord",id).pipe(map(res=>{
    return res;
  }))
}
saveTrsactionType(info:any)
{
  return this.http.post<any>(this.BaseUrl+"saveTrsactionType",info).pipe(map(res=>{
    return res;
  }))
}
getTransactionType()
{
  return this.http.get<any>(this.BaseUrl+"getTransactionData").pipe(map(res=>{
    return res;
  }))
}
getUnitdeatils(unit_id:any)
{
  return this.http.post<any>(this.BaseUrl+"getUnitDeatils",unit_id).pipe(map(res=>{
    return res;
  }))
}
getTenantDeatils(unit_id:any)
{
  return this.http.post<any>(this.BaseUrl+"getTenantDeatils",unit_id).pipe(map(res=>{
    return res;
  }))
}
saveTeansactionData(unit_id:any)
{
  return this.http.post<any>(this.BaseUrl+"saveTeansactionData",unit_id).pipe(map(res=>{
    return res;
  }))
}

getTransactionList()
{
  return this.http.get<any>(this.BaseUrl+"getTransactionList").pipe(map(res=>{
    return res;
  }))
}
getUnitServices(info:any)
{
  return this.http.post<any>(this.BaseUrl+"getServicesData",info).pipe(map(res=>{
    return res;
  }))
}
getUnitServiceData(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_service_data",info).pipe(map(res=>{
    return res;
  }))
}
saveEditRequst(info:any)
{
  return this.http.post<any>(this.BaseUrl+"save_edit_request",info).pipe(map(res=>{
    return res;
  }))
}
sendLandReq(info:any)
{
return this.http.post<any>(this.BaseUrl+"send_land_msg",info).pipe(map(res=>{
  return res;
}))
}

signUpAsLandlordGoogle(info:any)
{
return this.http.post<any>(this.BaseUrl+"signUp_land_google",info).pipe(map(res=>{ 
  localStorage.setItem('currentUser', JSON.stringify({ token: res.token,userinfo:res.userinfo }));
  return "success";
 
}))
}
getReciptData(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_generat_recipt",info).pipe(map(res=>{
    return res;
  }))
}
getEditTransactionData(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_edit_transaction_data",info).pipe(map(res=>{
    return res;
  }))
}
sendEmailRecipt(info:any)
{
  return this.http.post<any>(this.BaseUrl+"send_email_recipt",info).pipe(map(res=>{
    return res;
  }))
}
deleteTransaction(info:any)
{
  return this.http.post<any>(this.BaseUrl+"delete_transaction",info).pipe(map(res=>{
    return res;
  }))
}
get_prop_transaction(info:any)
{
  return this.http.post<any>(this.BaseUrl+"get_prop_transaction",info).pipe(map(res=>{
    return res;
  }))
}
signUpAsTenantGoogle(info:any)
{
  return this.http.post<any>(this.BaseUrl+"signUp_Tenant_google",info).pipe(map(res=>{ 
    localStorage.setItem('currentUser', JSON.stringify({ token: res.token,userinfo:res.userinfo }));
    return "success";
   
  }))
}
activeDeactiveUnit(info:any)
{
  return this.http.post<any>(this.BaseUrl+"active_deactive_unit",info).pipe(map(res=>{ 
   return res;
   
  }))
}

saveEditTeansactionData(info:any)
{
  return this.http.post<any>(this.BaseUrl + "save_edit_transaction",info).pipe(map(res=>{
    return res;
  }))
}

// service for Delete Property
deleteProperty(info:any)
{
  return this.http.post<any>(this.BaseUrl + "deleteProperty",info).pipe(map(res=>{
    return res;
  }))
}
// this service for Save Edit Unit Details
saveEditUnit(info:any)
{
  return this.http.post<any>(this.BaseUrl + "saveEditUnit",info).pipe(map(res=>{
    return res;
  }))
}
// this function for Delete Unit
unitConfirmDelete(info:any)
{
  return this.http.post<any>(this.BaseUrl + "unitConfirmDelete",info).pipe(map(res=>{
    return res;
  }))
}









}
