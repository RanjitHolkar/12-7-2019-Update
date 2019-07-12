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
		
class Api extends CI_Controller {

	 function __construct() {
	
        parent::__construct();
        $this->load->library(array('JwtAuth','form_validation','MyFuncationLab'));
	    $this->load->model('ApiModel');
		$this->load->helper(array('form', 'url'));
		  //$this->db->query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
    }
	 
    
	public function  getinfo(){
		//$data['info']=array('userName'=>'amol','email'=>'amolbedge@gmail.com','password'=>'234234234');
	     //$html=$this->load->view('mail_temp/account_created',$data,true);
		 
		 $data['info']=array('userName'=>'amol','url'=>base_url());
	                        $html=$this->load->view('mail_temp/forgot_pass',$data,true);
							$subject=" change Password ";
							$this->sendMail('amolaxontech@gmail.com',$html,$subject);
		 echo $html;
	}
	
	public function checklogin(){
	
	 $token=$this->jwtauth->ValidateToken();
	
		 if(!empty($token))
		{
			return $token;
		}else
		{
			$res=array('msg'=>'error','errorInfo'=>'Token Not Valid ');
		    echo json_encode($res);
			http_response_code(401);
			return false;
		} 
	}   
	 
	public function chatKit_token()
	{
	    $chatkit = new Chatkit\Chatkit([
		  'instance_locator' => instance_locator,
		  'key' => key
		]);
	  return $chatkit;
	}
	public function requiredParameter(){
		 
		$res=array('msg'=>'error','errorInfo'=>'Please add required parameter to this web api  ');
		echo json_encode($res);
		http_response_code(400); 	
		return false;			
		 
	}
	
	/**
	  *
	  *--- Login Api and create token ----
	  *
	  **/
	
	public function login(){
    	 
	    $info = file_get_contents("php://input");
		$info = json_decode($info);
	    $phoneOrEmail = $info->phoneOrEmail;
        $pass =$info->pass; 
		//$phoneOrEmail = "amol.bedge@codevian.com";
       // $pass ='123456'; 	
      //  echo json_encode($info);			
		//die();
			if(!empty($phoneOrEmail) && !empty($pass)){
				
				$res=$this->ApiModel->login($phoneOrEmail,$pass);

					if (!empty($res)) {
						// echo "<pre>";
						 //print_r($this);
						 //die();
					 	$query=$this->ApiModel->checkLogin($phoneOrEmail,$pass);
					 	if(!empty($query))
					 	{
							$token=$this->jwtauth->CreateToken($res[0]['id'],$res[0]['role']);
							$token['userinfo']=$res[0];
							$token['msg']='success';
							 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Login','role'=>$res[0]['role'],'actions'=>'Login User','userID'=>$res[0]['id'],'progress_id'=>$res[0]['id']);
				 			$this->ApiModel->insert_Data('audit_log',$logData);
							echo json_encode($token);
						}else{
							$token['msg']='deactive';
							
					         echo json_encode($token);
					        http_response_code(200); 
					        return false;
						}
							
							
						}else{
							$token=array('msg'=>'error','errorInfo'=>'invalid credential');
							echo json_encode($token);
							http_response_code(200);
							return false;
							
						} 
				    }else{
					 $token=array('msg'=>'error','errorInfo'=>'Enter mobile number and pass');
					 echo json_encode($token);
					 http_response_code(200); 
					  
				     }    
		
	}

