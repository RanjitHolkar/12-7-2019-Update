<?php
defined('BASEPATH') OR exit('No direct script access allowed');

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

class App_api extends CI_Controller {

	function __construct() {
		
		parent::__construct();
		$this->load->library(array('JwtAuth','form_validation','MyFuncationLab'));
		$this->load->model('Appapi_Model');
		$this->load->model('ApiModel');
		$this->load->helper(array('form', 'url'));
	}
	
	public function checklogin(){
		
		$token=$this->jwtauth->ValidateToken();
		
		if(!empty($token))
		{
			return $token;
		}else
		{
			$res=array('msg'=>'error','errorInfo'=>'Token Not Valid');
			echo json_encode($res);
			http_response_code(401);
			return false;
		} 
	} 



	public function getallservicerequest()
	{
		$userId=$this->checklogin();
		
		if($userId)
		{
			$data=$this->Appapi_Model->getallservicerequest($userId);
			/*echo header("HHTP/1.1 200 OK");*/
			echo json_encode($data);
			
		}else{
			echo header("HTTP/1.1 401 BAD REQUEST");
		}
	}

	public function addservicerequest()
	{
		$userId=$this->checklogin();
		if($userId)
		{
			//echo json_encode('hi');exit;
			//print_r($_POST);exit;
			// $_POST= json_decode(file_get_contents("php://input"), true);
		//print_r($_POST);exit;
			$data= (array)json_decode($_POST['data']);
			//  print_r($data);exit;
			//  $this->form_validation->set_rules('title', 'title', 'required');
			//  $this->form_validation->set_rules('description', 'description', 'required');
			//$this->form_validation->set_rules('priority', 'priority', 'required');
			// $this->form_validation->set_rules('tenant_id', 'tenant id', 'required');
			$userId=$this->checklogin();
			
			if(isset($_FILES['file']))
			{
				
				$array = explode('.', $_FILES['file']['name']);
				$extension = end($array);


				$fileName=mt_rand().'.'.$extension;

				if(move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/service_request/' .$fileName))
				{
					$data['file']='uploads/service_request/'.$fileName;
				}else{
					echo "file uploading error";
					/*echo header("HTTP/1.1 401 BAD REQUEST");*/
				}
			}
							//print_r($_POST);exit;
			$data['tenant_id']=$userId;
			$data['tenant_id']=$userId;
			$data['start_date']=date('y-m-d');
			$data['status']=0;
			$data['priority']=0;
			$isadded=$this->Appapi_Model->addServiceRequest($data);
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'Tenant','actions'=>'Tenant Added New service Request','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			if($isadded)
			{
				/*echo header("HHTP/1.1 200 OK");*/
				echo json_encode(array('status'=>'Added Successfully'));
			}
		}else{
			/*echo header("HTTP/1.1 401 BAD REQUEST");*/
			echo json_encode(array('status'=>'Not added'));
		}	
	}

	// public function getallservicerequest()
	// {
	// 	$userId=$this->checklogin();
		
	// 	if($userId)
	// 	{
	// 		$data=$this->Appapi_Model->getallservicerequest($userId);
			// echo header("HHTP/1.1 200 OK");
	// 		echo json_encode($data);
			
	// 	}else{
			// echo header("HTTP/1.1 401 BAD REQUEST");
	// 	}
	// }
	
	public function getservicerequestlandlord()
	{
		$userId=$this->checklogin();
		
		if($userId)
		{
			$_POST= json_decode(file_get_contents("php://input"), true);
			$this->form_validation->set_rules('priority', 'priority', 'required');
			$this->form_validation->set_rules('status', 'status', 'required');
			$this->form_validation->set_rules('skip', 'skip', 'required');
			$this->form_validation->set_rules('limit', 'limit ', 'required');

			if($this->form_validation->run() == TRUE)
			{   
				
				$data=$this->Appapi_Model->getservicerequestlandlord($_POST);
				if($data)
				{
					/*echo header("HHTP/1.1 200 OK");*/
					echo json_encode($data);
				}
			}
			else
			{   
				echo validation_errors();
				/*echo header("HTTP/1.1 401 BAD REQUEST");    */
			}
		}else{
			echo header("HTTP/1.1 401 BAD REQUEST");
		}
	}
	
	public function getselectedservicerequest()
	{
		$userId=$this->checklogin();
		
		if($userId)
		{
			$_POST= json_decode(file_get_contents("php://input"), true);
			$this->form_validation->set_rules('priority', 'priority', 'required');
			$this->form_validation->set_rules('status', 'status', 'required');
			$this->form_validation->set_rules('skip', 'skip', 'required|numeric');
			$this->form_validation->set_rules('limit', 'limit ', 'required|numeric');
			$this->form_validation->set_rules('tenant_id', 'tenant_id', 'required|numeric');

			if($this->form_validation->run() == TRUE)
			{   
				
				$data=$this->Appapi_Model->getSelectedServiceRequest($_POST);
				if($data)
				{
					/*echo header("HHTP/1.1 200 OK");*/
					echo json_encode($data);
				}
			}
			else
			{   
				echo validation_errors();
				/*echo header("HTTP/1.1 401 BAD REQUEST");    */
			}
		}else{
			echo header("HTTP/1.1 401 BAD REQUEST");
		}
	}
	

	public function addtransaction()
	{

		$data= json_decode(file_get_contents("php://input"), true);
		//print_r($data);exit;
		//echo 'hi';exit;
	//$_POST=(json_decode(file_get_contents("php://input")));
		$userId=$this->checklogin();
		
		if($userId)
		{
			$data= json_decode(file_get_contents("php://input"), true);
			$transaction=$data['add_transaction'];
			$additional_transaction=$data['additional_transaction'];
			$deduction_transaction=$data['deduction_transaction'];
			$transaction['landlord_id']=$userId;
				//print_r($data);exit;
			if(isset($_FILES['transaction_file']))
			{
				$array = explode('.', $_FILES['transaction_file']['name']);
				$extension = end($array);


				$fileName=mt_rand().'.'.$extension;

				if(move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/Transaction/' .$fileName))
				{
					$transaction['transaction_file']='uploads/Transaction/'.$fileName;
				}
			}else{$transaction['transaction_file']='';}
			print_r($transaction);
			$isadded=$this->Appapi_Model->addtransaction($transaction);
				//print_r($isadded);exit;
			if($isadded)
			{
				
				$newadditional_transaction=array();
				$newdeduction_transaction=array();
				foreach($additional_transaction as $q)
				{
					$q['transaction_id']=$isadded;
					
					array_push($newadditional_transaction,$q);
						//$newadditional_transaction=$q;
				}
				
				foreach($deduction_transaction as $q1)
				{
					$q1['transaction_id']=$isadded;
					array_push($newdeduction_transaction,$q1);
						//$newdeduction_transaction=$q1;
				}
					//print_r($newdeduction_transaction);
					//print_r($newadditional_transaction);exit;
				if(!empty($newdeduction_transaction))
				{
					$ded=$this->Appapi_Model->deduction_transaction($newdeduction_transaction);
				}
				if(!empty($newadditional_transaction))
				{
					$add=$this->Appapi_Model->additional_transaction($newadditional_transaction);
				}
				
				if($isadded)
				{
					$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Ladlord  Added New Transaction','userID'=>$userId,'progress_id'=> $userId);
		            $this->ApiModel->insert_Data('audit_log',$logData);
					/*echo header("HHTP/1.1 200 OK");*/
					echo json_encode('Added successfully');
				}
			}else{
				/*echo header("HTTP/1.1 401 BAD REQUEST");*/
				echo json_encode("error");
			}
			

		}else{
			echo header("HTTP/1.1 401 BAD REQUEST");
		}
	}
	
	public function allTransaction()
	{
		$q=$this->Appapi_Model->allTransaction();
		if($q)
		{
			/*echo header("HHTP/1.1 200 OK");*/
			echo json_encode($q);
		}
	}
	
	public function checkExistingUser()
	{
		$data= json_decode(file_get_contents("php://input"), true);
		
		if($data['email']=="")
		{
			/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			echo json_encode('email Id can not be empty');
		}else{
			$q=$this->Appapi_Model->checkExistingUser($data['email']);
			//print_r($q);exit;
			if(count($q)==1)
			{
				$token=$this->jwtauth->CreateToken($q[0]['id'],$q[0]['role']);
				$q[0]['FirstTimeLogin']=false;
				$q[0]['token']=$token['token'];
				
				/*echo header("HHTP/1.1 200 OK");*/
				echo json_encode($q[0]);
			}else{
				
				/*echo header("HHTP/1.1 200 OK");*/
				echo json_encode(array('FirstTimeLogin'=>true));
			}
		}
	} 
	
	public function googleSignup()
	{

		$_POST= json_decode(file_get_contents("php://input"), true);
		$userId=$this->checklogin();
		$this->form_validation->set_rules('userName', 'userName', 'required');
			//$this->form_validation->set_rules('landlordId', 'landlordId', 'required');
		$this->form_validation->set_rules('email', 'email', 'required');
		$this->form_validation->set_rules('profilephoto', 'profilephoto', 'required');
		//	$this->form_validation->set_rules('country', 'country', 'required');
		

		if($this->form_validation->run() == TRUE)
		{   
					/* if(isset($_FILES['profilephoto']['name']))
				{
	
					$array = explode('.', $_FILES['profilephoto']['name']);
					$extension = end($array);


					$fileName=mt_rand().'.'.$extension;

					if(move_uploaded_file($_FILES['profilephoto']['tmp_name'], 'temp_profile/' .$fileName))
					{
						$_POST['profilephoto']=$fileName;
					}else{
						
						echo  header("HHTP/1.1 401 BAD REQUEST");
						return  json_encode('error');
					}
				}	 */
				
				$isadded=$this->Appapi_Model->googleSignup($_POST);
				$token=$this->jwtauth->CreateToken($isadded,$_POST['role']);
				
				
				$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>$_POST['role'] .'  Google Signup','userID'=>$userId,'progress_id'=> $userId);
		            $this->ApiModel->insert_Data('audit_log',$logData);

				$token['userinfo']=$_POST;
				$token['msg']='success';
				echo json_encode($token);
				/*echo header("HHTP/1.1 200 OK");*/
					//echo json_encode('Added successfully');
				
			}	
		}
		
		public function getIncomeAndExpense()
		{
			$userId=$this->checklogin();
			$income=array();
			$expense=array();
			if($userId)
			{
			// echo $userId;exit;
				$q=$this->Appapi_Model->getIncomeAndExpense($userId);
			//print_r($q);exit;
				if(empty($q))
				{
					$newarr=array('income'=>array(),'expense'=>array());
					echo json_encode($newarr);
					/*echo header("HHTP/1.1 200 OK");*/
				}else{
					
					foreach($q as $row)
					{
					//echo $row['type'];exit;
						if($row['type']==0)
						{
							$income[]=$row;
						}else{
							$expense[]=$row;
						}
					}
					$newarr=array('income'=>$income,'expense'=>$expense);
					echo json_encode($newarr);
					/*echo header("HHTP/1.1 200 OK");*/
				}
			}
		}
		
		public function getAllVendors()
		{
			$userId=$this->checklogin();
			if($userId)
			{
				$q=$this->Appapi_Model->getAllVendors($userId);
				echo json_encode($q);
				/*echo header("HHTP/1.1 200 OK");*/
			}else{
				echo json_encode($q);
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
		}
		
		public function getAllUnits()
		{
			$propertyId= json_decode(file_get_contents("php://input"), true);
		//print_r($propertyId);exit;
			$userId=$this->checklogin();
			if($userId && $propertyId['propertyId']!="")
			{
				$q=$this->Appapi_Model->getAllUnits($propertyId['propertyId']);
				echo json_encode($q);
				/*echo header("HHTP/1.1 200 OK");*/
			}else{
				echo json_encode($q);
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
		}

		public function getAllUnitswithoutstatus()
		{
			$propertyId= json_decode(file_get_contents("php://input"), true);
		//print_r($propertyId);exit;
			$userId=$this->checklogin();
			if($userId && $propertyId['propertyId']!="")
			{
				$q=$this->Appapi_Model->getAllUnitswithoutstatus($propertyId['propertyId']);
				echo json_encode($q);
				/*echo header("HHTP/1.1 200 OK");*/
			}else{
				echo json_encode($q);
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
		}
		
		public function getAllProperties()
		{

			$userId=$this->checklogin();
			$q=$this->Appapi_Model->getAllProperties($userId);
			if($q)
			{
				echo json_encode($q);
				/*echo header("HHTP/1.1 200 OK");*/
			}else{
				echo json_encode($q);
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
		}
		
		public function getTenant()
		{
			$data= json_decode(file_get_contents("php://input"), true);
			if($data['unit_id']!='')
			{
				$q=$this->Appapi_Model->getTenant($data['unit_id']);
			//print_r($q);exit;
				if($q)
				{
					echo json_encode($q);
					/*echo header("HHTP/1.1 200 OK");*/
				}else{
					echo json_encode($q);
					/*echo header("HHTP/1.1 401 BAD REQUEST");*/
				}
			}
		//$userId=$this->checklogin();
		}
		public function getTenantNotLinkWithUnit(){
			$data =(array) json_decode(file_get_contents("php://input"));
			$result=$this->Appapi_Model->getTenantNotLinkWithUnit();
			if($result)
			{
				echo json_encode($result);
				/*echo header("HHTP/1.1 200 OK");*/
			}else{
				echo json_encode($result);
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
		}
		public function viewTransaction()
		{
			$userId=$this->checklogin();
			if($userId)
			{
				echo json_encode($this->Appapi_Model->viewtransaction($userId));
			}
			
		}
		
		public function viewTransactionDetails()
		{
			$data= json_decode(file_get_contents("php://input"), true);
			$userId=$this->checklogin();
			if($userId)
			{
				$q=$this->Appapi_Model->viewTransactionDetails($data['id']);
			//	print_r($q);exit;
				$add=$this->Appapi_Model->getadditional_transaction($data['id']);
				$ded=$this->Appapi_Model->getdeduction_transaction($data['id']);
				$q[0]['additional']=$add;
				$q[0]['deduction']=$ded;
				echo json_encode($q[0]);
				/*echo header("HHTP/1.1 200 OK");*/
			}else
			{
				echo json_encode('error');
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
			
		}
		
		public function addTranctionType()
		{
			$data= json_decode(file_get_contents("php://input"), true);
			$userId=$this->checklogin();
			if($userId)
			{
				$data['landlord_id']=$userId;
				$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added New Transaction Type ','userID'=>$userId,'progress_id'=> $userId);
		            $this->ApiModel->insert_Data('audit_log',$logData);
				
				$q=$this->Appapi_Model->addTranctionType($data);
				echo json_encode('Added successfully');
				/*echo header("HHTP/1.1 200 OK");*/
			}else{
				
			}
		}
		
		public function getAllUnitdetails()
		{
			$userId=$this->checklogin();
			if($userId)
			{
				$info =(array) json_decode(file_get_contents("php://input"));
				$query=$this->Appapi_Model->getAllUnitdetails($id);
		//print_r($query);exit;
				echo json_encode($query[0]);
			}
		}
		
		public function getupperrenge()
		{
			
			$q=$this->Appapi_Model->getupperrenge();
			echo json_encode($q);
			/*echo header("HHTP/1.1 200 OK");*/
		}
		
		public function searchProperty()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
		//$userId=true;
			if($userId)
			{
				$q=$this->Appapi_Model->searchProperty($data);
			//print_r($q);exit;
				echo json_encode($q);
				// echo header("HHTP/1.1 200 OK");
			}else
			{
				echo json_encode('Unauthorised User');
				// echo header("HHTP/1.1 401 BAD REQUEST");
			}
		}
		public function searchPropertyByNameOrUnit()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
			// print_r($data);
			if($userId)
			{
				$q=$this->Appapi_Model->searchPropertyByNameOrUnit($data);
				echo json_encode($q);
				// echo header("HHTP/1.1 200 OK");
			}else
			{
				echo json_encode('Unauthorised User');
				// echo header("HHTP/1.1 401 BAD REQUEST");
			}
		}
		

		public function unitDetails()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$q=$this->Appapi_Model->unitDetails($data['id']);
			if($q)
			{
			//print_r($q);exit;
				echo json_encode($q);
				// echo header("HHTP/1.1 200 OK");
			}
			
		}
		
		public function requestFromLandlord()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
			if($userId)
			{
				$data['tenant_id']=$userId;
				$q=$this->Appapi_Model->requestFromLandlord($data);
				if($q)
				{
				//print_r($q);exit;
					echo json_encode(array('status'=>'added successfully'));
					// echo header("HHTP/1.1 200 OK");
				}else{
					echo json_encode(array('status'=>'not added'));
					// echo header("HHTP/1.1 401 BAD REQUEST");
				}
			}else{
				echo json_encode('Unauthorised User');
				// echo header("HHTP/1.1 401 BAD REQUEST");
			}
			
		}	
		
		public function myHouse()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
		//$userId=true;
			if($userId)
			{
				$q=$this->Appapi_Model->myHouse($userId);
	 // print_r($q);
		//      echo count($q);
		// 		die();
				/*print_r($count);exit;*/
				if($q == 'No Data')
				{
					//print_r($q);exit;
					echo json_encode(array('status'=>'Unlink','data'=>$q));
					// echo header("HHTP/1.1 200 OK");
				}else{
					echo json_encode(array('status'=>'Link','data'=>$q));
					// echo header("HHTP/1.1 200 OK");
				}
			}else{
				echo json_encode('Unauthorised User');
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
			
		}
		
		public function getCompletedRequest()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
			if($userId)
			{
				$q=$this->Appapi_Model->getCompletedRequest($userId);
				echo json_encode($q);
				/*echo header("HHTP/1.1 200 OK");*/
			}else{
				echo json_encode("Unauthorised User");
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
		}	
		
		public function getPendingRequest()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
			if($userId)
			{
				$q=$this->Appapi_Model->getPendingRequest($userId);
				
				echo json_encode($q);
				// echo header("HHTP/1.1 200 OK");
				
			}else{
				echo json_encode('Unauthorised User');
				// echo header("HHTP/1.1 401 BAD REQUEST");
			}	
		}

		public function getDeclineRequest()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			
			$userId=$this->checklogin();
			if($userId)
			{
				$q=$this->Appapi_Model->getDeclineRequest($userId);
				
				echo json_encode($q);
				// echo header("HHTP/1.1 200 OK");
				
			}else{
				echo json_encode('Unauthorised User');
				// echo header("HHTP/1.1 401 BAD REQUEST");
			}		
		}
		
		public function App_payment_webview()
		{
			//$authorization=$_GET['authorization'];
		   //$userId=$this->checklogin();
			$data =(array) json_decode(file_get_contents("php://input"));
			$data['userId']=$_GET['userId'];
			$data['amount']=$_GET['amount'];
			$data['transaction_id']=$_GET['transaction_id'];
//             $data['userId']=1;
// 			$data['amount']=1000;
// 			$data['transaction_id']='14';

			if(@$data['amount'] && @$data['transaction_id'] )
			{
				$data['transaction_id']=$data['transaction_id'];
				$data['data']=$data;
				$this->load->view('payement_getway',$data);

			}else{
				echo json_encode('Amount is Required');
			}
			
		}
		public function showServiceRequest()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
		//$userId=true;
			if($userId)
			{
				$query=$this->Appapi_Model->showServiceRequest($data['serviceRequestId']);
			//print_r($q);exit;
				echo json_encode($query);
				// echo header("HHTP/1.1 200 OK");
			}else
			{
				echo json_encode('Unauthorised User');
				// echo header("HHTP/1.1 401 BAD REQUEST");
			}
		}
		
