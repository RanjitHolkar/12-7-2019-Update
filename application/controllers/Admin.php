<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 require __DIR__ . '/../../vendor/autoload.php';
if (isset($_SERVER['HTTP_ORIGIN'])) {
		header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Max-Age: 86400'); 
	  }
		if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
				header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
				header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
				exit(0);
		}
class Admin extends CI_Controller {

	
	
	 function __construct() {
        parent::__construct();
        $this->load->library(array('JwtAuth','form_validation'));
	    $this->load->model('ApiModel');
		$this->load->helper(array('form', 'url'));
// 		$this->db->query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
    }
	 
    
	
	public function chatKit_token()
    {
		$chatkit = new Chatkit\Chatkit([
			  'instance_locator' => instance_locator,
			  'key' => key
			]);
		return $chatkit;
    }
	public function checklogin(){
	
	 $token=$this->jwtauth->ValidateToken();
	
		 if(!empty($token)){
			return $token;
		}else{
			$res=array('msg'=>'error','errorInfo'=>'Token Not Valid ');
		    echo json_encode($res);
			http_response_code(401);
			return false;
		} 
	 }   
	 
	 
	/**
	  *
	  *--- get All users   ----
	  *
	  **/ 
    Public function getAllUsers(){
		$userId=$this->checklogin();
				
				if($userId){
					
					$data=$this->ApiModel->getDateFormTable('users'," role='landlord' or role='tenant'");
					$res=array('msg'=>'success','allUsers'=>$data);
					echo json_encode($res);
					http_response_code(200);  
				
				}
		
		
		
	} 

   public function get_document()
	{
		$info = file_get_contents("php://input");
		$id=$info;
		$document=$this->ApiModel->get_document($id);
		echo json_encode($document);

	} 

	public function get_unit_data()
	{
		 $info = file_get_contents("php://input");
		$property_id=$info;
		$data=$this->ApiModel->get_unit_data($property_id);
		echo json_encode($data);
	}

	public function get_all_Images()
	{
		 $info = file_get_contents("php://input");
		$unit_id=$info;
		$data=$this->ApiModel->get_all_Images($unit_id);
		echo json_encode($data);
	}

	public function delete_flate_image()
	{

		 $id = file_get_contents("php://input");
		$query=$this->ApiModel->delete_home_image($id);
		echo $query;
	}
	public function add_unit_img()
	{
		 $id = file_get_contents("php://input");
		 $userId=$this->checklogin();
		      $img_name = explode('.', $_FILES['selectFile']['name']);
		
				$extension = end($img_name);
				
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['selectFile']['tmp_name'];
				 $a2=$img_name[0].'_'.$pic_name;
				 $a3='uploads/Home_Images/'.$a2;
			
				move_uploaded_file($a1,$a3);
	             $unit_img=array('unit_id'=>$_POST['id'],'home_img'=>$a3);
	     		
			 $query=$this->ApiModel->save_unit_img($unit_img);
			 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord add Unit Images','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			 echo $query;	
		
	}
	public function add_unit_imges()
	{
		 $id = file_get_contents("php://input");
	 	 $userId=$this->checklogin();
		      $img_name = explode('.', $_FILES['selectFile']['name']);
		
				$extension = end($img_name);
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['selectFile']['tmp_name'];
				 $a2=$img_name[0].'_'.$pic_name;
				 $a3='uploads/Home_Images/'.$a2;
			
				move_uploaded_file($a1,$a3);
	             $unit_img=array('unit_id'=>$_POST['id'],'home_img'=>$a3);
	     		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord add Unit Images','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			 $query=$this->ApiModel->save_unit_img($unit_img);
			 if($query == 1)
			 {
			 	$res=array('msg'=>'success');
			 }else{
			 	$res=array('msg'=>'error');
			 }
			 echo json_encode($res);	
		
	}


	public function deleteDocumentData()
	{
		 $id = file_get_contents("php://input");
	 	 $userId=$this->checklogin();
		 $query=$this->ApiModel->delete_Dcoument_data($id);
		 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Delete Document','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		 echo $query;
	}

	public function insertLeaseData()
	{
		 $data = (array)json_decode(file_get_contents("php://input"));
		$id=(array)$data['alldata'];
	 	$userId=$this->checklogin();
		$alldata=array('startDate' =>$id['start_date'],'endDate'=>$id['end_date'],'rentAmount'=>$id['rent'],'paymentFrequency'=>$id['payment_frequency'],'paymentDay'=>$id['payment_day'],'depositAmount'=>$id['deposite_amount'],'tenantReminder'=>$id['tenant_reminder'],'overdueReminder'=>$id['overview_reminder'],'unit_id'=>$data['unit_id']);
		$this->ApiModel->update_unit_status($data['unit_id'],array('lease_status'=>'1'));
		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added Unit Lease ','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		$query=$this->ApiModel->insert_All_data($alldata);
		echo json_encode($query);
	}
	public function get_edit_leaves_data()
	{
		$id = file_get_contents("php://input");
		$query=$this->ApiModel->get_edit_leaves_data($id);
		echo json_encode($query);

	}