    Public function signUpAsTenantNew(){

 	    $info = file_get_contents("php://input");
		$info = json_decode($_POST['data']); 
		$userName=$info->userName; $email=$info->email; $phone=$info->phone; $password=$info->password;
		
	// print_r($_POST['data']['country']);
	  
	 
	 
		
				//$info =(array)json_decode($postdata);
		$BASE_URL=base_url();

		$img_name = explode('.', $_FILES['profile_image']['name']);
		
				$extension = end($img_name);
				
				
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['profile_image']['tmp_name'];
				 $a2=$img_name[0].'_'.$pic_name;
				 $a3='uploads/profile/'.$a2;
			
				move_uploaded_file($a1,$a3);
			//----- checking required parameter
		if($userName !='' &&  $password !='' &&($email !='' || $phone !=''))
		{
			$data=array('userName'=>$userName,'email'=>$email,'regDate'=>date('Y:m:d'),'status'=>'deactive','phone'=>$phone,'pass'=>md5($password),'role'=>'tenant','profilephoto'=>$a3);
			
			$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email));
			$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));
			
		
			if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){

				 $addUser=$this->ApiModel->insert_Data('users',$data);
				 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'tenant','actions'=>'New Tenant SignUp','userID'=>$addUser,'progress_id'=>$addUser);
				 		$this->ApiModel->insert_Data('audit_log',$logData);
				  $chatkit=$this->chatKit_token();
				 $chatkit->createUser([
				  'id' => "$addUser"  ,
				  'name' => $data['userName']
				]);

				 $room_id=$chatkit->createRoom([
				  'creator_id' => "$addUser",
				  'name' => 'Tenant Room'.$addUser,
				  'user_ids' => ["$addUser"],
				  'private' => false
				  ]);
				 
				  $this->ApiModel->update_data($addUser,'id','users',array('room_id'=>$room_id['body']['id']));

				           /*  $html.="<h1> Welcome ".$userName."</h1>";
							$html.="<h1> login using username".$email."</h1>";
							$html.="<h1>  and  password".$password."</h1>";
							$subject="welcome to property management";
						    $this->sendMail($email,$html,$subject); */
							$url=Activation_URL.'activation_link'.'?data='.base64_encode($email).'?'.base64_encode($password);
							$data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password,'url'=>$url);
	                        $html=$this->load->view('mail_temp/account_created',$data,true);
							$subject="welcome to property management  ";
							$this->sendMail($email,$html,$subject);
						
				   $res=array('msg'=>'success','info'=>'Your registration completed successfully !...');
				    echo json_encode($res);
				    http_response_code(200);  
			}else{
				
				 $res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
					 echo json_encode($res);
					 http_response_code(200);  
				
			        }
	
	        }else{

	    	$this->requiredParameter();
			// echo json_encode(array('error'));

	    }
	
		// $info = file_get_contents("php://input");
		// $info = json_decode($info);
		// $userName=$info->userName;	$email=$info->email; $phone=$info->phone; $password=$info->password;
		
		// //----- checking required parameter
		// if($userName !='' &&  $password !='' &&($email !='' || $phone !='')){
		// 	$data=array('userName'=>$userName,'email'=>$email,'phone'=>$phone,'pass'=>md5($password),'status'=>'active','role'=>'tenant','regDate'=>date('Y:m:d'));
		// 	$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email,));
		// 	$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));
		// 	if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
		// 		 $addUser=$this->ApiModel->insertData('users',$data);
		// 		   $res=array('msg'=>'success','info'=>'Your registration completed successfully !...');
				    
		// 		   $html.="<h1> Welcome  ".$userName." Your registration completed successfully !...</h1>";
		// 					$html.="<h1> login using username".$email."</h1>";
		// 					$html.="<h1>  and  password".$password."</h1>";
		// 					$subject="welcome to property management";
		// 				    $this->sendMail($email,$html,$subject); 
		// 					$data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password);
	 //                        $html=$this->load->view('mail_temp/account_created',$data,true);
		// 					$subject="welcome to property management  ";
		// 					$this->sendMail($email,$html,$subject);
				   
		// 		    echo json_encode($res);
		// 		    http_response_code(200);  
		// 	}else{
		// 			 $res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
		// 			 echo json_encode($res);
		// 			 http_response_code(200);  
		// 		}
		// }else{
		// 	$this->requiredParameter();
		// 	//echo json_encode(array('error'));
		// } 
    }
	
	

    Public function signUpAsTenant(){
		$info = file_get_contents("php://input");
		$info = json_decode($info);
		$userName=$info->userName;	$email=$info->email; $phone=$info->phone; $password=$info->password;
		
		//----- checking required parameter
		if($userName !='' &&  $password !='' &&($email !='' || $phone !='')){
			$data=array('userName'=>$userName,'email'=>$email,'phone'=>$phone,'pass'=>md5($password),'status'=>'deactive','role'=>'tenant','regDate'=>date('Y:m:d'));
			$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email));
			$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));

			if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
				 $addUser=$this->ApiModel->insert_Data('users',$data);
				 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'tenant','actions'=>'New Tenant SignUp','userId'=>$addUser,'progress_id'=>$addUser);
				 		$this->ApiModel->insert_Data('audit_log',$logData);
				  $chatkit=$this->chatKit_token();
				 $chatkit->createUser([
				  'id' => "$addUser"  ,
				  'name' => $data['userName']
				]);

				 $room_id=$chatkit->createRoom([
				  'creator_id' => "$addUser",
				  'name' => 'Tenant Room'.$addUser,
				  'user_ids' => ["$addUser"],
				  'private' => false
				  ]);
				 
				  $this->ApiModel->update_data($addUser,'id','users',array('room_id'=>$room_id['body']['id']));
				

				   $res=array('msg'=>'success','info'=>'Your registration completed successfully !...');
				   
				   			$url=base_url().'activation_link'.'?data='.base64_encode($email).'?'.base64_encode($password);
							$data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password,'url'=>$url);
	                        $html=$this->load->view('mail_temp/account_created',$data,true);
							$subject="welcome to property management";
							$this->sendMail($email,$html,$subject);
				            echo json_encode($res);
				            http_response_code(200);  
			}else{
					 $res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
					 echo json_encode($res);
					 http_response_code(200);  
				}
		}else{
			$this->requiredParameter();
			//echo json_encode(array('error'));
		} 
	} 
	
	/**
	  *
	  *--- Forgot Password ALL Users  ----
	  *
	  **/
	
	public function forgotPassword(){
		$info= file_get_contents('php://input');
		$info = json_decode($info);
		
		$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$info->phoneOrEmail));
		$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$info->phoneOrEmail));
		
			if(count($checkEmailExist)!= 0 || count ($checkPhoneExist)!=0){
				  
				 if(count($checkEmailExist)!= 0 ){$userId=$checkEmailExist[0]['id']; $email=$checkEmailExist[0]['email'];}
				 if(count($checkPhoneExist)!= 0 ){ $userId=$checkPhoneExist[0]['id']; $email=$checkPhoneExist[0]['email'];}
				   $rand_string= $this->myfuncationlab->randString();
				   $dateTime=date('Y-m-d H:i:s', strtotime('2 hour'));
				   $this->ApiModel->updateData(array('forgotString'=>$rand_string,'forgotDate'=>$dateTime),$userId);

				    $url=ANGULAR_URL."accountRecovery/".$rand_string;
					         $data['info']=array('userName'=>'amol','url'=>$url);
	                        $html=$this->load->view('mail_temp/forgot_pass',$data,true);
							$subject=" change Password ";
							$this->sendMail($email,$html,$subject);
				         $res=array('msg'=>'success','info'=>'Check Your Mail','url'=>$url,'email'=>$email);
				    echo json_encode($res);
				    http_response_code(200);  
			}else{
					 $res=array('msg'=>'error','errorInfo'=>'This email not exist  ');
					 echo json_encode($res);
					 http_response_code(200);  
				}
		
	}
	/**
	  *
	  *--- Forgot Password ALL Users  ----
	  *
	  **/
	
	public function changePasswordByLink(){
		$info= file_get_contents('php://input');
		$info = json_decode($info);
		
		$password=$info->password;
		$forgotStr=$info->forgotStr;
		if($forgotStr !='' && $password !='' )
		{
		
		 $checkExist=$this->ApiModel->getDateFormTable('users',array('forgotString'=>$forgotStr));
		 				 
	        if(count($checkExist)!= 0 ){
				  
				$userId=$checkExist[0]['id'];
				
				$forgotDate=$checkExist[0]['forgotDate'];
				   
				   
					if(date('Y-m-d H:i:s') <= $forgotDate){
					  
					  $this->ApiModel->updateData(array('pass'=>md5($password)),$userId);
	    
				    $res=array('msg'=>'success','info'=>'Password Updated successfully');
				  	}else{

    				   $res=array('msg'=>'error','errorInfo'=>'This link has expired  ');
					}
				    echo json_encode($res);
				    http_response_code(200);
				     
		    }else
		    {
					 $res=array('msg'=>'error','errorInfo'=>'This link has expired....  ');
					 echo json_encode($res);
					 http_response_code(200);  
			} 
		}else
		{
			 $res=array('msg'=>'error','errorInfo'=>'all filed required ');
					 echo json_encode($res);
		}
	}
	

	Public function signUpAsLandlordNew(){
		
		$info = file_get_contents("php://input");
		$info = json_decode($_POST['data']); 
		$userName=$info->userName; $email=$info->email; $phone=$info->phone; $password=$info->password;
		if($userName !='' &&  $password !='' &&($email !='' || $phone !='') &&  count($_FILES)!=0){
		    $img_name = explode('.', $_FILES['profile_image']['name']);
			$extension = end($img_name);
			$pic_name=mt_rand().'.'.$extension;
			$a1=$_FILES['profile_image']['tmp_name'];
			$a2=$img_name[0].'_'.$pic_name;
			$a3='uploads/profile/'.$a2;		
			move_uploaded_file($a1,$a3);
			//----- checking required parameter
			$data=array('userName'=>$userName,'email'=>$email,'regDate'=>date('Y:m:d'),'status'=>'deactive','phone'=>$phone,'pass'=>md5($password),'role'=>'landlord','profilephoto'=>$a3);
			
			$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email));
			$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));
			if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
				  $addUser=$this->ApiModel->insert_Data('users',$data);
				   $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'tenant','actions'=>'New landlord SignUp','userID'=>$addUser,'progress_id'=>$addUser);
				 		$this->ApiModel->insert_Data('audit_log',$logData);
				  $chatkit=$this->chatKit_token();
				  $chatkit->createUser([
				  'id' => "$addUser"  ,
				  'name' => $data['userName']
				]);

				  $room_id=$chatkit->createRoom([
				    'creator_id' => "$addUser",
				    'name' => 'Landlord Room'.$addUser,
				    'user_ids' => ["$addUser"],
				    'private' => false
				  ]);
				 
				$this->ApiModel->update_data($addUser,'id','users',array('room_id'=>$room_id['body']['id']));
				           /*  $html.="<h1> Welcome ".$userName."</h1>";
							$html.="<h1> login using username".$email."</h1>";
							$html.="<h1>  and  password".$password."</h1>";
							$subject="welcome to property management";
						    $this->sendMail($email,$html,$subject); */
							$url=Activation_URL.'activation_link'.'?data='.base64_encode($email).'?'.base64_encode($password);
							$data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password,'url'=>$url);
	                        $html=$this->load->view('mail_temp/account_created',$data,true);
							$subject="welcome to property management ";
							$this->sendMail($email,$html,$subject);
						
				   $res=array('msg'=>'success','info'=>'Your registration completed successfully !...');
				    echo json_encode($res);
				    http_response_code(200);  
			}else{
				
				$res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
					 echo json_encode($res);
					 http_response_code(200);  
			}
		}else{

				$res=array('msg'=>'error','errorInfo'=>'All Fileds Required');
					 echo json_encode($res);
					 http_response_code(200);  

		}
    }	
	
	
	/**
	  *
	  *--- Sing up as larboard ----
	  *
	  **/
	
	
	Public function signUpAsLandlord(){
		$info = file_get_contents("php://input");
		$info = json_decode($info);
		$userName=$info->userName; $email=$info->email; $phone=$info->phone; $password=$info->password;
			//----- checking required parameter
		if($userName !='' &&  $password !='' &&($email !='' || $phone !='')){
			$data=array('userName'=>$userName,'email'=>$email,'regDate'=>date('Y:m:d'),'status'=>'deactive','phone'=>$phone,'pass'=>md5($password),'role'=>'landlord');
			$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email));
			$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));
			if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
				$addUser=$this->ApiModel->insert_Data('users',$data);
				$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'tenant','actions'=>'New landlord SignUp','userID'=>$addUser,'progress_id'=>$addUser);
				$this->ApiModel->insert_Data('audit_log',$logData);
				$chatkit=$this->chatKit_token();
				$chatkit->createUser([
				  'id' => "$addUser"  ,
				  'name' => $data['userName']
				]);

				$room_id=$chatkit->createRoom([
				  'creator_id' => "$addUser",
				  'name' => 'Landlord Room'.$addUser,
				  'user_ids' => ["$addUser"],
				  'private' => false
				]);
				 
				$this->ApiModel->update_data($addUser,'id','users',array('room_id'=>$room_id['body']['id']));
				          
					$url=Activation_URL.'activation_link'.'?data='.base64_encode($email).'?'.base64_encode($password);
					$data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password,'url'=>$url);
                    $html=$this->load->view('mail_temp/account_created',$data,true);
					$subject="welcome to property management  ";
					$this->sendMail($email,$html,$subject);
						
			    $res=array('msg'=>'success','info'=>'Your registration completed successfully !...');
				    echo json_encode($res);
				    http_response_code(200);  
			}else
			{
				$res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
					 echo json_encode($res);
					 http_response_code(200); 
			}	
		}else{
			echo json_encode(array('error'));
		} 		
	}	
	
	
    /** save User One signal id */
    function saveOneSignalUserId()
    {
    	$oneSignalToken = file_get_contents("php://input");
    	$userId=$this->checklogin();
    	$query=$this->ApiModel->update_data($userId,'id','users',array('token'=>$oneSignalToken));
    	echo $query;
    }	

    /** save User One signal id */
    function saveOneSignalApp_Token()
    {
    	$oneSignalToken = (array)json_decode(file_get_contents("php://input"));
    	$userId=$this->checklogin();
    	$query=$this->ApiModel->update_data($userId,'id','users',array('app_token'=>$oneSignalToken['app_token']));
    	if($query)
    	{
    		 $res=array('msg'=>'success');
    	}else{
    		$res=array('msg'=>'error');
    	}
    	echo json_encode($res);
    }	
	/**
	  *
	  *--- Landlord can add  own staff members   ----
	  *
	  **/ 
	Public function addLandlordStaff(){		
	$info = file_get_contents("php://input");
		$info = json_decode($info);
		$userName=$info->userName; $email=$info->email; $phone=$info->phone; $user_type=$info->user_type;
			//----- checking required parameter
		if($userName !='' &&  $user_type !='' &&($email !='' || $phone !='')){
			$userId=$this->checklogin();
				if($userId){
					$data=array('userName'=>$userName,'email'=>$email,'status'=>'deactive','regDate'=>date('Y:m:d'),'phone'=>$phone,
					 'user_type'=>$user_type,'landlord_id'=>$userId);
			
					$checkEmailExist=$this->ApiModel->getDateFormTable('land_staff',array('email'=>$email));
					$checkPhoneExist=$this->ApiModel->getDateFormTable('land_staff',array('phone'=>$phone));
					if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
						$addUser=$this->ApiModel->insertData('land_staff',$data);
						$subject="welcome to property management";
						   // $data['info']=array('userName'=>$userName,'email'=>$email,'user_type'=>$user_type);
	                       // $html=$this->load->view('mail_temp/account_created',$data,true);
						   //$this->sendMail($email,$html,$subject);
						   //$data['id']=$this->db->insert_id();
						$res=array('msg'=>'success','info'=>'Staff added successfully !...','userData'=>$data);
							echo json_encode($res);
							http_response_code(200);  
					}else{
						 $res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
							 echo json_encode($res);
							 http_response_code(401);	
					}
				}
		}else{
			$this->requiredParameter();
		}	
	}  
	  
  /*   Public function addLandlordStaff(){
		
	$info = file_get_contents("php://input");
		$info = json_decode($info);
		$userName=$info->userName;$email=$info->email; $phone=$info->phone; $password=$info->password;
		
			//----- checking required parameter
		if($userName !='' &&  $password !='' &&($email !='' || $phone !='')){
			
				$userId=$this->checklogin();
				
				if($userId){
					 $data=array('userName'=>$userName,'email'=>$email,'status'=>'active','regDate'=>date('Y:m:d'),'phone'=>$phone,'pass'=>md5($password),'role'=>'landlordStaff','addedBy'=>'Landlord','landlordId'=>$userId);
			
					$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email,));
					$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));
					
				
					if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
						 $addUser=$this->ApiModel->insertData('users',$data);
						   						
							$subject="welcome to property management";
						    $data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password);
	                        $html=$this->load->view('mail_temp/account_created',$data,true);
							
							
							$this->sendMail($email,$html,$subject);
						     
						  $data['id']=$this->db->insert_id();
						   $res=array('msg'=>'success','info'=>'Staff added successfully !...','userData'=>$data);
							echo json_encode($res);
							http_response_code(200);  
					}else{
						
						 $res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
							 echo json_encode($res);
							 http_response_code(401);  
						
					}
				}
			
			
		}else{
			
			$this->requiredParameter();
			//echo json_encode(array('error'));
		}
		
		
		
	}  */
	
	
	
	/**
	  *
	  *--- Landlord can add  tenant   ----
	  *
	  **/ 
    Public function addTenantByLand()
    {	
    	$userId=$this->checklogin();
    	if($userId)
    	{
    		$info = file_get_contents("php://input");
		$info = json_decode($info);
		$userName=$info->userName; $email=$info->email; $phone=$info->phone; 
		$password=rand();
			//----- checking required parameter
		if($userName !='' &&  $email !='' && $phone !=''){
			
				if($userId){
					   $data=array('userName'=>$userName,'email'=>$email,'phone'=>$phone,'status'=>'deactive','regDate'=>date('Y:m:d'),'pass'=>md5($password),'role'=>'tenant','addedBy'=>'landlord','landlordId'=>$userId);
					    $checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email));
					    $checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));
				 	if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
						 $addUser=$this->ApiModel->insert_Data('users',$data);
						 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'New Tenant Added By landlord','userID'=>$userId,'progress_id'=>$addUser);
				 		$this->ApiModel->insert_Data('audit_log',$logData);
						$chatkit=$this->chatKit_token();
						$chatkit->createUser([
						  'id' => "$addUser",
						  'name' => $userName
						]);
						$room_id=$chatkit->createRoom([
						  'creator_id' => "$userId",
						  'name' => 'Tenant Room'.$addUser,
						  'user_ids' => ["$userId"],
						  'private' => false
						]);
						$room_id= $room_id['body']['id'];
				        $chatkit->addUsersToRoom([
						  'user_ids' => ["$addUser"],
						  'room_id' => $room_id
						]);
				 		  
				        $this->ApiModel->update_data($addUser,'id','users',array('room_id'=>$room_id));

						$url=Activation_URL.'activation_link?data='.base64_encode($email).'?'.base64_encode($password);					   
						$data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password,'url'=>$url);
	                    $html=$this->load->view('mail_temp/account_created',$data,true);
						$subject="welcome to property management";
						$this->sendMail($email,$html,$subject);
							
						$res=array('msg'=>'success','info'=>'Staff added successfully !...');
							echo json_encode($res);
							http_response_code(200);  
					}else{
						 $res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
							echo json_encode($res);
							http_response_code(200);	
					} 
				} 
		}else{
			$this->requiredParameter();
		}	

    	}
		
	}
	
	/**
	  *
	  *--- get all tenant created by  landlord   ----
	  *
	  **/ 
    Public function getTenantListCrByLand(){
		$userId=$this->checklogin();
				
				if($userId)
				{
					
					$data=$this->ApiModel->getDateFormTable('users','landlordId='.$userId.' AND role="tenant"');
					$res=array('msg'=>'success','tenantList'=>$data);
					echo json_encode($res);
					http_response_code(200);  
				
				}
		
		
		
	}  
	
	
	/**
	  *
	  *--- get all tenant created by  landlord   ----
	  *
	  **/ 
    Public function getStaffCrByLand(){
		$userId=$this->checklogin();
				
				if($userId){
					
					$data=$this->ApiModel->getDateFormTable('land_staff','landlord_id='.$userId);
					$res=array('msg'=>'success','staffList'=>$data);
					echo json_encode($res);
					http_response_code(200);  
				
				}
		
		
		
	}  
	
	
		/**
	  *
	  *--- getDorpdownList   ----
	  *
	  **/ 
    Public function getDorpdownList(){
		$data['countries']=$this->ApiModel->getDateFormTable('countries',array());
		$data['unit_type']=$this->ApiModel->getDateFormTable('unit_type',array());
		$res=array('msg'=>'success','catList'=>$data);
		echo json_encode($res);
		http_response_code(200);  	
	}
	
	Public function addProperties(){
		 $userId=$this->checklogin();
		$data= file_get_contents("php://input");
		
		// echo json_encode($_POST['propertyName']);
		//echo count($_FILES['property_image']['name']);
		//$temp=(array)json_decode($postdata);
		//echo json_encode($postdata);
		
		if($userId)
		{
			 $properties=array('landlord_id'=>$userId, 'country'=>$_POST['country'],'streetName'=>$_POST['streetName'],'city'=>$_POST['city'],'state'=>$_POST['state'],'pincode'=>$_POST['pincode'],'landmark'=>$_POST['landmark'],'suburbs'=>$_POST['suburbs'],'phone'=>$_POST['phone'],'notes'=>$_POST['notes'],'propertyType'=>$_POST['propertyType'],'propertyName'=>$_POST['propertyName'],'regDate'=>date('Y-m-d'));
	     		 $id=$this->ApiModel->insert_new_Data($properties);
	     		 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Addded New Property','userID'=>$userId,'progress_id'=>$userId);
				 		$this->ApiModel->insert_Data('audit_log',$logData);
	     		 $chatkit=$this->chatKit_token();
				 $room_id=$chatkit->createRoom([
				  'creator_id' =>  "$userId",
				  'name' => $_POST['propertyName'],
				  'user_ids' => ["$userId"],
				  'private' => false
				  ]);
				  $this->ApiModel->update_data($id,'id','properties',array('room_id'=>$room_id['body']['id']));
				//$info =(array)json_decode($postdata);
	     		 $properties_img=array();
			for($i=0;$i<count($_FILES['property_image']['name']);$i++)
			{


		      $img_name = explode('.', $_FILES['property_image']['name'][$i]);
		
				$extension = end($img_name);
				
				
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['property_image']['tmp_name'][$i];
				 $a2=$img_name[0].'_'.$pic_name;
				 $a3='uploads/Home_Images/'.$a2;
			
				move_uploaded_file($a1,$a3);
	             $properties_img[]=array('property_id'=>$id,'property_imges'=>$a3);
	     		
				  //$pro_id= $this->db->insert_id();
					
			}		
					// $unit=array('furnishing'=>'furnishing','propertyId'=>$pro_id,'flatHoseNo'=>$info->flatHoseNo,'regDate'=>date('Y-m-d'),'onRent'=>'NO');
					// $data=$this->ApiModel->insertData('units',$unit);
					 $res=$this->ApiModel->insert_multi_img('property_img',$properties_img);  
					$res=array('msg'=>'success');
					echo json_encode($res);
					http_response_code(200);  
					// echo json_encode($properties);
		}
		
		
	}
	
	Public function addNewProperties(){
		 $userId=$this->checklogin();
		$data= file_get_contents("php://input");
		
		// echo json_encode($_POST['propertyName']);
		//echo count($_FILES['property_image']['name']);
		//$temp=(array)json_decode($postdata);
		//echo json_encode($postdata);
		

	$main_data = (array)json_decode($_POST['data']);
	
		
	// print_r($_POST['data']['country']);
	  
if( $main_data['country'] !='' && $main_data['streetName'] !='' && $main_data['city'] !='' && $main_data['state'] !='' && $main_data['pincode'] !='' && $main_data['landmark'] !='' && $main_data['suburbs'] !='' && $main_data['notes'] !='' && $main_data['propertyType'] !='' && $main_data['propertyName'] !='' &&  count($_FILES['property_image']['name']) !=0 )
	 {

	 
		if($userId)
		{
				//$info =(array)json_decode($postdata);
		
			 $properties=array('landlord_id'=>$userId, 'country'=>$main_data['country'],'streetName'=>$main_data['streetName'],'city'=>$main_data['city'],'state'=>$main_data['state'],'pincode'=>$main_data['pincode'],'landmark'=>$main_data['landmark'],'suburbs'=>$main_data['suburbs'],'notes'=>$main_data['notes'],'propertyType'=>$main_data['propertyType'],'propertyName'=>$main_data['propertyName'],'regDate'=>date('Y-m-d'));
	     		 $id=$this->ApiModel->insert_new_Data($properties);
	     		  $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Addded New Property','userID'=>$userId,'progress_id'=>$userId);
				 		$this->ApiModel->insert_Data('audit_log',$logData);
	     		 $chatkit=$this->chatKit_token();
				 $room_id=$chatkit->createRoom([
				  'creator_id' => "$userId",
				  'name' => $main_data['propertyName'],
				  'user_ids' => ["$userId"],
				  'private' => false
				  ]);
				  $this->ApiModel->update_data($id,'id','properties',array('room_id'=>$room_id['body']['id']));

		  	$img_name = explode('.', $_FILES['property_image']['name']);
		
				$extension = end($img_name);
				
				
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['property_image']['tmp_name'];
				 $a2=$img_name[0].'_'.$pic_name;
				 $a3='uploads/Home_Images/'.$a2;
			
				move_uploaded_file($a1,$a3);
	            
				  
					$properties_img=array('property_id'=>$id,'property_imges'=>$a3);
					$res=$this->ApiModel->insertData('property_img',$properties_img); 
					$res=array('msg'=>'success');
					echo json_encode($res);
					http_response_code(200);  
					// echo json_encode($properties);
		}


	}else{
		 $res=array('msg'=>'error','errorInfo'=>'All Fileds Required ');
		 echo json_encode($res);

	}
		
	}
	
	
	
	
		/**
	  *
	  *--- get  properties list created by landlord   ----
	  *
	  **/ 
    Public function getPropertyCrByLand(){
		$userId=$this->checklogin();
				
				if($userId){
					
					//$data=$this->ApiModel->getDateFormTable('properties','landlord_id='.$userId);
					$data=$this->ApiModel->getDateFormProperties($userId);
					$res=array('msg'=>'success','properties'=>$data);
					echo json_encode($res);
					http_response_code(200);  
				
				}
		
		
		
	}  
	
 public function banklist(){
	 
	return $arr=array(
	          "First Abu Dhabi Bank (FAB)",
	          "Emirates NBD","Abu Dhabi Commercial Bank","Dubai Islamic Bank","MashreqBank","Abu Dhabi Islamic Bank (ADIB)","HSBC Bank Middle East - UAE Operations","Union National Bank","Commercial Bank of Dubai (CBD)","Emirates Islamic Bank","National Bank of Ras Al Khaimah (RAKBANK)","Al Hilal Bank","Noor Bank","Sharjah Islamic Bank","National Bank of Fujairah"
	 
	      );
	 
	 
 }
 
 
 /*-----
	  -- This Function for send  Mail 
	-----*/
	public function sendMail($to,$html,$subject){
		
	$message= $html;
	 	
	 	$config = array(
			'protocol' => 'smtp',
			'smtp_host' => 'ssl://smtp.googlemail.com',
			'smtp_port' => 465,
			'smtp_user' => 'husenshikalgar007@gmail.com', 
            'smtp_pass' => '95618409800',//my valid email password
            'mailtype' => 'html',
            'charset' => 'iso-8859-1',
            'wordwrap' => TRUE
                  );

		$this->email->initialize($config);
		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");  
		$this->email->from('husenshikalgar007@gmail.com'); 
              //$this->email->to($emial_id[0]['email']); // user Emial to who perches the Sticker
		$this->email->to($to);
		$this->email->subject($subject);
		$this->email->message($message); 
	    $this->email->send();

	}