		public function ListLandlord()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$q=$this->Appapi_Model->ListLandlord();
			if($q)
			{
			//print_r($q);exit;
				echo json_encode($q);
				// echo header("HHTP/1.1 200 OK");
			}else{
				echo json_encode('errors');
				// echo header("HHTP/1.1 401 BAD REQUEST");
			}
		}
		
		public function propertyUnderLandlord()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$q=$this->Appapi_Model->propertyUnderLandlord($data['landlord_id']);
			echo json_encode($q);
			// echo header("HHTP/1.1 200 OK");	
		}
		
		public function requestDetails()
		{
			$userId=$this->checklogin();
		//$userId=true;
			if($userId)
			{
				$q=$this->Appapi_Model->requestDetails($userId);
			//print_r($q);exit;
				echo json_encode($q);
				// echo header("HHTP/1.1 200 OK");
			}else
			{
				echo json_encode('Unauthorised User');
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}
		}
		
		public function updateRequestDetails()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
			if($userId)
			{
				$data['id']=$userId;
				$q=$this->Appapi_Model->updateRequestDetails($data);
				if($q)
				{
					echo json_encode('Updated successfully');
					/*echo header("HHTP/1.1 200 OK");*/
				}
			}else{
				echo json_encode('Unauthorised User');
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}	
		}
		public function updateServiceRequestDetails()
		{
			$data =(array) json_decode(file_get_contents("php://input"));
			$userId=$this->checklogin();
			if($userId)
			{
				$res=$this->Appapi_Model->updateServiceRequestDetails($data);
				if($res)
				{
					echo json_encode(array('status'=>'Updated successfully'));
					/*echo header("HHTP/1.1 200 OK");*/
				}
				else
				{
				echo json_encode(array('status'=>'Data not updated'));
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			    }
			}else{
				echo json_encode(array('status'=>'Unauthorised User'));
				/*echo header("HHTP/1.1 401 BAD REQUEST");*/
			}	
		}

		public function multiTenantToggle(){
			$data= json_decode(file_get_contents("php://input"), true);
			if(!empty($data['unit_id']))
			{
				$result=$this->Appapi_Model->multiTenantToggle($data['unit_id']);
				if($result)
				{
					echo json_encode($result);
					/*echo header("HHTP/1.1 200 OK");*/
				}else{
					echo json_encode($result);
					/*echo header("HHTP/1.1 401 BAD REQUEST");*/
				}
			}
			else
			{
				echo json_encode('unit Id field is required !!!');
			}		
		}
		public function viewMultiTenant()
		{
			$data= json_decode(file_get_contents("php://input"), true);
			if(!empty($data['unit_id']))
			{
				$result=$this->Appapi_Model->viewMultiTenant($data['unit_id']);
				if($result)
				{
					echo json_encode($result);
					/*echo header("HHTP/1.1 200 OK");*/
				}else{
					echo json_encode($result);
					/*echo header("HHTP/1.1 401 BAD REQUEST");*/
				}
			}
			else
			{
				echo json_encode('unit Id field is required !!!');
			}		
		}

		public function getTenantList()
		{
				$landlord_id=$this->checklogin();
				$query=$this->Appapi_Model->getTenantList($landlord_id);
				echo json_encode($query);

		}

		public function send_notice()
		{		$userId=$this->checklogin();
				$info = file_get_contents("php://input");
		        $info =(array) json_decode($_POST['data']);
		        $a3=''; 
	        if(count($_FILES)!=0)
	        {
		        $img_name = explode('.', $_FILES['selectFile']['name']);
				$extension = end($img_name);
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['selectFile']['tmp_name'];
				$a2=$img_name[0].'_'.$pic_name;
				$a3='uploads/profile/'.$a2;
				move_uploaded_file($a1,$a3);
		    }
			   $data=array('img'=>$a3,'property_id'=>$info['property_id'],'title'=>$info['title'],'description'=>$info['description'],'landlord_id'=>$userId);
			   $query=$this->Appapi_Model->insert_data('notice',$data);
			   $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Send  Notice','userID'=>$userId,'progress_id'=> $userId);
		            $this->ApiModel->insert_Data('audit_log',$logData);
				
			   echo json_encode($query);
		}
		
		public function success_payment()
		{
		    $this->load->view('success');
		}
		
		public function error_payment()
		{
		    $this->load->view('error');
		}

	}