	public function save_editLeaves_data()
	{
		$data = (array)json_decode(file_get_contents("php://input"));
		$id=(array)$data['alldata'];
	 	$userId=$this->checklogin();
		$alldata=array('startDate' =>$id['start_date'],'endDate'=>$id['end_date'],'rentAmount'=>$id['rent'],'paymentFrequency'=>$id['payment_frequency'],'paymentDay'=>$id['payment_day'],'depositAmount'=>$id['deposite_amount'],'tenantReminder'=>$id['tenant_reminder'],'overdueReminder'=>$id['overview_reminder']);
		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'landlord','actions'=>'Landlord Edit Lease Details','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		$query=$this->ApiModel->update_All_data($data['id'],$alldata);
		echo json_encode($query);
	}

	public function link_unit_tenants()
	{

		$data = (array)json_decode(file_get_contents("php://input"));
		$check_lease=$this->ApiModel->checkLease($data['unit_id']);
	 	$userId=$this->checklogin();
		if($check_lease==1)
		{
			$res=$this->ApiModel->link_unit_tenants($data['unit_id'],$data['tenant_id']);
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord link Tenant','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			 $room_id=$this->ApiModel->get_roomId($data['unit_id']);
			
			$chatkit=$this->chatKit_token();
			$data= $chatkit->addUsersToRoom([
		      'user_ids' => [$data['tenant_id']],
		      'room_id' => $room_id->room_id
		    ]);
		    // echo json_encode($data);

		}else{
			
			$res=" Unit Not Added Lease";
			
		}
		 echo json_encode($res);
	}

	public function remove_link_tenant()
	{
		$id = file_get_contents("php://input");
		$userId = $this->checklogin();
		$room_id=$this->ApiModel->get_room_id($id);
		$chatkit=$this->chatKit_token();
        $chatkit->removeUsersFromRoom([
		  'user_ids' => ["$id"],
		  'room_id' => $room_id->room_id
		]);
		$query=$this->ApiModel->remove_link_tenant($id);
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'landlord','actions'=>'Landlord Remove link Tenant','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		 echo json_encode($query);

	}

	public function get_property_data()
	{ 
		$id = file_get_contents("php://input");
		$query=$this->ApiModel->get_property_data($id);
		echo json_encode($query);

	}

	public function editPropertyData()
	{ 
			$data = (array)json_decode(file_get_contents("php://input"));
			$userId = $this->checklogin();
			$res=$data['res'];
			$id=$data['property_id'];
			$query=$this->ApiModel->editPropertyData($id,$res);
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'landlord','actions'=>'Landlord Edit Property Data','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			echo json_encode($query);

	}

	public function get_landlord_stafesData()
	{
		$id = file_get_contents("php://input");
		$query=$this->ApiModel->get_landlord_stafesData($id);
		echo json_encode($query);

	}

	public function get_search_data()
	{
		$search_value= (array)json_decode(file_get_contents("php://input"));
		$userId=$this->checklogin();
		 $query=$this->ApiModel->get_search_data($userId,$search_value['propertyValue']);
		echo json_encode($query);

	}

	public function get_unit_data_id()
	{
		$id = file_get_contents("php://input");
		$query=$this->ApiModel->get_unit_data_id($id);

		echo json_encode($query);
	}

	public function get_tenant_data_id()
	{
		$id = file_get_contents("php://input");
		$query=$this->ApiModel->get_tenant_data_id($id);
		echo json_encode($query);
	}

