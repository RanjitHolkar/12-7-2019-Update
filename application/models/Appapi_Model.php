<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Appapi_Model extends CI_Model 
{
	public function addServiceRequest($data)
	{
		return $this->db->insert('service_request',$data);
	}
	
	// public function getallservicerequest($id)
	// {
	// 	$this->db->select('*');
	// 	$this->db->from('service_request');
	// 	return $this->db->get()->result();
	// }
	public function getServiceRequestLandlord($data)
	{
		$this->db->select('*');
		$this->db->from('service_request');
		$this->db->where('tenant_id',$data['tenant_id']);
		if($data['priority']!='all')
		{
			$this->db->where('priority',$data['priority']);
		}
		if($data['status']!='all')
		{
			$this->db->where('status',$data['status']);
		}
		$this->db->limit($data['limit'],$data['skip']);
		return $this->db->get()->result_array();
		$this->db->last_query();
	}

	
	public function getallservicerequest($id)
	{
		$this->db->select('service_request.id as servicereqID,service_request.start_date,service_request.due_date,users.userName,properties.propertyName,units.flatHoseNo,service_request.priority');
		$this->db->from('properties');
		$this->db->join('units','units.propertyId= properties.id');
		$this->db->join('service_request','units.id = service_request.unit_id');
		$this->db->join('users','users.id = service_request.tenant_id');
		$this->db->where('properties.landlord_id',$id);
		// $this->db->where('service_request.status',0);
		return $this->db->get()->result_array();
	}



	public function getSelectedServiceRequest($data)
	{
		$this->db->select('*');
		$this->db->from('service_request');
		$this->db->where('tenant_id',$data['tenant_id']);
		if($data['priority']!='all')
		{
			$this->db->where('priority',$data['priority']);
		}
		if($data['status']!='all')
		{
			$this->db->where('status',$data['status']);
		}
		$this->db->limit($data['limit'],$data['skip']);
		return $this->db->get()->result_array();
		$this->db->last_query();
	}
	
	
	
	public function addtransaction($data)
	{
		$this->db->insert('transaction',$data);
		return $this->db->insert_id();
	}
	
	public function additional_transaction($add)
	{
		return $this->db->insert_batch('additional_transaction',$add);
	}
	
	public function deduction_transaction($add)
	{
		return $this->db->insert_batch('deduction_transaction',$add);
	}
	
	public function allTransaction()
	{
		$this->db->select('*');
		$this->db->from('transaction');
		return $this->db->get()->result_array();
	}
	
	public function checkExistingUser($email)
	{
		$this->db->select('userName,role,id');
		$this->db->from('users');
		$this->db->where('email',$email);
		return $this->db->get()->result_array();
	}
	
	public function googleSignup($data)
	{
		$this->db->insert('users',$data);
		return $this->db->insert_id();
	}
	
	public function getIncomeAndExpense($id)
	{
		$this->db->select('*');
		$this->db->from('transactions_type');
		$this->db->where('landlord_id',0);
		$this->db->or_where('landlord_id',$id);
		return $this->db->get()->result_array();
		$this->db->last_query();
	}	
	
	public function getAllVendors($id)
	{
		$this->db->select('*');
		$this->db->from('suppliers');
		$this->db->where('landlord_id',$id);
		return $this->db->get()->result_array();
	}
	
	public function getAllUnits($id)
	{
		$this->db->select('*');
		$this->db->from('units');
		$this->db->where('propertyId',$id);
		$this->db->where('lease_status',1);
		return $this->db->get()->result_array();
	}
	
	public function getAllUnitswithoutstatus($id)
	{
		$this->db->select('*');
		$this->db->from('units');
		$this->db->where('propertyId',$id);
		//$this->db->where('lease_status',1);
		return $this->db->get()->result_array();
	}
	
	public function getAllProperties($id)
	{
		$this->db->select('*');
		$this->db->from('properties');
		$this->db->where('landlord_id',$id);
		return $this->db->get()->result_array();
	}

	public function getTenant($id)
	{
		$this->db->select('userName,tenant_id');
		$this->db->from('lease_tenant');
		$this->db->join('users','lease_tenant.tenant_id=users.id');
		$this->db->where('unit_id',$id);
		return $this->db->get()->result_array();
	}
	public function getTenantNotLinkWithUnit()
	{
		$data="Select userName,tenant_id,email from lease_tenant INNER JOIN  users ON   
		users.id=lease_tenant.tenant_id INNER JOIN 
		units ON units.id=lease_tenant.unit_id where lease_tenant.tenant_id != users.id ";
		$dataResult=$this->db->query($data);
		$data=$dataResult->result_array();
		return  $listdata=array('list'=>$data);	
	}
	
	public function viewtransaction($landlord_id)
	{
		$this->db->select('transaction.id,users.userName,vender_name,payment_date,transactions_type.type,properties.propertyName,totalAmount,payment_status');
		$this->db->from('transaction');
		$this->db->join('properties','transaction.property_id = properties.id','left');
		$this->db->join('users','transaction.tenant_id = users.id','left');
		$this->db->join('suppliers','transaction.vender_name = suppliers.id','left');
		$this->db->join('transactions_type','transaction.transaction_type = transactions_type.id','left');
		$this->db->where('transaction.landlord_id',$landlord_id);
		$this->db->order_by("transaction.id", "desc");
		return $this->db->get()->result_array();
	}
	
	public function viewTransactionDetails($id)
	{
		$this->db->select('userName,start_period,end_period,flatHoseNo,totalAmount,payment_type');
		$this->db->from('transaction');
		$this->db->join('users','transaction.tenant_id = users.id','left');
		$this->db->join('units','transaction.unit_id = units.id','left');
		//$this->db->join('deduction_transaction','transaction.id = deduction_transaction.id','left');
		//$this->db->join('additional_transaction','transaction.id = additional_transaction.id','left');
		$this->db->where('transaction.id',$id);
		return $this->db->get()->result_array();
	}
	
	public function getadditional_transaction($id)
	{
		$this->db->select('add_text,add_digit');
		$this->db->from('additional_transaction');
		$this->db->join('transaction','additional_transaction.transaction_id = transaction.id','left');
		$this->db->where('transaction.id',$id);
		return $this->db->get()->result_array();
	}

	public function getdeduction_transaction($id)
	{
		$this->db->select('remove_text,remove_digit');
		$this->db->from('deduction_transaction');
		$this->db->join('transaction','deduction_transaction.transaction_id = transaction.id','left');
		$this->db->where('transaction.id',$id);
		return $this->db->get()->result_array();
	}
	
	public function addTranctionType($data)
	{
		return $this->db->insert('transactions_type',$data);
	}
	
	public function getAllUnitdetails($id)
	{
		$sql="SELECT properties.propertyName,properties.country,properties.state,properties.city,units.flatHoseNo,units.id,users.userName,users.id as Tenant_id
		FROM properties  JOIN units ON units.propertyId = properties.id JOIN lease_tenant ON lease_tenant.unit_id
		= units.id JOIN users ON users.id = lease_tenant.tenant_id  where properties.id= $id  and lease_tenant.status=0 ";
		$query=$this->db->query($sql);
		return $query->result_array();
	}
	
	public function getupperrenge()
	{
		$this->db->select("max(rentAmount) as upperrenge");
		$this->db->from("add_lease");
		return $this->db->get()->result_array()[0];
	}
	
	public function searchProperty($data)
	{
		/* $sql='';
		$sql.= "select units.id,propertyName,streetName,city,state,pincode,property_img from properties join units on properties.id=units.propertyId join units on add_lease.unit_id=units.id where";
		
		if(isset($data['rentAmount']))
		{
			$sql.= "rentAmount<=$data['rentAmount'] AND";
		}
		
		if(isset($data['propertyType']) && $data['propertyType']!='both')
		{
			$sql.= "propertyType= $data['propertyType'] AND";
		}
		if(isset($data['unitType']))
		{
			$sql.= "unitType= $data['unitType'] AND";
		}
		if(isset($data['furnishing']))
		{
			$sql.= "furnishing= $data['furnishing']";
		}
		return $this->db->query($sql)->result_array(); */
		
		$this->db->select('flatHoseNo,onRent,units.id,propertyName,streetName,city,state,pincode,property_imges');
		$this->db->from('properties');
		$this->db->join('property_img','properties.id=property_img.property_id');
		$this->db->join('units','properties.id=units.propertyId');
		$this->db->where('linkMultiTenant',0);
		if(isset($data['rentAmount']))
		{
			$this->db->join('add_lease','add_lease.unit_id=units.id');
			$this->db->where('rentAmount<=',$data['rentAmount']);		
		}
		if(isset($data['propertyType']) && $data['propertyType']!='both')
		{
			$this->db->where('propertyType',$data['propertyType']);
		}
		if(isset($data['unitType']) && $data['unitType']!='all')
		{
			$this->db->where('unitType',$data['unitType']);	
		}
		if(isset($data['furnishing']) && $data['furnishing']!='all' )
		{
			$this->db->where('furnishing',$data['furnishing']);	
		} 

		$this->db->limit($data['limit'],$data['skip']);
		return $this->db->get()->result_array();
		
	}
	public function searchPropertyByNameOrUnit($data){
		$this->db->select('flatHoseNo,onRent,units.id,propertyName,streetName,city,state,pincode,property_imges');
		$this->db->from('properties');
		$this->db->join('property_img','properties.id=property_img.property_id');
		$this->db->join('units','properties.id=units.propertyId');
		$this->db->where('linkMultiTenant',0);
		if(isset($data['rentAmount']))
		{
			$this->db->join('add_lease','add_lease.unit_id=units.id');
			$this->db->where('rentAmount<=',$data['rentAmount']);		
		}
		if(isset($data['propertyType']) && $data['propertyType']!='both')
		{
			$this->db->where('propertyType',$data['propertyType']);
		}
		if(isset($data['unitType']) && $data['unitType']!='all')
		{
			$this->db->where('unitType',$data['unitType']);	
		}
		if(isset($data['furnishing']) && $data['furnishing']!='all' )
		{
			$this->db->where('furnishing',$data['furnishing']);	
		} 
		if(isset($data['nameorunitno'])){
			$this->db->like('propertyName',$data['nameorunitno']);
			// $this->db->escape_like_str($data['nameorunitno']);
			$this->db->or_like('flatHoseNo',$data['nameorunitno']);
		}
		// $this->db->limit($data['limit'],$data['skip']);
		 return $result=$this->db->get()->result_array();
		  // return $this->db->last_query();
	}
	
	public function unitDetails($id)
	{
		$this->db->select('properties.id as propertyid,  properties.propertyName as propertyName,properties.landlord_id,units.id as unitid,flatHoseNo,furnishing,unitType,rentAmount,depositAmount,userName,streetName,properties.country,city,state,pincode,landmark');
		$this->db->from('properties');
		$this->db->join('units','properties.id=units.propertyId','left');
		$this->db->join('users','users.id=properties.landlord_id','left');
		//$this->db->join('unit_img','unit_img.unit_id=units.id');
		$this->db->join('add_lease','units.id=add_lease.unit_id','left');
		$this->db->where('units.id',$id);
		$this->db->group_by('units.id');
		$result=$this->db->get()->result_array();
		$query="select home_img from unit_img where unit_id=$id";
		$resUnitImg=$this->db->query($query);
		$result2=$resUnitImg->result_array();
		return $data=array('data'=>$result,'image'=>$result2);
	}
	
	public function unitimg($id)
	{
		$this->db->select('home_img,unit_id');
		$this->db->from('unit_img');
		$this->db->where('unit_id',$id);
		return $this->db->get()->result_array();
	}
	
	public function requestFromLandlord($data)
	{
		return $this->db->insert('request',$data);
	}
	
	public function myhouse($id)
	{
		/* Due date logic code */
		$dueDateQuery="SELECT end_period,paymentDay from transaction INNER JOIN users ON transaction.tenant_id=users.id INNER JOIN add_lease On add_lease.unit_id=transaction.unit_id where users.id=$id GROUP BY users.id";
		$dueDateResult=$this->db->query($dueDateQuery);
		$dueDate=$dueDateResult->row_array();
		if(!isset($duedate['end_period'])){
			$dueDate['end_period']=null;
		}
		else{
			list($year,$month,$date)=explode("-",$dueDate['end_period']);
			$dueDate['end_period']=$year.'-'.(0).($month + 1).'-'.$dueDate['paymentDay'];
			unset($dueDate['paymentDay']);
		}		
		/* Fetching Tenant user's data sending in data key */
		 $tenantDataQuery="SELECT propertyName,properties.country,pincode,suburbs,state,landmark,flathoseNo,unitType,furnishing,paymentDay,paymentFrequency,depositAmount,startDate as 
		leaseStartDate,endDate as leaseEndDate,rentAmount,end_period,users.landlordId as landlordId,lease_tenant.start_date as 
		leaseTenantStartDate,lease_tenant.end_date as leaseTenantEndDate from properties INNER 
		JOIN users ON 
		users.landlordId=properties.landlord_id INNER JOIN lease_tenant ON 
		users.id=lease_tenant.tenant_id INNER JOIN units ON 
		units.id=lease_tenant.unit_id INNER JOIN add_lease ON 
		add_lease.unit_id=lease_tenant.unit_id left JOIN transaction ON
		transaction.tenant_id=users.id  where users.id=$id and lease_tenant.status=0 GROUP BY users.id";
		$tenantDataResult= $this->db->query($tenantDataQuery);
		$tenantData=$tenantDataResult->row_array();
		$landid=$tenantData['landlordId'];
		// return $landid;die();
		/* To get username of landlord of that user who is login */
		if($landid =='')
		{
			return 'No Data';
		}
		$landlordUserName="SELECT UserName from users where id=$landid group by id";
		$landResult=$this->db->query($landlordUserName);
		$landUser=$landResult->row_array();
		$tenantData['UserName']=$landUser['UserName'];
		$tenantData['duedate']=$dueDate['end_period'];	
		/* Fetching images of that tenat user and sending in image key*/
		$imageQuery="SELECT home_img from users INNER JOIN lease_tenant ON 
		users.id=lease_tenant.tenant_id 
		INNER JOIN unit_img ON lease_tenant.unit_id=unit_img.unit_id
		where users.id=$id";
		$imageResult=$this->db->query($imageQuery);	
		$imageData=	$imageResult->result_array();
		/*Fetching service request data of the tenat user and sending in service_request key*/
		$serviceRequestQuery="SELECT title,description,priority,service_request.status,
		service_request.id,suppliers.name from service_request INNER JOIN users ON
		users.id=service_request.tenant_id LEFT JOIN suppliers ON 
		service_request.vendor_id=suppliers.id where service_request.tenant_id=$id order by service_request.id"; 
		$serviceRequestResult=$this->db->query($serviceRequestQuery)->result_array();
		return $data=array('data'=>$tenantData,'image'=>$imageData,'service_request'=>
			$serviceRequestResult);	
	}
	public function getCompletedRequest($id)
	{
		$this->db->select('service_request.id as servicereqID, service_request.title as title,service_request.description as description ,service_request.start_date,service_request.due_date,users.userName,properties.propertyName,units.flatHoseNo,service_request.priority');
		$this->db->from('properties');
		$this->db->join('units','units.propertyId= properties.id');
		$this->db->join('service_request','units.id = service_request.unit_id');
		$this->db->join('users','users.id = service_request.tenant_id');
		$this->db->where('properties.landlord_id',$id);
		$this->db->where('service_request.status',1);
		return $this->db->get()->result_array();
	}	
	
	public function getPendingRequest($id)
	{
		$this->db->select('service_request.id as servicereqID,, service_request.title as title,service_request.description as description, service_request.start_date,service_request.due_date,users.userName,properties.propertyName,units.flatHoseNo,service_request.priority');
		$this->db->from('properties');
		$this->db->join('units','units.propertyId= properties.id');
		$this->db->join('service_request','units.id = service_request.unit_id');
		$this->db->join('users','users.id = service_request.tenant_id');
		$this->db->where('properties.landlord_id',$id);
		$this->db->where('service_request.status',0);
		return $this->db->get()->result_array();
	}
	
	public function getDeclineRequest($id)
	{
		$this->db->select('service_request.id as servicereqID,, service_request.title as title,service_request.description as description, service_request.start_date,service_request.due_date,users.userName,properties.propertyName,units.flatHoseNo,service_request.priority');
		$this->db->from('properties');
		$this->db->join('units','units.propertyId= properties.id');
		$this->db->join('service_request','units.id = service_request.unit_id');
		$this->db->join('users','users.id = service_request.tenant_id');
		$this->db->where('properties.landlord_id',$id);
		$this->db->where('service_request.status',2);
		return $this->db->get()->result_array();
	}
	
	public function showServiceRequest($id)
	{
		$this->db->select('title,userName,propertyName,flatHoseNo,start_date,due_date,priority,alert_status,service_request.status,notes,suppliers.name,suppliers.id');
		$this->db->from('service_request');
		$this->db->join('units','units.id=service_request.unit_id','left');
		$this->db->join('properties','properties.id=units.propertyId','left');
		$this->db->join('users','users.id=service_request.tenant_id','left');
		$this->db->join('suppliers','suppliers.id=service_request.vendor_id','left');
		$this->db->where('service_request.id',$id);
		return $this->db->get()->result_array();
	}
	
	public function ListLandlord()
	{
		$this->db->select('id,userName');
		$this->db->from('users');
		$this->db->where('role','landlord');
		return $this->db->get()->result_array();
	}
	
	public function propertyUnderLandlord($id)
	{
		$this->db->select('id,propertyName as value');
		$this->db->from('properties');
		$this->db->where('landlord_id',$id);
		return $this->db->get()->result_array();
	}
	
	public function requestDetails($id)
	{
		$this->db->select('tenant_id,request.id,propertyName,unitType,userName,request.status');
		$this->db->from('request');
		$this->db->join('properties','request.property_id=properties.id');
		$this->db->join('units','request.unit_id=units.id');
		$this->db->join('users','request.tenant_id=users.id');
		$this->db->where('request.landlord_id',$id);
		$this->db->where('request.status!=',3);
		$this->db->order_by('request.id','desc');
		return $this->db->get()->result_array();
	}
	
	 public function updateRequestDetails($data)
	{
		if($data['status']==1)
		{
			$sql="update request  INNER JOIN users  ON (request.tenant_id=users.id) SET 
			addedBy='Landlord',users.landlordId='".$data['id']."',request.status=1 where request.id='".$data['request_id']."'";
			return $res=$this->db->query($sql);
		}else{
			$this->db->where('request.id',$data['request_id']);
			return  $res=$this->db->update('request',array('status'=>$data['status']));
		}
		
	} 
	public function updateServiceRequestDetails($data)
	{
		$alertStatus = ($data['alert_status'] == 'Yes' ? 1 : 0);
		if($data['status']=='Pending'){
			$status=0;
		}
		else if($data['status']=='Complete'){
			$status=1;
		}
		else if($data['status']=='Decline'){
			$status=2;
		}
		
		if($data['priority']=='Low'){
			$priority=0;
		}
		else if($data['priority']=='High'){
			$priority=1;
		}
		else if($data['priority']=='Medium'){
			$priority=3;
		}
		else if($data['priority']=='Urgent'){
			$priority=4;
		}
		$query="update service_request set alert_status=$alertStatus,priority=$priority,
		status=$status,vendor_id='".$data['vendor_id']."',
		description ='".$data['description']."',due_date='".$data['due_date']."' 
		where id='".$data['service_request_id']."'";
		$result=$this->db->query($query);
		return $data=array('status'=>$result);
	}
	public function multiTenantToggle($unit_id){
		$query="SELECT id,linkMultiTenant from units where id=$unit_id";
		$result=$this->db->query($query);
		$data=$result->row_array();
		if($data['linkMultiTenant'] == 0){
			$updateMultiTenant="update units set linkMultiTenant = 1 where units.id=$unit_id";
		}
		else if($data['linkMultiTenant'] == 1){
			$updateMultiTenant="update units set linkMultiTenant = 0 where units.id=$unit_id ";
		}
		$result=$this->db->query($updateMultiTenant);
		return  $dataUpdated=array('status'=>$result);		
	}
	public function  viewMultiTenant($unit_id){
		$query="Select linkMultiTenant  from units where id = $unit_id";
		$result=$this->db->query($query);
		$data=$result->row_array();
		return $data;
	}
	public function getTenantList($landlord_id)
	{
		$sql="select users.* from users where landlordId = $landlord_id And id NOT IN(select lease_tenant.tenant_id from lease_tenant where lease_tenant.status = 0)";

		$query=$this->db->query($sql);
		return $query->result_array();		
	}
	public function insert_data($tbl_name,$data)
	{
		return $this->db->insert($tbl_name,$data);
	}
}
?>