//----------- Admin Section Api   -------	
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
	
	
	
   public function addUserByAdmin(){	
	$info = file_get_contents("php://input");
		$info = json_decode($info);
		$userName=$info->userName; $email=$info->email; $phone=$info->phone;  $role=$info->role;
		$password=rand();
		
			//----- checking required parameter
		if($userName !='' &&  $email !='' && $phone !=''){
			
				$userId=$this->checklogin();
				
				 if($userId){
					 $data=array('userName'=>$userName,'status'=>'deactive','email'=>$email,'phone'=>$phone,'regDate'=>date('Y:m:d'),'pass'=>md5($password),'role'=>$role,'addedBy'=>'admin','landlordId'=>$userId);
			
					$checkEmailExist=$this->ApiModel->getDateFormTable('users',array('email'=>$email));
					$checkPhoneExist=$this->ApiModel->getDateFormTable('users',array('phone'=>$phone));
				//	echo json_encode(array($userId));
				
				 	if(count($checkEmailExist)==0 && count ($checkPhoneExist)==0){
						 $addUser=$this->ApiModel->insertData('users',$data);
						
						  $data['id']=$this->db->insert_id();
						    $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'admin','actions'=>'Admin Addded '.$role,'userID'=>$userId,'progress_id'=>$data['id']);
				 		     $this->ApiModel->insert_Data('audit_log',$logData);
							//$userData['userName']="userName";
							//$html=$this->load->view('email_temp/reg_tenant',$userData,true);
						  $url=base_url().'activation_link'.'?data='.base64_encode($email).'?'.base64_encode($password);
							$subject="welcome to property management";
						    $data['info']=array('userName'=>$userName,'email'=>$email,'password'=>$password,'url'=>$url);
	                        $html=$this->load->view('mail_temp/account_created',$data,true);
							$this->sendMail($email,$html,$subject);
							
							$res=array('msg'=>'success','info'=>'Staff added successfully !...');
							echo json_encode($res);
							http_response_code(200);  
					}else{
						
						 $res=array('msg'=>'error','errorInfo'=>'This email / phone already exist  ');
							 echo json_encode($res);
							 http_response_code(200);  
						
					} 
				} 
			
			
		}else{
			
			$this->requiredParameter();
			//echo json_encode(array('error'));
		}
     }



	Public function deleteUserByAdmin(){
		$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId){
					
					$data=$this->ApiModel->deleteData('users',"id=".$info->id);
					 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'admin','actions'=>'Delete The User','userID'=>$userId,'progress_id'=>$info->id);
				 		     $this->ApiModel->insert_Data('audit_log',$logData);
					$res=array('msg'=>'success','info'=>'user Deleted successfully ...!');
					echo json_encode($res);
					http_response_code(200);  
				
				}
	}
		


  	Public function activeDeactivateUser(){
		$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId){
					
				    $data=$this->ApiModel->updateData(array('status'=>$info->status),$info->id);
					$res=array('msg'=>'success','info'=>$info);
					echo json_encode($res);
					http_response_code(200);  
				
				}
	}
	
  
	
	public function updateUserInfoByAdmin(){
		
		$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId){
		         $data=$this->ApiModel->updateData(array('userName'=>$info->userName,'phone'=>$info->phone,'role'=>$info->role),$info->id);
		          $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'admin','actions'=>'Update The User Info','userID'=>$userId,'progress_id'=>$info->id);
		           $this->ApiModel->insert_Data('audit_log',$logData);
					$res=array('msg'=>'success','allUsers'=>$info);
					echo json_encode($res);
					http_response_code(200); 
					
				}
		
	}
	
	
	public function updateAdminProfile(){
		
		$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId){
				
		        $data=$this->ApiModel->updateData(array('userName'=>$info->userName,'email'=>$info->email,'phone'=>$info->phone,'country'=>$info->country,'address'=>$info->address),$userId);
				  $tbl="users";
				 $select="userName,email,phone,role,country,address,profilephoto";
				 $con="users.id=".$userId;
				 $chatkit=$this->chatKit_token();
				 $room_update=$chatkit->updateUser([
				  'id' => $userId,
				  'name' => (string)$info->userName,
				]);
				$userdata=$this->ApiModel->getLimitedData($tbl,$select,$con);
				 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'admin','actions'=>'Update Admin Profile','userID'=>$userId,'progress_id'=>$userId);
		           $this->ApiModel->insert_Data('audit_log',$logData);
					$res=array('msg'=>'success','info'=>$userdata[0]);
					echo json_encode($res);
					http_response_code(200); 
					
				}
		
	}
	
	
	
	public function updateProfileInfo(){
		
		$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId){
				
		        $data=$this->ApiModel->updateData(array('userName'=>$info->userName,'phone'=>$info->phone,'country'=>$info->country,'address'=>$info->address),$userId);
		        $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'admin','actions'=>'Update User Profile','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
				 $tbl="users";
				 $chatkit=$this->chatKit_token();
				 $room_update=$chatkit->updateUser([
				  'id' => $userId,
				  'name' => (string)$info->userName,
				]);
				 $select="userName,email,phone,role,country,address,profilephoto";
				 $con="users.id=".$userId;
				 $userdata=$this->ApiModel->getLimitedData($tbl,$select,$con);
				 $res=array('msg'=>'success','info'=>$userdata[0]);
				 echo json_encode($res);
				 http_response_code(200); 
				}
		
	}

	public function updateProfileInfoMobile(){
		
		$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId){
				
		        $data=$this->ApiModel->updateData(array('userName'=>$info->userName,'phone'=>$info->phone),$userId);
		         $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'admin','actions'=>'Update User Profile','userID'=>$userId,'progress_id'=>$userId);
		           $this->ApiModel->insert_Data('audit_log',$logData);
				 $tbl="users";
				  $chatkit=$this->chatKit_token();
				 $room_update=$chatkit->updateUser([
				  'id' => $userId,
				  'name' => (string)$info->userName,
				]);
				 $select="userName,email,phone,role,country,profilephoto";
				 $con="users.id=".$userId;
				 $userdata=$this->ApiModel->getLimitedData($tbl,$select,$con);
				 $res=array('msg'=>'success','info'=>$userdata[0]);
				 echo json_encode($res);
				 http_response_code(200); 
					
				}
		
	}

		public function changePassword(){
		
		
			$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId)
				{
				  $check=$this->ApiModel->getDateFormTable('users',array('id'=>$userId,'pass'=>md5($info->currentPass)));

					if(count($check)!=0){
						  $data=$this->ApiModel->updateData(array('pass'=>md5($info->pass)),$userId);
					      $res=array('msg'=>'success','info'=>'');
						
					}else{
						
						// $data=$this->ApiModel->updateData(array('pass'=>md5($info->pass)),$userId);
					      $res=array('msg'=>'error','errorInfo'=>'current password  not matched...! ');
					}
		       
					echo json_encode($res);
					http_response_code(200); 
					
				}
	}
	
	
	public function uploadProfileImage(){
	
		$userId=$this->checklogin();
		if(count($_FILES['selectFile']['name']) !=0)
		{
		

			if($userId){
			
				$target_dir ="uploads/profile/";	
				$target_dir_thumb ="uploads/profile/thumbnails/";   
				if($_FILES['selectFile']['name']){
					$temp = $_FILES['selectFile']['tmp_name'];
					$ext=(explode(".",$_FILES['selectFile']['name']));
					$imagename="property".rand().".".$ext[1];		  
					$result=move_uploaded_file($_FILES['selectFile']['tmp_name'],$target_dir.$imagename);
					$fileurl=$target_dir.$imagename;
					if($result==1){
						$config['image_library'] = 'gd2';
						$config['source_image'] = $target_dir.$imagename;
						$config['new_image']=$target_dir_thumb;
						$config['create_thumb'] = TRUE;
						$config['maintain_ratio'] = TRUE;
						$config['width'] = 40;
						$config['height'] = 40;
						$this->load->library('image_lib', $config);
						 $this->image_lib->resize();
						$imgDetailArray=explode('.',$imagename);
						$thumbimgname=$imgDetailArray[0].'_thumb';
						$thumbimg=$thumbimgname.'.'.$imgDetailArray[1];
						$thumburl=$target_dir_thumb.$thumbimg;
						if(!$this->image_lib->resize()) echo $this->image_lib->display_errors();

						$data=array(
							'profilephoto'=>$fileurl, // orignalfile
							//'profilephoto'=>$thumburl, //resize file
													
						);

					    $saved= $this->ApiModel->updateData($data,$userId);
					     $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'admin','actions'=>'Update User Profile Image','userID'=>$userId,'progress_id'=>$userId);
		                  $this->ApiModel->insert_Data('audit_log',$logData);
						if($saved){
							 $res=array('msg'=>'success','profilephoto'=>$fileurl);
							echo json_encode($res);
						}
						
					  }
				    }
				
				}

		}


	 }
			
	  /**
	 *
	 * activeDeactivateLandStaff
	 **/
	Public function activeDeactivateLandStaff(){
		$userId=$this->checklogin();
		$info = file_get_contents("php://input");
		$info = json_decode($info);
				if($userId){
					
				    $data=$this->ApiModel->updateTableData(array('status'=>$info->status),array("id"=>$info->id),'land_staff');
					$res=array('msg'=>'success','info'=>$info);
					echo json_encode($res);
					http_response_code(200);  
				
				}
	}	


	public function getProfileImage()
	{
		$userId=$this->checklogin();
		$data=$this->ApiModel->getProfilePicture($userId);
		echo json_encode($data);
		http_response_code(200);  
	}	

	public function insert_unit_data()
	{
		$info = file_get_contents("php://input");
		$userId=$this->checklogin();
		$abc=array();
		$image_data=array();
		$data=$_POST;
		$alldata=array('propertyId'=>$_POST['proprtyId'],'flatHoseNo'=>$_POST['flatno'],'unitType'=>$_POST['unitType'],'furnishing'=>$_POST['FurnishingType'],'regDate'=>Date('Y-m-d'));
		$unit_id=$this->ApiModel->insert_unitData($alldata);
		 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'admin','actions'=>'Landlord Added New Unit','userID'=>$userId,'progress_id'=>$userId);
		    $this->ApiModel->insert_Data('audit_log',$logData);
		 $files=count($_FILES['houseImage']['name']);
		for($i=0;$i < $files;$i++)
		{


		$img_name = explode('.', $_FILES['houseImage']['name'][$i]);
		
				$extension = end($img_name);
				
				
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['houseImage']['tmp_name'][$i];
				 $a2=$img_name[0].'_'.$pic_name;
				 $a3='uploads/Home_Images/'.$a2;
			
				move_uploaded_file($a1,$a3);//
			$abc[]=array('home_img'=>$a3,'unit_id'=>$unit_id);

		}
			
		// $document_img=count($_FILES['document_image']['name']);

		// for($i=0;$i < $document_img;$i++)
		// {

		// $img_name1 = explode('.', $_FILES['document_image']['name'][$i]);
		
		// 		$extension1 = end($img_name1);
				
				
		// 		$pic_name1=mt_rand().'.'.$extension1;
		// 		$b1=$_FILES['document_image']['tmp_name'][$i];
		// 		 $b2=$img_name1[0].'_'.$pic_name1;
		// 		 $b3='uploads/Home_Images/'.$b2;
			
		// 		move_uploaded_file($b1,$b3);//
		// 	$image_data[]=array('description'=>$_POST['description'][$i],'d_img'=>$BASE_URL.$b3,'unit_id'=>$unit_id);
		// 	//$document_image_array[]= array('description'=>$_POST['description'][$i],'d_image'=>$BASE_URL.$b3);

		// }

		// $this->db->insert_batch('unit_data',$image_data);
		$res=$this->db->insert_batch('unit_img',$abc);
		echo $res;

	}

	public function updateLandData()
	{
		$data= (array)json_decode(file_get_contents("php://input"));
		$userId=$this->checklogin();
	if($data['password'] !='' && $data['email'] !='' && $data['mobile'] !='' && $data['name'] !=''  && $data['newpassword'] !='')
	{


		$query=$this->ApiModel->chcek_user_info($userId,$data['password']);
		if($query==1)
		{
			$emailCheck=$this->ApiModel->email_check($userId,$data['email']);
			if($emailCheck==0)
			{
					$phoneCheck=$this->ApiModel->phone_check($userId,$data['mobile']);
					
					if($phoneCheck==0)
					{
						 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'admin','actions'=>'Landlord Update Profile','userID'=>$userId,'progress_id'=>$userId);
		                  $this->ApiModel->insert_Data('audit_log',$logData);

							$updateQuery=$this->ApiModel->updateTableData(array('userName'=>$data['name'],'email'=>$data['email'],'phone'=>$data['mobile'],'pass'=>md5($data['newpassword'])),array('id'=>$userId),'users');
							$res=array('msg'=>'success','res'=>true);
					}

			}else{
				$res=array('msg'=>'Eamil Alrady Registerd','res'=>false);
			}
			$emailCheck;	

		}else{
			$res=array('msg'=>'Password InCorrect','res'=>false);
		}
		// $info =file_get_contents("php://input");
		// $info= json_decode($info);
		echo json_encode($res);
	}else{

		$res=array('msg'=>'All Fileds Required','res'=>false);
		echo json_encode($res);
	}

	}

	public function get_occupied_Property_list()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->get_occupied_Property_list($userId);
		
		echo json_encode($query);
	}

	public function get_vaccant_Property_list()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->get_vaccant_Property_list($userId);
		echo json_encode($query);
	}

	public function get_all_unitDetails()
	{
		$info =(array) json_decode(file_get_contents("php://input"));
		$id= $info['propertyId'];
		if($id != '')
		{
		$query=$this->ApiModel->get_all_unitData($id);
		echo json_encode($query);
	    }
	}

	public function get_all_unitDetails_vacant()
	{
		$info =(array) json_decode(file_get_contents("php://input"));
		$id= $info['propertyId'];
		if($id != '')
		{
		$query=$this->ApiModel->get_all_unitDetails_vacant($id);
		echo json_encode($query);
		}
	}

	public function get_unitANDteanatDetails()
	{
		$info =(array) json_decode(file_get_contents("php://input"));
		$id= $info['UnitId'];
		if($id != '')
		{
		$query['unit_details']=$this->ApiModel->get_unitANDteanatDetails($id);
		$query['unit_img']=$this->ApiModel->get_unit_img($id);
		echo json_encode($query);
	    }
	}
	public function remove_tenant_unit()
	{
		$userId=$this->checklogin();
		if($userId)
		{
			$data = (array)json_decode(file_get_contents("php://input"));
		    $query=$this->ApiModel->remove_tenant_unit($data['unit_id'],$data['tenant_id']);
			if($query==true)
			{
				$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Remove Tenant In Unit','userID'=>$userId,'progress_id'=>$data['tenant_id']);
			        $this->ApiModel->insert_Data('audit_log',$logData);
				$res=array('msg'=>'success','res'=>true);
				echo json_encode($res);
			}
		
		}
		
	}
	public function remove_lease()
	{
		$data = (array)json_decode(file_get_contents("php://input"));
		$userId=$this->checklogin();
		$unit_id=$data['unitID'];
		$query=$this->ApiModel->remove_lease($unit_id);
		if($query == 1)
		{
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Remove Lease','userID'=>$userId,'progress_id'=>$userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
			$res=array('msg'=>'success','res'=>true);
		}else{
			$res=$query;
		}
		echo json_encode($res);

	}

	/*Edit lease api:start */
	public function edit_lease_unit()
	{
		$data =json_decode(file_get_contents("php://input"));
		$id=(array)$data;
		$userId=$this->checklogin();
		$alldata=array('startDate' =>$id['start_date'],'endDate'=>$id['end_date'],'rentAmount'=>$id['rent'],'paymentFrequency'=>$id['payment_frequency'],'paymentDay'=>$id['payment_day'],'depositAmount'=>$id['deposite_amount'],'tenantReminder'=>$id['tenant_reminder'],'overdueReminder'=>$id['overview_reminder'],'unit_id'=>$id['unit_id']);
		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'landlord','actions'=>'Landlord Edit Lease Details','userID'=>$userId,'progress_id'=>$userId);
		     $this->ApiModel->insert_Data('audit_log',$logData);
		// $this->ApiModel->update_unit_status($id['unit_id'],array('lease_status'=>'1'));
		$query=$this->ApiModel->update_lease_data($id['unit_id'],$alldata);
		$res=array('msg'=>'success','data'=>$query);
		echo json_encode($res);
		http_response_code(200);
	}

	/*Edit lease api:End */

	/* Edit Property Image:Start*/
	public function edit_properties_image()
	{
		$property_id=$_POST['property_id'];
		$userId=$this->checklogin();
		$img_name = explode('.', $_FILES['select_file']['name']);
		
				$extension = end($img_name);
				
				
				$pic_name=mt_rand().'.'.$extension;
				$a1=$_FILES['select_file']['tmp_name'];
				 $a2=$img_name[0].'_'.$pic_name;
				 $a3='uploads/profile/'.$a2;
			
				move_uploaded_file($a1,$a3);

			$query=$this->ApiModel->UpdatePropertyProfile($property_id,array('property_imges'=>$a3));
			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'landlord','actions'=>'Landlord Edit Property Image','userID'=>$userId,'progress_id'=>$userId);
		     $this->ApiModel->insert_Data('audit_log',$logData);
			echo json_encode($query);
	}

	
}
