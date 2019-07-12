<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['api/inset_unit_data']='Api/insert_unit_data';
$route['api/get_document']='Admin/get_document';
$route['api/get_unit_data']='Admin/get_unit_data';
$route['api/get_all_Images']='Admin/get_all_Images';
$route['api/delete_home_image']='Admin/delete_flate_image';
$route['api/add_unit_img']='Admin/add_unit_img';
$route['api/delete_Document_data']='Admin/deleteDocumentData';
$route['api/insert_lease_data']='Admin/insertLeaseData';
$route['api/getEditLeaves_data']='Admin/get_edit_leaves_data';
$route['api/saveEditLeaves_data']='Admin/save_editLeaves_data';
$route['api/get_tenants_data']='Admin/get_tenants_data';
$route['api/linkUnitTenants']='Admin/link_unit_tenants';
$route['api/removeTenants']='Admin/remove_link_tenant';
$route['api/get_property_data']='Admin/get_property_data';
$route['api/edit_property_data']='Admin/editPropertyData';
$route['api/get_search_data']='Admin/get_search_data';
$route['api/get_unit_data_id']='Admin/get_unit_data_id';
$route['api/get_tenant_data_id']='Admin/get_tenant_data_id';
$route['api/save_editTenant']='Admin/save_editTenant';
$route['api/delete_Tenant_data']='Admin/delete_tenant_id';
$route['api/get_lease_data']='Admin/get_lease_data';
$route['api/get_unit_property']='Admin/get_unit_property';
$route['api/get_unit_property_id']='Admin/get_unit_property_id';
$route['api/add_lease_unit']='Admin/add_lease_unit';
$route['api/get_landlord_stafesData']='Admin/get_landlord_stafesData';
$route['api/save_landlord_staff']='Admin/save_landlord_staff';
$route['api/delete_landlord_staff']='Admin/delete_landlord_staff';
$route['api/export_properties']='Admin/exportProperties';
$route['api/add_new_designation']='Admin/add_new_designation';
$route['api/get_all_designation']='Admin/get_all_designation';
$route['api/add_new_suppliers']='Admin/add_new_suppliers';
$route['api/get_suppliers_list']='Admin/get_suppliers_list';
$route['api/get_edit_suppliers_data']='Admin/get_edit_suppliers_data';
$route['api/save_edit_suppliers_data']='Admin/save_edit_suppliers_data';
$route['api/delete_confirm_supplier']='Admin/delete_confirm_supplier';
$route['api/get_unit_properties_data']='Admin/get_unit_properties_data';
$route['api/search_properties']='Admin/search_properties';
$route['api/get_countries_list']='Admin/get_all_countries_list';
$route['api/get_all_state']='Admin/get_all_state';
$route['api/get_all_city']='Admin/get_all_city';
$route['api/add_unit_property']='Admin/add_unit_property';
$route['api/get_oneUnit_data']='Admin/get_oneUnit_data';
$route['api/get_tenant_details']='Admin/get_tenant_details';
$route['activation_link']='Admin/activation_link';
$route['api/save_document_type']='Admin/save_document_type';
$route['api/get_document_type']='Admin/get_document_type';
$route['api/save_new_document']='Admin/save_new_document';
$route['api/get_document_details']='Admin/get_document_details';
$route['api/getMpesaPayment']='Admin/get_mpesa_payment';
$route['api/get_unit_images']='Admin/get_unit_images';
$route['api/remove_unit_img']='Admin/remove_unit_img';
$route['api/add_unit_imges']='Admin/add_unit_imges';
$route['api/add_transaction']='Admin/addtransaction';
$route['api/add_propDoc_type']='Admin/add_propDoc_type';
$route['api/get_PropDoc_type']='Admin/get_PropDoc_type';
$route['api/save_prop_doc']='Admin/save_prop_doc';
$route['api/get_prop_document']='Admin/get_prop_document';
$route['api/getalldocumentdetails']='Admin/getAllDocumentDetails';
$route['api/getpropertyname']='Admin/getPropertyName';
$route['api/getTenant']='Admin/getTenantNew';
$route['api/getunit']='Admin/getUnit';
$route['api/adddoctype']='Admin/adddoctype';
$route['api/get_unit_Deatils']='Admin/get_unit_Deatils';
$route['api/send_request_land']='Admin/send_request_land';
$route['api/get_transaction_type']='Admin/get_transaction_type';
$route['api/deletedocrecord']='Admin/deleteDocRecord';
$route['api/saveTrsactionType']='Admin/save_transaction_type';
$route['api/getTransactionData']='Admin/get_transaction_type';
$route['api/getUnitDeatils']='Admin/getUnitDeatils';
$route['api/getnotification']='Admin/getNotification';
$route['api/getAllNotification']='Admin/getAllNotification';
$route['api/getAllNotificationCount']='Admin/getAllNotificationCount';
$route['api/getTenantDeatils']='Admin/get_unit_tenant_data';
$route['api/saveTeansactionData']='Admin/save_transaction_data';
$route['api/getTransactionList']='Admin/get_transaction_details';
$route['api/addservicerequest']='App_api/addservicerequest';
$route['api/get_unit_services']='Admin/get_unit_services';
$route['api/getTenantServiceData']='Admin/get_tenant_services';
$route['api/add_new_Request']='Admin/add_new_Request';
$route['api/saveEditRequest']='Admin/save_edit_request';
$route['api/getServicesData']='Admin/get_service_request';
$route['api/get_service_data']='Admin/get_serviceReq_data';
$route['api/save_edit_request']='Admin/save_edit_request_land';
$route['api/send_land_msg']='Admin/send_land_msg';
$route['api/signUp_land_google']='Admin/signUp_land_google';
$route['api/signUp_Tenant_google']='Admin/signUp_Tenant_google';
$route['api/get_generat_recipt']='Admin/get_generat_recipt';
$route['api/send_email_recipt']='AdminNew/send_email_recipt';
$route['api/send_email_recipt_mobile']='AdminNew/send_email_recipt_mobile';
$route['api/delete_transaction']='AdminNew/delete_transaction';
$route['api/get_prop_transaction']='AdminNew/get_prop_transaction';
$route['api/get_transaction_data']='AdminNew/get_transaction_data';
$route['api/savePersonalMsgTenant']='AdminNew/savePersonalMsgTenant';
$route['api/get_message_land']='AdminNew/get_message_land';
$route['api/get_all_message']='AdminNew/get_all_message';
$route['api/save_Tenant_msg']='AdminNew/save_Tenant_msg';
$route['api/get_sender_name_land']='AdminNew/get_sender_name_land';
$route['api/get_tenant_subject']='AdminNew/get_tenant_subject';
$route['api/get_tenantANDland_msg']='AdminNew/get_tenantANDland_msg';
$route['api/save_landlord_msg']='AdminNew/save_landlord_msg';
$route['api/get_edit_transaction_data']='AdminNew/get_edit_transaction_data';
$route['api/getNotice']='AdminNew/get_notice';
$route['api/getNoticeLandlord']='AdminNew/get_notice_land';
$route['api/addNewNotice']='AdminNew/add_new_notice';
$route['api/getChatData']='AdminNew/get_chat_data';
$route['api/getChatDataPersonalLandlord']='AdminNew/getChatDataPersonalLandlord';
$route['api/getChatDataGroupLandlord']='AdminNew/getChatDataGroupLandlord';
$route['api/getChatUserTenant']='AdminNew/getChatUserTenant';
$route['api/getChatUserPersonalTenant']='AdminNew/getChatUserPersonalTenant';
$route['api/getChatUserGroupTenant']='AdminNew/getChatUserGroupTenant';
$route['api/getTransactionType']='AdminNew/get_transaction_type_tenant';
$route['api/saveAddTransaction']='AdminNew/save_add_transaction';
$route['api/getTransaction']='AdminNew/getTransaction';
$route['api/accessToken']='AdminNew/accessToken';
$route['api/checkurl']='AdminNew/checkurl';
$route['api/resgiserUrl']='AdminNew/resgiserUrl';
$route['api/confirmation']='AdminNew/confirmation';
$route['api/checkConfirmation']='AdminNew/check_confirmation';
$route['api/getUpcomingPayment']='AdminNew/getUpcomingPayment';
$route['api/getCompletedPayment']='AdminNew/getCompletedPayment';
$route['api/App_payment_webview'] = 'App_api/App_payment_webview';
$route['api/successPayment'] = 'App_api/success_payment';
$route['api/errorPayment'] = 'App_api/error_payment';
$route['api/deleteProperty'] = 'AdminNew/delete_property';
$route['api/saveEditUnit'] = 'AdminNew/save_edit_unitDetails';
$route['api/unitConfirmDelete'] = 'AdminNew/delete_unit';
$route['api/getDashboardData'] = 'AdminNew/get_dashboard_data';
$route['api/getLogData'] = 'AdminNew/get_log_data';
$route['api/getSearchLogData'] = 'AdminNew/get_search_logData';
$route['api/getCardPaymentToken'] = 'AdminNew/get_cardPayment_token';
$route['api/generateNewBill'] = 'AdminNew/generate_new_bill';
$route['api/validation']='AdminNew/validation';
$route['api/sendPaymentRequest']='AdminNew/C2B';
$route['api/B2C']='AdminNew/B2C';





















