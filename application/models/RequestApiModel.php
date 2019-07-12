<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RequestApiModel extends CI_Model{
	public function get_request_dataModel($user_id){
		$q="SELECT properties.propertyName,users.userName,request.status,request.tenant_id,units.unitType,
		users.email,users.phone,request.id FROM   `request` 
		inner join units on  request.unit_id=units.id	
		inner join properties on properties.id=request.property_id
		inner join users on users.id=request.tenant_id where request.landlord_id=$user_id AND request.status != 3 order by request.id desc";		
		if (!$data=$this->db->query($q)) {
			$error = $this->db->error();
			throw new Exception('model_name->record: ' . $error['code'] . ' ' . $error['message']);
		}
		return $data->result_array();
	}
	public function get_room_id($id)
	{
		$this->db->select('room_id');
		$this->db->from('users');
		$this->db->where('id',$id);
		return $this->db->get()->row();
	}

	public function UpdateData($tbl_name,$con_col_name,$con_match_id,$data)
	{
		$this->db->where($con_col_name,$con_match_id);
		return  $this->db->update($tbl_name,$data);
		 // return $this->db->last_query();
	}
	public function accept_decline_request_statusModel($id,$status,$land_id,$tenant_id){
		if($status == 'accept'){
			$acc_status=array('status'=>1);
			// $res="update request inner join users on request.tenant_id=users.id set request.status=$acc_status, users.addedBy='Landlord', users.landlordId=request.landlord_id where request.id=$id";
			
		    $this->db->where('id',$id);
			$this->db->update('request',$acc_status);

			$this->db->where('id',$tenant_id);
			$result=$this->db->update('users',array('addedBy'=>'landlord','landlordId'=>$land_id));
			//$response=array('status'=>$query);
			return $acc_status;
		}
		else{
			$dec_status=array('status'=>2);
			$this->db->where('id',$id);
			$result=$this->db->update('request',$dec_status);
			// $response=array('status'=>$dec_status);
			return $dec_status;		
		}
	}
	public function searchRequestDataModel($user_id,$searchNames,$status){
		if($status ==='Accepted'){
			$statusValue=1;
		}else if($status ==='Declined'){
			$statusValue=2;
		}else if($status ==='Pending'){
			$statusValue=0;
		}

		$query="SELECT properties.propertyName,users.userName,request.status,request.tenant_id,units.unitType,
		users.email,users.phone,request.id FROM   `request` 
		inner join units on  request.unit_id=units.id	
		inner join properties on properties.id=request.property_id
		inner join users on users.id=request.tenant_id where request.landlord_id= $user_id";
		
		
		if(isset($statusValue)){
			$query .= " AND request.status=$statusValue";
		}
		// else if( !isset($statusValue)){
		// 	$query .="properties.propertyName like '%$searchNames%'or users.userName like 
		// 	'%$searchNames%'";
		// }
		// else if(isset($searchNames) && isset($statusValue)){
		// 	$query .="(properties.propertyName like '%$searchNames%' or users.userName like 
		// 	'%$searchNames%') AND request.status=$statusValue";
		// }
		if (!$query_res = $this->db->query($query)) {
			$error = $this->db->error();
			throw new Exception('model_name->record: ' . $error['code'] . ' ' . $error['message']);
		}
		if(!!$query_res)
			return $query_res->result_array();
		
	}
	public function deleteRequestStatusConfiramtionModel($id,$Changestatus){
		// if($Changestatus == 2){
		// 	$update="update request set request.status=3 where request.id=$id";
  //       //return $update;
		// }
		if($Changestatus){
			$update="update request inner join users on request.tenant_id=users.id set  request.status=3, users.addedBy=NULL,users.landlordId=NULL where request.id=$id";
         //return $update;
		}
		if (!$query=$this->db->query($update)) {
			$error = $this->db->error();
			throw new Exception('model_name->record: ' . $error['code'] . ' ' . $error['message']);
		}
		if(!!$query)
			return $query;
	}
	// function for check tenant already link or not
	public function checkUserLikedOrNot($tenant_id)
	{
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where('addedBy','landlord');
		$this->db->where('id',$tenant_id);
		return $this->db->get()->result_array();
	}
}
?>