	public function save_editTenant()
	{
		$data = (array)json_decode(file_get_contents("php://input"));
		$alldata=(array)$data['data'];
		$userId=$this->checklogin();
		$id=$data['id'];
		$query=$this->ApiModel->upadte_data($id,$alldata['email'],$alldata['phone']);
		if($query== 0)
		{
			$query=$this->ApiModel->tenant_update_data($id,$alldata);
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'landlord','actions'=>'Landlord Edit Tenant Data','userID'=>$userId,'progress_id'=>$id);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			echo json_encode($query);
		}else{

			echo json_encode(0);
		}
		// echo json_encode($query);
		

	}

	public function delete_tenant_id()
	{
		$id = file_get_contents("php://input");
		$userId=$this->checklogin();
		$query=$this->ApiModel->deleteTenant($id);

		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Delete Tenant','userID'=>$userId,'progress_id'=>$id);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		echo json_encode($query);

	}
	public function get_lease_data()
	{
		$data = (array)json_decode(file_get_contents("php://input"));
		$whereCondition='';
		$Property_id=$data['property_id'];
		$status=$data['status'];
		$tenant_id=$data['tenant_id'];
		$start_date=$data['start_date'];
		$end_date=$data['end_date'];
		// $Property_id=NULL;
		// $status=NULL;
		// $start_date=NULL;
		// $end_date=NULL;
		if($Property_id !='')
		{
		   $whereCondition.=" AND properties.id="."'$Property_id'";
			
		}

		if($tenant_id !='')
		{
		   $whereCondition.=" AND lease_tenant.tenant_id="."'$tenant_id'";
			
		}


		if($status != '')
		{
			
				$whereCondition.=" AND units.onRent="."'$status'";
			
		}

		if($start_date != '')
		{
		
				$whereCondition.=" AND add_lease.startDate="."'$start_date'";
			
		}

		if($end_date != '')
		{
			
				$whereCondition.=" AND add_lease.endDate="."'$end_date'";
		}

		// if($unit_type != '')
		// {
		// 	if(!!$unit_type== 0)
		// 	{
		// 		$whereCondition.=" AND  units.onRent IS NULL";
		// 	}
		// 	else
		// 	{
		// 		$whereCondition=" AND units.onRent = 'Yes'";
		// 	}
		// }
		$landlord_id=$this->checklogin();
		$query['search_data']=$this->ApiModel->get_lease_data($landlord_id,$whereCondition);
		$query['filter_data']=$this->ApiModel->get_lease_data($landlord_id,'');
		echo json_encode($query);
	}
	public function get_unit_property()
	{
		$info = file_get_contents("php://input");
		$id=json_decode($info);
		$id=$id->propertyId;
		$data=$this->ApiModel->get_unit_data($id);
			$res=array('msg'=>'success','data'=>$data);
				echo json_encode($res);
				http_response_code(200);  
	
	}

	public function get_unit_property_id()
	{
		$id = json_decode(file_get_contents("php://input"));
		$id=$id->unitId;
		$query=$this->ApiModel->get_unit_data_id($id);

			$res=array('msg'=>'success','data'=>$query);
					echo json_encode($res);
					http_response_code(200);  
	}

	public function add_lease_unit()
	{
		 $data =json_decode(file_get_contents("php://input"));
		$id=(array)$data;
		$alldata=array('startDate' =>$id['start_date'],'endDate'=>$id['end_date'],'rentAmount'=>$id['rent'],'paymentFrequency'=>$id['payment_frequency'],'paymentDay'=>$id['payment_day'],'depositAmount'=>$id['deposite_amount'],'tenantReminder'=>$id['tenant_reminder'],'overdueReminder'=>$id['overview_reminder'],'unit_id'=>$id['unit_id']);
		$this->ApiModel->update_unit_status($id['unit_id'],array('lease_status'=>'1'));
		$query=$this->ApiModel->insert_All_data($alldata);
		$res=array('msg'=>'success','data'=>$query);
		echo json_encode($res);
		http_response_code(200);  
		
	}

	public function save_landlord_staff()
	{
		$data= (array)json_decode(file_get_contents("php://input"));
		$id=$data['staff_id'];
		$alldata=$data['data'];
		$query=$this->ApiModel->save_landlord_staff($id,$alldata);
		echo json_encode($query);
	}

	public function delete_landlord_staff()
	{
		$id=file_get_contents("php://input");
		$query=$this->ApiModel->delete_landlord_staff($id);
		echo json_encode($query);
	}

 /*Export Properties DATA: START*/
	public function exportProperties()
	{
		$userId=$this->checklogin();
		$data=$this->ApiModel->getPropertiesData($userId);
		echo json_encode($data);           
	 }

	 /*ADD New Designation:Start*/
	 public function add_new_designation()
	 {
	 	$data= (array)json_decode(file_get_contents("php://input"));
	 	$userId=$this->checklogin();
	 	$des_name=$data['desname'];
	 	$alldata=array('designation_name'=>$des_name,'landlord_id'=>$userId);
	 	$query=$this->ApiModel->add_new_designation($alldata);
	 	$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added New Designation ','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	 	echo json_encode($query);
	 }
	 /*ADD New Designation:END*/

	 /* Get all Designatin:START*/
	 public function get_all_designation()
	 {
	 	$userId=$this->checklogin();
	 	$query=$this->ApiModel->get_all_designation($userId);
	 	echo json_encode($query);
	 }
	  /* Get all Designatin:END*/
	  /* Add New Suppliers:START*/
	 public function add_new_suppliers()
	 {
	 	$data= (array)json_decode(file_get_contents("php://input"));
	 	$userId=$this->checklogin();
	 	$data['landlord_id']=$userId;
	 	$query=$this->ApiModel->add_new_suppliers($data);
	 	echo json_encode($query);
	 }
	 /* Add New Suppliers:END*/

	 /* Get Suppliers:START */
	 public function get_suppliers_list()
	 {
	 	$userId=$this->checklogin();
	 	$query=$this->ApiModel->get_suppliers_list($userId);
	 	echo json_encode($query);
	 }

	 /* Get Suppliers:END */

	 /* Get Edit Supplier Data:START */
	 public function get_edit_suppliers_data()
	 {
	 	$id=file_get_contents("php://input");
	 	$data=$this->ApiModel->get_edit_suppliers_data($id);
	 	echo json_encode($data);

	 }

	  /* Get Edit Supplier Data:END */

	 /* Save Edit Supplier :START */
	  public function save_edit_suppliers_data()
	  {
	  	$data= (array)json_decode(file_get_contents("php://input"));
	  	$alldata=$data['data'];
	  	$id=$data['id'];
	  	 $query=$this->ApiModel->save_edit_suppliers_data($id,$alldata);
	 	echo json_encode($query);
	  }

	   /* Save Edit Supplier :END */

	   /* Delete Confirm Supplier :START */

	  public function delete_confirm_supplier()
	  {
	  	$id=file_get_contents("php://input");
	  	$query=$this->ApiModel->delete_confirm_supplier($id);
	  	echo json_encode($query);
	  }

	   /* Delete Confirm Supplier :END */

	   /*Get Unit Properties Data:START */
	   public function get_unit_properties_data()
	   {
	   		$id=file_get_contents("php://input");
	   		$query=$this->ApiModel->get_unit_properties_data($id);
	   		$data=$this->ApiModel->get_properties_data($id);
	   		$data[0]['vacant']=$query[0]['total_leasecount'];
	   		$data[0]['occupied']=$query[0]['totalnotlease_count'];
	   		echo json_encode($data);
	   }

	   /*Get Unit Properties Data:END */

	   /*Get Serach Properties Data :START*/
	   public function search_properties()
	   {
		  $data=(array)json_decode(file_get_contents("php://input"));
		  $tenant_id=$this->checklogin();
		  $propertyname=$data['propertyName'];
		  $propertyType=$data['propertyType'];
		  $city=$data['city'];
		  $unit_no =$data['unit_no'];
		  $unit_type=$data['unit_type'];
          // $singleUnit=$this->input->post('singleUnit');

$whereCondition='';

		if($propertyType !='')
		{
			if(!!$whereCondition)
			{
				$whereCondition.=" AND properties.propertyType="."'$propertyType'";
			}
			else
			{
				$whereCondition="  AND properties.propertyType="."'$propertyType'";
			}
		}


		if($propertyname != '')
		{
			if(!!$whereCondition)
			{
				$whereCondition.=" AND  properties.propertyName LIKE"  ."'$propertyname%'";
			}
			else
			{
				$whereCondition="  AND  properties.propertyName LIKE  "."'$propertyname%'";
			}
		}

		if($city != '')
		{
			if(!!$whereCondition)
			{
				$whereCondition.=" AND  properties.city LIKE  "."'$city%'";
			}
			else
			{
				$whereCondition="  AND  properties.city LIKE  "."'$city%'";
			}
		}

		if($unit_no != '')
		{
			if(!!$whereCondition)
			{
				$whereCondition.=" AND  units.flatHoseNo LIKE  "."'$unit_no%'";
			}
			else
			{
				$whereCondition=" AND units.flatHoseNo LIKE  "."'$unit_no%'";
			}
		}

		if($unit_type != '')
		{
			if(!!$unit_type== 0)
			{
				$whereCondition.=" AND  units.onRent IS NULL";
			}
			else
			{
				$whereCondition=" AND units.onRent = 'Yes'";
			}
		}


	
		$query=$this->ApiModel->get_search_data_all($whereCondition,$tenant_id);
		  // if($data['propertyName'] !='' && )
		  // {
		  // 	if($data['propertyType'] !='')
		  // 	$where_condition .= "propertyType = $data['propertyType'] AND ( id LIKE '$search_value%' || propertyName LIKE '$search_value%' || propertyType LIKE '$search_value%' || country LIKE '$search_value%' || state LIKE '$search_value%' )"
		  // }
		 // $abc="SELECT properties.*,countries.name FROM `properties`INNER JOIN countries ON countries.id=properties.country $whereCondition ";
		
		  echo json_encode($query);
	   }
	 
	   /*Get Serach Properties Data :END*/

	   /* Get All Countries List:START*/

	    public function get_all_countries_list()
	    {
	    	$query=$this->ApiModel->get_all_countries();
	    	echo json_encode($query);
	    }
	    /* Get All Countries List:END*/


	    /* Get All state List:START*/

	    public function get_all_state()
	    {
	    	 $data=(array)json_decode(file_get_contents("php://input"));
	    	$id=$data['country_id'];
	    	$query=$this->ApiModel->get_all_state($id);
	    	echo json_encode($query);
	    }
	    /* Get All state List:END*/

	    /* Get All City List:START*/

	    public function get_all_city()
	    {
	    	 $data=(array)json_decode(file_get_contents("php://input"));
	    	$id=$data['state_id'];
	    	$query=$this->ApiModel->get_all_city($id);
	    	echo json_encode($query);
	    }
	    /* Get All City List:END*/

	    /* Add  Unit Property:START*/

	    public function add_unit_property()
	    {
	    	 $data=(array)json_decode(file_get_contents("php://input"));
	    	$query=$this->ApiModel->add_unit_property($data);
	       $res=array('msg'=>'success','data'=>$query);
	       echo json_encode($res);
	    }
	    /* Add  Unit Property:END*/

	     /*get One Unit Data :Start*/
	    public function get_oneUnit_data()
	    {
	    	$unit_id=file_get_contents("php://input");
	    	$query['unit_data']=$this->ApiModel->get_oneUnit_data($unit_id);
	    	$query['lease_data']=$this->ApiModel->get_lease_data_unit($unit_id);
	    	if(count($query['lease_data'])==1)
	    	{
	    		$query['unit_data'][0]['rentAmount']=$query['lease_data'][0]['rentAmount'];
	    	}
	    	
	    	echo json_encode($query);
	    }
	    /* get One Unit Data:End*/

	    /* Get Tenant Details:START*/
	   public function get_tenant_details()
	   {
	   	$unit_id=file_get_contents("php://input");
	   	$userId=$this->checklogin();

	   	$res=$this->ApiModel->get_unit_tenant($userId,$unit_id);
	   	// if(count($res) == 0)
	   	// {
	   	// 	$res=$this->ApiModel->get_all_unlink_tenant($userId);
	   	// }
	   	echo json_encode($res);
	   

	   }
	   /* Get Tenant Details:END*/
	   public function activation_link()
	   {
	   		$data=$_GET['data'];
	   		$data=explode('?',$data);
	   		
 		if( count($data) ==2)
 		{
 			$email=base64_decode($data[0]);
 			$pass=base64_decode($data[1]);
 			$query=$this->ApiModel->userActive($email,$pass);
 			if($query== 1)
 			{
 				$data['msg']="Your account has been activated";
 			}else{
 				$data['msg']="Your account has been Not activated";
 			}
 		}else{
 			$data['msg']="Your Link is incorrect";
 		}

 			$this->load->view('activation',$data);
 			

	   		
	   }

	   public function save_document_type()
	   {
	   	$data=(array)json_decode(file_get_contents("php://input"));
	    $landlord_id=$this->checklogin();
	    $query=$this->ApiModel->insertData('document_type',array('landlord_id'=>$landlord_id,'type'=>$data['docname']));
	    $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added New Document Type ','userID'=>$landlord_id,'progress_id'=>$landlord_id);
		    $this->ApiModel->insert_Data('audit_log',$logData);
	 	echo json_encode($query);
	    //echo json_encode($query);
	   	// echo json_encode('sag');
	   }

	  public function get_document_type()
	   {
	   	$landlord_id=$this->checklogin();
	   	$unit_id=file_get_contents("php://input");
	   	$query['document_type']=$this->ApiModel->get_document_type($landlord_id);
	   	if($unit_id)
	   	{
	    $query['tenant_name']=$this->ApiModel->get_unit_tenant_data($unit_id);

	   	}
	    echo json_encode($query);
	   }

	   public function save_new_document()
	   {
		//   echo json_encode('hi');exit;
	   	// echo (json_encode($_FILES));
		// echo(json_encode($_POST));
		//exit;
	   	$userId=$this->checklogin();

		 $img_name1 = explode('.', $_FILES['selectFile']['name']);
		
				$extension1 = end($img_name1);
				$pic_name1=mt_rand().'.'.$extension1;
				$b1=$_FILES['selectFile']['tmp_name'];
				 $b2=$img_name1[0].'_'.$pic_name1;
				 $b3='uploads/Home_Images/'.$b2;
			
				move_uploaded_file($b1,$b3);
	   		$data=$_POST;
	   		$data['file']=$b3;
	   		$data['file_format']=$extension1;
	   		$data['date']=date('Y-m-d');
	   		 $query=$this->ApiModel->insertData('document',$data);
	   		 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added New Document ','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	   		echo json_encode($query);
	   }

	   public function get_document_details()
	   { 
	   	$data=(array)json_decode(file_get_contents("php://input"));
	   	$unit_id=$data['unit_id'];
	   	$query=$this->ApiModel->get_document_details($unit_id);
	  echo json_encode($query);
	  	
	   }

	   public function get_unit_images()
	   {
	   		$data=(array)json_decode(file_get_contents("php://input"));
	   	   $unit_id=$data['unit_id'];
	   	   $query=$this->ApiModel->get_unit_images($unit_id);
	   	   echo json_encode($query);
	   }

	   public function remove_unit_img()
	   {
	   	    $id=file_get_contents("php://input");
	   	    $userId=$this->checklogin();
	   		$query=$this->ApiModel->remove_unit_img($id);
	   		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Remove Unit Image ','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	   		echo json_encode($query);
	   }

	   public function Add_offline_transaction()
	   {
	   	  $data=(array)json_decode(file_get_contents("php://input"));
	   	  $userId=$this->checklogin();
	   	  $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added Offline Transaction','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	   	  $query=$this->ApiModel->insertData('transaction',$data);
	   	  echo json_encode($query);

	   }

	   public function add_propDoc_type()
	   {
	   	 $data=(array)json_decode(file_get_contents("php://input"));
	   	 $userId=$this->checklogin();
	   	 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added Property Document Type','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	   	 $data=array('type'=> $data['docname'],'landlord_id'=>$userId);
	   	  $query=$this->ApiModel->insertData('prop_document_type',$data);
	   		echo json_encode($query);
	   

	   }

	   public function get_PropDoc_type()
	   {
	   	$userId=$this->checklogin();
	   	 $query=$this->ApiModel->get_PropDoc_type($userId);
	   	echo json_encode($query);

	   }

	   public function save_prop_doc()
	   {
	   	$userId=$this->checklogin();

	   	 	$img_name1 = explode('.', $_FILES['selectFile']['name']);
 				$extension1 = end($img_name1);
				$pic_name1=mt_rand().'.'.$extension1;
				$b1=$_FILES['selectFile']['tmp_name'];
				 $b2=$img_name1[0].'_'.$pic_name1;
				 $b3='uploads/Home_Images/'.$b2;
			
				move_uploaded_file($b1,$b3);
	   		$data=$_POST;
	   		$data['file']=$b3;
	   		$data['file_format']=$extension1;
	   		$data['date']=date('Y-m-d');
	   		 $query=$this->ApiModel->insertData('document',$data);
	   		 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added New Property Document ','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	   		echo json_encode($query);
	   }

	   public function get_prop_document()
	   {
	   		$id=file_get_contents("php://input");
	   	 $query=$this->ApiModel->get_PropDoc_document($id);
	   	echo json_encode($query);
	   }
	   
	   public function getAllDocumentDetails()
	   {
	   		$query=$this->ApiModel->getalldocumentdetails();
			echo json_encode($query);
			
	   }
	   
	 public function getPropertyName()
	 {
		 $token=$this->checklogin();
		if($token)
		{	
			echo json_encode($this->ApiModel->getPropertyName($token));
		}	
	 }
	 
	 public function getTenantNew()
	 {
		 $id=file_get_contents("php://input");
			echo json_encode($this->ApiModel->getTenant($id));
		
	 }

	  public function get_unit_tenant_data()
	  {
	  	$unit_id=file_get_contents("php://input");
	   	$query=$this->ApiModel->get_unit_tenant_data($unit_id);
	    echo json_encode($query);
	  }

	 public function getUnit()
	 {
		 $id=json_decode(file_get_contents("php://input"));
			echo json_encode($this->ApiModel->getUnit($id));
		
	 }
	 
	
	 
	 public function adddoctype()
	 {
		  $token=$this->checklogin();
		
		   $data=json_decode(file_get_contents("php://input"));
		   if($token && !empty($data->documenttype))
		   {
			  $data=array('landlord_id'=>$token,'type'=>$data->documenttype);
				echo json_encode($this->ApiModel->adddoctype($data)); 
		   }
			
		  
	 }

	 public function get_unit_Deatils()
	 {
	 	  $unit_id=file_get_contents("php://input");
	 	 $query['unit_data']=$this->ApiModel->get_unit_details($unit_id);
	 	 $query['unit_imges']=$this->ApiModel->get_unit_img($unit_id);
	 	 echo json_encode($query);

	 }


	 public function send_request_land()
	 {
	 	  $data=(array)json_decode(file_get_contents("php://input"));
	 	  $tenant_id=$this->checklogin();
	 	 $data['tenant_id']= $tenant_id;
	 	  $query=$this->ApiModel->insertData('request',$data);
	 	  $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'Tenant','actions'=>'Tenant send New Request ','userID'=>$tenant_id,'progress_id'=>$data['landlord_id']);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	 	 $notification=array('sender_id'=>$tenant_id,'receiver_id'=>$data['landlord_id'],'redirect_url'=>'/request-details','title'=>'Tenant Send Request','status'=>0);
	 	 // echo json_encode($notification_data);
	 	 // die();
	 	  $new_query=$this->ApiModel->insert_Data('notification',$notification);
	 	 echo json_encode($new_query);

	 }
	 
	 public function deleteDocRecord()
	 {
		  $data=json_decode(file_get_contents("php://input"));
	 	  $userId=$this->checklogin();
		   $query=$this->ApiModel->deleteDocRecord($data);
		   $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'Landlord','actions'=>'Landlord Delete Document ','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		  echo json_encode($query);
	 }

	/* Get Transaction Type:Start */
	public function get_transaction_type()
	{
		 $userId=$this->checklogin();
		 $query['Income']=$this->ApiModel->get_income_type($userId);
		 $query['Expence']=$this->ApiModel->get_Expence_type($userId);
		 $query['Vender'] = $this->ApiModel->get_vanders($userId);
		 $query['property'] = $this->ApiModel->get_properties($userId);
		 echo json_encode($query);
	}
	
	/* Get Transaction Type:STOP */

	public function save_transaction_type()
	{
		 $data=(array)json_decode(file_get_contents("php://input"));
	 	  $data['landlord_id']=$this->checklogin();
	 	 $query=$this->ApiModel->insertData('transactions_type',$data);
	 	  $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'Landlord','actions'=>'Landlord Added Transaction Type ','userID'=>$data['landlord_id'],'progress_id'=> $data['landlord_id']);
		        $this->ApiModel->insert_Data('audit_log',$logData);
	 	 echo json_encode($query);
	}

	public function getUnitDeatils()
	{
		 $data=(array)json_decode(file_get_contents("php://input"));
		 $property_id=$data['property_id'];
		 $query=$this->ApiModel->getallTenantAndUnit($property_id);
		 echo json_encode($query); 
	}
	
	public function getNotification()
	{
		$userId=$this->checklogin();
		$data=$this->ApiModel->getNotification($userId);
		// $where_condition=array('receiver_id'=>$userId,'redirect_url'=>'msg');
		// $updateData=array('status'=>1);
		// $query=$this->ApiModel->update_data_notification($where_condition,'notification',$updateData);
		echo json_encode($data);
	}

	public function getAllNotification()
	{
		$userId=$this->checklogin();
		$data=$this->ApiModel->getNotification($userId);
		$where_condition=array('receiver_id'=>$userId);
		$updateData=array('status'=>1);
		$query=$this->ApiModel->update_data_notification($where_condition,'notification',$updateData);
		echo json_encode($data);
	}

	public function getAllNotificationCount()
	{
		$userId=$this->checklogin();
		$data=$this->ApiModel->getAllNotificationCount($userId);
		$where_condition=array('receiver_id'=>$userId);
		$updateData=array('status'=>1);
		$query=$this->ApiModel->update_data_notification($where_condition,'notification',$updateData);
		echo json_encode($data);
	}

	public function save_transaction_data()
	{
		 $data=(array)json_decode(file_get_contents("php://input"));
		 $userId=$this->checklogin();
		 $addData=json_decode($_POST['add']);
		 $removeData=json_decode($_POST['remove']);
		 if(count(@$_FILES['transaction_file']['name']) != 0)
		 {
		 $img_name1 = explode('.', $_FILES['transaction_file']['name']);
		
				$extension1 = end($img_name1);
				$pic_name1=mt_rand().'.'.$extension1;
				$b1=$_FILES['transaction_file']['tmp_name'];
				 $b2=$img_name1[0].'_'.$pic_name1;
				 $b3='uploads/Transaction/'.$b2;
				move_uploaded_file($b1,$b3);
				$_POST['transaction_file']=$b3;
		 }
		
		  $_POST['landlord_id']=$userId;
		  unset($_POST['add']);
		  unset($_POST['remove']);
		 
		  $transaction_id=$this->ApiModel->insert_Data('transaction',$_POST);
		  $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'Landlord','actions'=>'Landlord Added New Transaction ','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		  $additonal=array();
		  $deduction=array();
	 	 for($i=0;$i < count($addData);$i++)
		  {
		  	if($addData[$i]->add_text != '' && $addData[$i]->add_digit !='')
		  	{
		  	$additonal[]=array('transaction_id'=>$transaction_id,'add_text'=>$addData[$i]->add_text,'add_type'=>$addData[$i]->add_type,'add_digit'=>$addData[$i]->add_digit);
		     }
		  }
		   for($i=0;$i < count($removeData);$i++)
		  {
		  	if($removeData[$i]->remove_text !='' && $removeData[$i]->remove_digit !='' )
		  	{
		  	$deduction[]=array('transaction_id'=>$transaction_id,'remove_type'=>$removeData[$i]->remove_type,'remove_text'=>$removeData[$i]->remove_text,'remove_digit'=>$removeData[$i]->remove_digit);
		     }
		  }

		  $query=1;
		  if(count($additonal) != 0)
		  {
		  	 $query=$this->ApiModel->insert_multi_img('additional_transaction',$additonal);
		  }
	 	if(count($deduction) != 0)
	 	{
	 	 $query=$this->ApiModel->insert_multi_img('deduction_transaction',$deduction);
	 	}
	   
		  echo json_encode($query);
	}

	public function get_transaction_details()
	{
		$landlord_id=$this->checklogin();

		$query=$this->ApiModel->get_transaction_details($landlord_id);
		echo json_encode($query);

	}

	public function get_unit_services()
	{
		 $data=(array)json_decode(file_get_contents("php://input"));
		 $unit_id=$data['unit_id'];
		 $query=$this->ApiModel->get_unit_services($unit_id);
		 echo json_encode($query);
	}

	public function get_tenant_services()
	{
		$tenant_id=$this->checklogin();

		$query['unit_data']=$this->ApiModel->get_tenant_details($tenant_id);
		$query['service_request']=$this->ApiModel->get_service_requst($tenant_id);
		 echo json_encode($query);


	}

	public function add_new_Request()
	{
		// $data=(array)json_decode(file_get_contents("php://input"));
		 $userId=$this->checklogin();
		 $b3='';
		 if(count($_FILES)==1)
		 {
		 
		 
		 $img_name1 = explode('.', $_FILES['selecteFiles']['name']);
		
				$extension1 = end($img_name1);
				$pic_name1=mt_rand().'.'.$extension1;
				$b1=$_FILES['selecteFiles']['tmp_name'];
				 $b2=$img_name1[0].'_'.$pic_name1;
				 $b3='uploads/Transaction/'.$b2;
			
				move_uploaded_file($b1,$b3);

	
		 }	
		 	 $_POST['file']=$b3;
		 	$_POST['tenant_id']= $userId; 
		 	$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'Tenant','actions'=>'Tenant Added New Service Request ','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		 $data=array('sender_id'=>$userId,'receiver_id'=>$_POST['landlord_id'],'title'=>'Tenant Send Service Request','redirect_url'=>'/unit-details/'.$_POST['property_id'].'/'.$_POST['unit_id']);
		  $this->ApiModel->insertData('notification',$data);
		  $_POST['start_date']=date('Y-m-d');
		  $_POST['due_date']=date('Y-m-d');
		  unset($_POST['landlord_id']);
		  $query=$this->ApiModel->insertData('service_request',$_POST);
	 	 echo json_encode($query);
		
	}

	public function save_edit_request()
	{
		 $userId=$this->checklogin();
		 $b3='';
		 if(count($_FILES)==1)
		 {
		 
		 
		 $img_name1 = explode('.', $_FILES['selecteFiles']['name']);
		
				$extension1 = end($img_name1);
				$pic_name1=mt_rand().'.'.$extension1;
				$b1=$_FILES['selecteFiles']['tmp_name'];
				 $b2=$img_name1[0].'_'.$pic_name1;
				 $b3='uploads/Transaction/'.$b2;
			
				move_uploaded_file($b1,$b3);
		    $_POST['file']=$b3;
	
		 }	
		 $id=$_POST['id'];
		 unset( $_POST['id']);
		 $_POST['tenant_id']= $userId; 
		 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'Tenant','actions'=>'Tenant Update Service Request ','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		  $query=$this->ApiModel->update_request_service($id,$_POST);
	 	 echo json_encode($query);
	}

	public function get_service_request()
	{
		$userId=$this->checklogin();
		$data=(array)json_decode(file_get_contents("php://input"));
		$unit_id=$data['unit_id'];
		$query['pending']=$this->ApiModel->get_services_data($unit_id,$userId);
		$query['completed']=$this->ApiModel->get_services_data_complet($unit_id);
		$query['decline']=$this->ApiModel->get_services_data_decline($unit_id);
		echo json_encode($query);

	}

	public function get_serviceReq_data()
	{
		
		$landlord_id=$this->checklogin();
		$data=(array)json_decode(file_get_contents("php://input"));
		$request_id=$data['id'];
		$unit_id=$data['unit_id'];
		$query['services_data']=$this->ApiModel->get_serviceReq_data($request_id);
		$query['vendor']=$this->ApiModel->get_vendors($landlord_id);
		$query['chat_data']=$this->ApiModel->get_service_message($unit_id);
		echo json_encode($query);

	}

	public function save_edit_request_land()
	{
		$alldata=(array)json_decode(file_get_contents("php://input"));
		
		$data=$alldata['data'];
		$id=$alldata['request_id'];
		unset($data->tenant_name);
		//unset($data['tenant_name']);
		 unset($data->file);
		 unset($data->property_Name);
		 
		$query=$this->ApiModel->edit_request_save($id,$data);
	 	 echo json_encode($query);
	}
	
	public function send_land_msg()
	{
		$userId=$this->checklogin();
		$alldata=(array)json_decode(file_get_contents("php://input"));
		$alldata['role']=1;
		$alldata['sender_id']=$userId;
		$alldata['date']=date('Y-m-d H:i:s');
		 $query=$this->ApiModel->insertData('chat_request',$alldata);
		 echo json_encode($query);
	 
    }

	public function signUp_land_google()
	{
		$alldata=(array)json_decode(file_get_contents("php://input"));
		$email=$alldata['email'];
		$check=$this->ApiModel->check_google_signup($email);
		if(count($check) == 1)
		{
			
			if(!empty($check))
			 {
			   $token=$this->jwtauth->CreateToken($check[0]['id'],$check[0]['role']);
			   $token['userinfo']=$check[0];
				$token['msg']='success';
			   echo json_encode($token);
			 }
		}else{
			$data=array('userName'=>$alldata['name'],'email'=>$alldata['email'],'regDate'=>date('Y:m:d'),'status'=>'deactive','role'=>'Landlord');
			 $query=$this->ApiModel->insertData('users',$data);
			 $this->signUp_land_google();
		}
	}

	public function signUp_Tenant_google()
	{
		$alldata=(array)json_decode(file_get_contents("php://input"));
		$email=$alldata['email'];
		$userId=$this->checklogin();
		$check=$this->ApiModel->check_google_signup($email);
		if(count($check) == 1)
		{
			$token=$this->jwtauth->CreateToken($check[0]['id'],$check[0]['role']);
			$token['userinfo']=$check[0];
			$token['msg']='success';
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Login','role'=>'Tenant','actions'=>'Tenant Google Login ','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			  echo json_encode($token);

			 
		}else{
			$data=array('userName'=>$alldata['name'],'email'=>$alldata['email'],'regDate'=>date('Y:m:d'),'status'=>'deactive','role'=>'tenant');
			 $query=$this->ApiModel->insertData('users',$data);
			 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'SignUp','role'=>'Tenant','actions'=>'Tenant Google SignUp','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		       $this->signUp_Tenant_google();
		}
	}
	public function get_generat_recipt()
	{
		$transactionId=file_get_contents("php://input");
		$query['transaction']=$this->ApiModel->get_transaction($transactionId);
		$query['additonal']=$this->ApiModel->get_Treansaction_data('additional_transaction','transaction_id',$transactionId);
		$query['deduction']=$this->ApiModel->get_Treansaction_data('deduction_transaction','transaction_id',$transactionId);
		echo json_encode($query);

	}
	
	public function get_mpesa_payment()
	{
		$query=$this->ApiModel->getALlMpesaTransaction();
		echo json_encode($query);
	}

}