$route['api/updateservicerequestdetails']='app_api/updateServiceRequestDetails';
$route['api/gettenantnotlinkwithunit']='App_api/getTenantNotLinkWithUnit';
$route['api/multitenanttoggle']='App_api/multiTenantToggle';
$route['api/viewmultitenant']='App_api/viewMultiTenant';
$route['api/searchpropertybynameorunit']='App_api/searchPropertyByNameOrUnit';












/* Tenant Side Api:start*/
$route['api/get_tenant_document']='AdminNew/get_tenant_document';
$route['api/get_lease_details']='AdminNew/get_lease_details';
$route['api/get_files_details']='AdminNew/get_files_details';
$route['api/saveTenantDocument']='AdminNew/save_tenant_document';
$route['api/get_serach_landlord']='AdminNew/get_serach_landlord';
$route['api/get_land_properties']='AdminNew/get_land_properties';
$route['api/get_unit_details_tenent']='AdminNew/get_unit_details_tenent';
$route['api/invite_landlord']='AdminNew/invite_landlord';
$route['api/invite_landlord_phone']='AdminNew/invite_landlord_phone';
$route['api/active_deactive_unit']='AdminNew/active_deactive_unit';
$route['api/save_edit_transaction']='AdminNew/save_edit_transaction';















$route['api/alltransaction']='App_api/allTransaction';
$route['api/addtransaction']='App_api/addtransaction';


/////////////////app only

$route['api/alltransaction']='App_api/allTransaction';
$route['api/addtransaction']='App_api/addtransaction';
$route['api/checkexistinguser']='App_api/checkExistingUser';
$route['api/googlesignup']='App_api/googleSignup';
$route['api/getincomeandexpense']='App_api/getIncomeAndExpense';
$route['api/getallvendors']='App_api/getAllVendors';
$route['api/getallunits']='App_api/getAllUnits';
$route['api/getallproperties']='App_api/getAllProperties';
$route['api/gettenant']='App_api/getTenant';
$route['api/viewtransaction']='App_api/viewTransaction';
$route['api/viewtransactiondetails']='App_api/viewTransactionDetails';
$route['api/addtractiontype']='App_api/addTranctionType';
$route['api/getallunitdetails']='App_api/getAllUnitdetails';
$route['api/getupperrenge']='App_api/getupperrenge';
$route['api/searchproperty']='App_api/searchProperty';
$route['api/unitdetails']='App_api/unitDetails';
$route['api/requestfromlandlord']='App_api/requestFromLandlord';
$route['api/myhouse']='App_api/myHouse';
$route['api/getcompletedrequest']='App_api/getCompletedRequest';
$route['api/getpendingqequest']='App_api/getPendingRequest';
$route['api/getdeclineqequest']='App_api/getDeclineRequest';
$route['api/showservicerequest']='App_api/showServiceRequest';
$route['api/listlandlord']='App_api/ListLandlord';
$route['api/propertyunderlandlord']='App_api/propertyUnderLandlord';
$route['api/requestdetails']='App_api/requestDetails';
$route['api/updaterequestdetails']='App_api/updateRequestDetails';
$route['api/getallUnitswithoutstatus']='App_api/getAllUnitswithoutstatus';
$route['api/getAllServiceRequests']='App_api/getAllServiceRequest';
$route['api/getTenantList']='App_api/getTenantList';
$route['api/sendNotice']='App_api/send_notice';










