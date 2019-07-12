<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 require __DIR__ .'/../../vendor/autoload.php';
 // require __DIR__ . '/../../safaricom/mpesa/autoload.php';
// require FCPATH . 'vendor/autoload.php';
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
class AdminNew extends CI_Controller {

	
	
	 function __construct() {
        parent::__construct();
         
        $this->load->library(array('JwtAuth','form_validation'));
	    $this->load->model('ApiModel');
		$this->load->helper(array('form', 'url'));
// 		$this->db->query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
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



	public function chatKit_token()
	{
		$chatkit = new Chatkit\Chatkit([
			  'instance_locator' => instance_locator,
			  'key' => key
			]);
		return $chatkit;
	}
	 public function send_email_recipt()
	 {
	 	$transactionId=file_get_contents("php://input");
	   $transactionDetails=$this->ApiModel->get_transaction($transactionId);
		$additonal=$this->ApiModel->get_Treansaction_data('additional_transaction','transaction_id',$transactionId);
		$deduction=$this->ApiModel->get_Treansaction_data('deduction_transaction','transaction_id',$transactionId);
		// echo json_encode($transactionId);
		$pay_method=$transactionDetails[0]['payment_type'] == 1?'Cash' : $transactionDetails[0]['payment_type'] == 2 ?'Check' : 'Other';
		$payment_status=$transactionDetails[0]['payment_status'] == 0 ?'Unpaid' : $transactionDetails[0]['payment_status'] == 1 ?'Paid' : 'Others';
	 	$html='<!DOCTYPE html>
  <html>
	<head>
		<title>Receipt</title>
		
	</head>
	<body>
		<div class="receiptDetail" style="padding:30px 0px 0px; width: 100%;float: left;">
			<div class="receiptDetailInner" style="border: 1px solid #0275fe;width: 100%;float: none;margin: 0px auto;position:relative;max-width: 700px;">
				<h4 class="recHead" style=" font-size: 20px;margin: 0 !important;background-color: #0275fe;color: #fff;padding: 5px 15px;">Rent Receipt</h4>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Date</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">	: '.$transactionDetails[0]['payment_date'].'</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Received From	</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">:  '.$transactionDetails[0]['tenant_name'].'	</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Rental Property	</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">: '.$transactionDetails[0]['flatHoseNo'].'	</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Payment Received As</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">: Rent	</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Payment Method</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">	:
					'.$pay_method.'	</p>				
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">For The Period	</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">: '.$transactionDetails[0]['start_period'].' To '.$transactionDetails[0]['end_period'].'	</p>
				</div>
				<div class="fullwidth DFlex" style="display: inline-block;width: 100%;border-bottom: 1px solid #666;margin: 0px 0;">
					<div class="text-left" style="text-align:left;width:38%;padding: 0 40px 0;float:left">
						<h3 style="font-size: 20px;">Charge Description</h3>
						<p style="font-size: 16px;color: #000;">Sub Total</p>
					</div>
					<div class="text-right" style="text-align:right;width:38%;padding: 0 40px 0;float:right">
						<h3 style="font-size: 20px;">Amount</h3>
						<p style="font-size: 16px;color: #000;">KSh '.$transactionDetails[0]['amount'].'</p>
					</div>';
					foreach ($additonal as $add) 
					{
						 $add_type=$add['add_type'] == 0? 'Ksh':'%';
						$html.='<div class="listReceipt" style="padding: 0px 40px 25px;width: 89%;float: left;">
							<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">'.$add['add_text'].'</p>
							<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;text-align:right">(+) '. $add_type .' '.$add['add_digit'].'</p>
						</div>';
				    }

				    foreach ($deduction as $deduct) 
					{
						 $remove_type=$deduct['remove_type'] == 0 ? 'Ksh':'%';
					$html.='<div class="listReceipt" style="padding: 0px 40px 25px;width: 89%;float: left;">
						<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">'.$deduct['remove_text'].'</p>
						<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;text-align:right">(-)'. $remove_type .' ' .$deduct['remove_digit'].'	</p>
					</div>';
				   }
					
				$html.='</div>
				<div class="fullwidth DFlex" style="display: inline-block;width: 100%;margin: 0px 0;padding: 15px 0 0;">
					<div class="text-left" style="text-align:left;width:38%; padding: 0 40px 0;float:left;">
						<p style="font-size: 16px;color: #000;">Total Charges</p>
						<p style="font-size: 16px;color: #000;">Landlord:</p>
					</div>
					<div class="text-right" style="text-align:right;width:38%; padding: 0px 40px 0;float:right;">
						<p style="font-size: 16px;color: #000;">KSh '.$transactionDetails[0]['totalAmount'].'</p>
						<p style="font-size: 16px;color: #000;">'.$transactionDetails[0]['userName'].'</p>
					</div>
				</div>
				<div class="paidDiv" style="position: absolute;right: 10px;height: 60px;width: 60px;border: 2px dashed red;border-radius: 50% !important;display: table;justify-content: center; align-items: center;top: 48px;transform: rotate(40deg);">
					<h4 style="color: red; margin: 0;font-size: 18px;display: table-cell;vertical-align: middle;text-align: center;">'.$payment_status.'</h4>
				</div>
			</div>
		</div>
	</body>
</html>';

$to=$transactionDetails[0]['email'];
$subject='Payment Details';
	$this->sendMail($to,$html,$subject);
 }

  public function send_email_recipt_mobile()
	 {
	 	$data=(array)json_decode(file_get_contents("php://input"));
	 	$transactionI=$data['transaction_id'];
	   $transactionDetails=$this->ApiModel->get_transaction($transactionId);
		$additonal=$this->ApiModel->get_Treansaction_data('additional_transaction','transaction_id',$transactionId);
		$deduction=$this->ApiModel->get_Treansaction_data('deduction_transaction','transaction_id',$transactionId);
		// echo json_encode($transactionId);
		$pay_method=$transactionDetails[0]['payment_type'] == 1?'Cash' : $transactionDetails[0]['payment_type'] == 2 ?'Check' : 'Other';
		$payment_status=$transactionDetails[0]['payment_status'] == 0 ?'Unpaid' : $transactionDetails[0]['payment_status'] == 1 ?'Paid' : 'Others';
	 	$html='<!DOCTYPE html>
  <html>
	<head>
		<title>Receipt</title>
		
	</head>
	<body>
		<div class="receiptDetail" style="padding:30px 0px 0px; width: 100%;float: left;">
			<div class="receiptDetailInner" style="border: 1px solid #0275fe;width: 100%;float: none;margin: 0px auto;position:relative;max-width: 700px;">
				<h4 class="recHead" style=" font-size: 20px;margin: 0 !important;background-color: #0275fe;color: #fff;padding: 5px 15px;">Rent Receipt</h4>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Date</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">	: '.$transactionDetails[0]['payment_date'].'</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Received From	</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">:  '.$transactionDetails[0]['tenant_name'].'	</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Rental Property	</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">: '.$transactionDetails[0]['flatHoseNo'].'	</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Payment Received As</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">: Rent	</p>
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">Payment Method</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">	:
					'.$pay_method.'	</p>				
				</div>
				<div class="listReceipt" style="padding: 25px 40px 0;width: 100%;float: left;">
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">For The Period	</p>
					<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">: '.$transactionDetails[0]['start_period'].' To '.$transactionDetails[0]['end_period'].'	</p>
				</div>
				<div class="fullwidth DFlex" style="display: inline-block;width: 100%;border-bottom: 1px solid #666;margin: 0px 0;">
					<div class="text-left" style="text-align:left;width:38%;padding: 0 40px 0;float:left">
						<h3 style="font-size: 20px;">Charge Description</h3>
						<p style="font-size: 16px;color: #000;">Sub Total</p>
					</div>
					<div class="text-right" style="text-align:right;width:38%;padding: 0 40px 0;float:right">
						<h3 style="font-size: 20px;">Amount</h3>
						<p style="font-size: 16px;color: #000;">KSh '.$transactionDetails[0]['amount'].'</p>
					</div>';
					foreach ($additonal as $add) 
					{
						 $add_type=$add['add_type'] == 0? 'Ksh':'%';
						$html.='<div class="listReceipt" style="padding: 0px 40px 25px;width: 89%;float: left;">
							<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">'.$add['add_text'].'</p>
							<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;text-align:right">(+) '. $add_type .' '.$add['add_digit'].'</p>
						</div>';
				    }

				    foreach ($deduction as $deduct) 
					{
						 $remove_type=$deduct['remove_type'] == 0 ? 'Ksh':'%';
					$html.='<div class="listReceipt" style="padding: 0px 40px 25px;width: 89%;float: left;">
						<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;">'.$deduct['remove_text'].'</p>
						<p style="margin: 0;width: 50%;float: left;font-size: 16px;color: #000;text-align:right">(-)'. $remove_type .' ' .$deduct['remove_digit'].'	</p>
					</div>';
				   }
					
				$html.='</div>
				<div class="fullwidth DFlex" style="display: inline-block;width: 100%;margin: 0px 0;padding: 15px 0 0;">
					<div class="text-left" style="text-align:left;width:38%; padding: 0 40px 0;float:left;">
						<p style="font-size: 16px;color: #000;">Total Charges</p>
						<p style="font-size: 16px;color: #000;">Landlord:</p>
					</div>
					<div class="text-right" style="text-align:right;width:38%; padding: 0px 40px 0;float:right;">
						<p style="font-size: 16px;color: #000;">KSh '.$transactionDetails[0]['totalAmount'].'</p>
						<p style="font-size: 16px;color: #000;">'.$transactionDetails[0]['userName'].'</p>
					</div>
				</div>
				<div class="paidDiv" style="position: absolute;right: 10px;height: 60px;width: 60px;border: 2px dashed red;border-radius: 50% !important;display: table;justify-content: center; align-items: center;top: 48px;transform: rotate(40deg);">
					<h4 style="color: red; margin: 0;font-size: 18px;display: table-cell;vertical-align: middle;text-align: center;">'.$payment_status.'</h4>
				</div>
			</div>
		</div>
	</body>
</html>';

	$to=$transactionDetails[0]['email'];
	$subject='Payment Details';
	$this->sendMail($to,$html,$subject);
 }


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

	public function delete_transaction()
	{
		$transactionId=file_get_contents("php://input");
		$userId=$this->checklogin();
		$query=$this->ApiModel->delete_data('transaction','id',$transactionId);
		$query=$this->ApiModel->delete_data('additional_transaction','transaction_id',$transactionId);
		$query=$this->ApiModel->delete_data('deduction_transaction','transaction_id',$transactionId);
		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Delete Transaction','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		echo json_encode($query);
	}

	public function get_message_land()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->get_message_land($userId);
		echo json_encode($query);
	}

	public function get_all_message()
	{
		$userId=$this->checklogin();
		$msgData=json_decode(file_get_contents("php://input"));
		$query['messages']=$this->ApiModel->get_all_message($msgData);
		$query['landlord_info']=$this->ApiModel->get_landlord_info($msgData);
		echo json_encode($query);
	}

	public function get_prop_transaction()
	{
		$property_id=file_get_contents("php://input");
		$query=$this->ApiModel->get_prop_transaction($property_id);
		echo json_encode($query);
	}

	public function get_transaction_data()
	{
		$userId=$this->checklogin();
		 $query['transaction_data']=$this->ApiModel->get_transaction_data($userId);
		 $query['unit_data']=$this->ApiModel->get_tenant_data($userId);
		 $query['in_progress_payment']=$this->ApiModel->in_progress_payment($userId);
		 $query['landlord_details']=$this->ApiModel->get_landlord_details($userId);

		echo json_encode($query);
	}

	public function get_lease_details()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->get_lease_data_tenant($userId);
		echo json_encode($query);
	}

	public function get_files_details()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->get_files_details_tenant($userId);
		echo json_encode($query);
	}

	public function save_tenant_document()
	{
		$data=(array)json_decode(file_get_contents("php://input"));
		$userId=$this->checklogin();
		 $img_name1 = explode('.', $_FILES['selectFile']['name']);
		
				$extension1 = end($img_name1);
				$pic_name1=mt_rand().'.'.$extension1;
				$b1=$_FILES['selectFile']['tmp_name'];
				 $b2=$img_name1[0].'_'.$pic_name1;
				 $b3='uploads/Home_Images/'.$b2;
			
				move_uploaded_file($b1,$b3);
	   		// $data=$_POST;
	   		$data['file']=$b3;
	   		$data['file_format']=$extension1;
	   		$data['date']=date('Y-m-d');
	   		$data['unit_id']=$_POST['unit_id'];
	   		$data['type']=$_POST['document_type'];
	   		$data['document_name']=$_POST['document_name'];
	   		$data['tenant_id']=$userId;

	   		 $query=$this->ApiModel->insertData('document',$data);
	   		 $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'Tenant','actions'=>'Tenant Add New Document','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);

	   		echo json_encode($data);
	}

	public function get_serach_landlord()
	{
		$query=$this->ApiModel->get_serach_landlord();
		echo json_encode($query);
	}

	public function get_land_properties()
	{
		$land_id=file_get_contents("php://input");
		$query=$this->ApiModel->get_land_properties($land_id);
		echo json_encode($query);

	}


	public function get_unit_details_tenent()
	{
		$property_id=file_get_contents("php://input");
		$query=$this->ApiModel->get_unit_details_tenent($property_id);
		echo json_encode($query);
	}

	public function invite_landlord()
	{
		 $data=(array)json_decode(file_get_contents("php://input"));
		 $html='join my website '.ANGULAR_URL;
		 $subject="Invitation";
		 $this->sendMail($data['email'],$html,$subject);
		echo json_encode($data['email']);
	}

	public function invite_landlord_phone()
	{
		$data=(array)json_decode(file_get_contents("php://input"));
    
		    // Set your app credentials
			// $username = 'sandbox'; // use 'sandbox' for development in the test environment
			// $apiKey   = '28129fb57268a41a3775c0367fd5f5cbe63384f7dfdf8f049ef69e8b2a8f3791'; // use your sandbox app API key for development in the test environment
			// $AT       = new AfricasTalking($username, $apiKey);

			// // Get one of the services
			// $sms      = $AT->sms();

			// // Use the service
			// $result   = $sms->send([
			//     'to'      => '+917517232120',
			//     'message' => 'Hello World!'
			// ]);
			echo json_encode($data);
	
	}
	public function savePersonalMsgTenant()
	{ 
		

		// $chatkit->authenticate([ 'user_id' => '21' ]);
		// $data=$chatkit->addUsersToRoom([
		//   'user_ids' => ['12'],
		//   'room_id' => '31222388'
		// ]);
		// $data=$chatkit->createUser([
		//   'id' => '13',
		//   'name' => 'Rahul'
		// ]);
		// $chatkit=$this->chatKit_token();
		// // $data=$chatkit->sendSimpleMessage([
		// //   'sender_id' => '10',
		// //   'room_id' => '31222388',
		// //   'text' => 'This is a ZXCxdc xcfdxgvbc Not wonderful  message.'
		  
		// // ]);

		//  $chatkit=$this->chatKit_token();
  //   // $room_id=$this->RequestApiModel->get_room_id(2);
	 //    $data= $chatkit->addUsersToRoom([
	 //      'user_ids' => ['1'],
	 //      'room_id' => '31222580'
	 //    ]);
		// print_r($data['body']);


		  // $options = array(
	   //  'cluster' => 'ap2',
	   //  'useTLS' => true
	   //   );
	  /*$pusher = new Pusher\Pusher(
	    '91048c7220eb90664443',
    'c6540e2a262c2f396853',
    '787096',
	    $options
	  );*/
	 //  $pusher = new Pusher\Pusher(
  //   '3582e982ad4955c87d3f',
  //   'e47ae6380e0c91e6a232',
  //   '787924',
  //   $options
  // );

		  // $pusher->trigger('my-channel', 'new-comment', $data);

		$userId=$this->checklogin();
		$_POST['tenant_id']=$userId;
		$query=$this->ApiModel->insert_Data('contact_landlord',$_POST);
		$data=array('sender_id'=>$userId,'receiver_id'=>$_POST['landlord_id'],'title'=>'Subject','color'=>'Orange','description'=>'Tenant Send New Subject','redirect_url'=>'/messages/'.$userId);
		$token=$this->myfuncationlab->getNotificationToken($_POST['landlord_id']);
		$notification=$this->myfuncationlab->sendNotification($token,'Tenant Send New Subject');
		$query=$this->ApiModel->insertData('notification',$data);
		 // $data=$this->ApiModel->get_subject_data($query);
	   // $data=json_encode($data);
	    // $pusher->trigger('my-channel', 'new', $data);
		// echo json_encode($notification);
		//$data=(array)json_decode(file_get_contents("php://input"));
		  // $pusher->trigger('myNew-channel', 'new-comment', $data);

		echo json_encode($query); 
	}

	public function active_deactive_unit()
	{
		$data=(array)json_decode(file_get_contents("php://input"));
		$id=$data['unit_id'];
		$alldata=array('linkMultiTenant'=>$data['value']);
		$query=$this->ApiModel->update_unit_status($id,$alldata);
		echo json_encode($query);
	}

	public function save_Tenant_msg()
	{
		$userId=$this->checklogin();
		$_POST['tenant_id']=$userId;
		$query=$this->ApiModel->insertData('personal_chat',$_POST);
		$data=array('sender_id'=>$userId,'receiver_id'=>$_POST['landlord_id'],'description'=>'Tenant Send New Message','title'=>'Message','color'=>'blue','redirect_url'=>'/messages/'.$userId);
		$token=$this->myfuncationlab->getNotificationToken($_POST['landlord_id']);
		$notification=$this->myfuncationlab->sendNotification($token,'Tenant Send New Message');
		$query=$this->ApiModel->insertData('notification',$data);
		echo json_encode($query);
	}

	public function get_sender_name_land()
	{
		$userId=$this->checklogin();
		$query['sender_name']=$this->ApiModel->get_sender_name_land($userId);
		$query['landlord_details']=$this->ApiModel->get_land_data($userId);
		echo json_encode($query);
	}

	public function get_tenant_subject()
	{
		$userId=$this->checklogin();
		$msgData=json_decode(file_get_contents("php://input"));
		$query=$this->ApiModel->get_tenant_subject($userId,$msgData);
		echo json_encode($query);
	}

	public function get_tenantANDland_msg()
	{
		$userId=$this->checklogin();
		$msgData=json_decode(file_get_contents("php://input"));
		$query['messages']=$this->ApiModel->get_tenantANDland_msg($userId,$msgData);
		$query['tenant_details']=$this->ApiModel->get_tenant_deatils($msgData);
		echo json_encode($query);
	}

	public function save_landlord_msg()
	{
		$userId=$this->checklogin();
		$_POST['landlord_id']=$userId;
		$_POST['sender_status']=1;
		 $query=$this->ApiModel->insertData('personal_chat',$_POST);
		$data=array('sender_id'=>$userId,'receiver_id'=>$_POST['tenant_id'],'redirect_url'=>'/tenant-contact','title'=>'Message','color'=>'blue','description'=>'Landlord Send New Msg');
		$token=$this->myfuncationlab->getNotificationToken($_POST['tenant_id']);
		$notification=$this->myfuncationlab->sendNotification($token,'Landlord Send New Message');
		$new_query=$this->ApiModel->insertData('notification',$data);
		echo json_encode($new_query);

	}

	public function get_edit_transaction_data()
	{
		$transactionId=file_get_contents("php://input");
		 $userId=$this->checklogin();
		$query['transaction']=$this->ApiModel->get_transaction($transactionId);
		$query['additonal']=$this->ApiModel->get_Treansaction_data('additional_transaction','transaction_id',$transactionId);
		$query['deduction']=$this->ApiModel->get_Treansaction_data('deduction_transaction','transaction_id',$transactionId);
		$query['Income']=$this->ApiModel->get_income_type($userId);
		$query['Expence']=$this->ApiModel->get_Expence_type($userId);
		$query['Vender'] = $this->ApiModel->get_vanders($userId);
		$query['property'] = $this->ApiModel->get_properties($userId);
	    $query['unit_data']=$this->ApiModel->get_unit_data($query['transaction'][0]['property_id']);
	    $query['tenant_details']=$this->ApiModel->get_unit_tenant_data($query['transaction'][0]['unit_id']);
		// echo json_encode($data);

		 echo json_encode($query);
		// echo json_encode($query);
	}

	public function save_edit_transaction()
	{

		 $data=(array)json_decode(file_get_contents("php://input"));
		 $transaction_id=$_POST['id'];
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
		 
		  $query=$this->ApiModel->update_data($transaction_id,'id','transaction',$_POST);
		  // echo json_encode($query);
		  // die();
		  $this->ApiModel->delete_data('additional_transaction','transaction_id',$transaction_id);
		  $this->ApiModel->delete_data('deduction_transaction','transaction_id',$transaction_id);

		  $additonal=array();
		  $deduction=array();
	 	 for($i=0;$i < count($addData);$i++)
		  {
		  	// if($addData[$i]->add_text != '' && $addData[$i]->add_digit !='')

		  	if($addData[$i]->add_digit !='')
		  	{
		  	$additonal[]=array('transaction_id'=>$transaction_id,'add_text'=>$addData[$i]->add_text,'add_type'=>$addData[$i]->add_type,'add_digit'=>$addData[$i]->add_digit);
		     }
		  }
		   for($i=0;$i < count($removeData);$i++)
		  {
		  	// if($removeData[$i]->remove_text !='' && $removeData[$i]->remove_digit !='' )

		  	if( $removeData[$i]->remove_digit !='' )
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
	
    public function getUpcomingPayment()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->in_progress_payment($userId);
		echo json_encode($query);
	}

	public function getCompletedPayment()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->get_transaction_data($userId);
		echo json_encode($query);
	}

	public function get_notice()
	{
		$userId=$this->checklogin();
		 $query=$this->ApiModel->get_notice($userId);
		echo json_encode($query);
	}

	public function get_notice_land()
	{
		$userId=$this->checklogin();
		$query['notice']=$this->ApiModel->get_notice_land($userId);
		$query['propertylist']=$this->ApiModel->getDateFormProperties($userId);
		echo json_encode($query);
	}
	public function add_new_notice()
	{
			$userId=$this->checklogin();
			$info=$_POST;
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
			 $query=$this->ApiModel->insert_data('notice',$data);
			 $token=$this->ApiModel->getAllToken($userId);

			// $token=$this->myfuncationlab->getNotificationALLToken($_POST['tenant_id']);
			 foreach($token as $alltoken)
			 {
			 	$data=array('sender_id'=>$userId,'receiver_id'=>$alltoken['id'],'redirect_url'=>'/tenant-notice','title'=>'Notice','color'=>'voilet','description'=>'Landlord Send New Msg');
			 	$token_data[0]['token']=$alltoken['token'];
			 	$token_data[0]['app_token']=$alltoken['app_token'];
		       $notification=$this->myfuncationlab->sendNotification($token_data,'Landlord Send New Notice');
		       $new_query=$this->ApiModel->insertData('notification',$data);
			 }

			$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'landlord','actions'=>'Landlord Added New Notice','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		   
			echo json_encode($query);
	}

	public function get_chat_data()
	{
		$userId=$this->checklogin();
		$query['group']=$this->ApiModel->getChatDataGroup($userId);
		$query['personal']=$this->ApiModel->getChatDataPersonal($userId);
		echo json_encode($query);
	}

	public function getChatDataPersonalLandlord()
	{
		$userId=$this->checklogin();
		// $query['group']=$this->ApiModel->getChatDataGroup($userId);
		$query['user_id']=$userId;
		$query['personal']=$this->ApiModel->getChatDataPersonal($userId);
		echo json_encode($query);
	}
	public function getChatDataGroupLandlord()
	{
		$userId=$this->checklogin();
		 $query['user_id']=$userId;
		 $query['group']=$this->ApiModel->getChatDataGroup($userId);
		// $query['personal']=$this->ApiModel->getChatDataPersonal($userId);
		echo json_encode($query);
	}
	public function getChatUserTenant()
	{
		$userId=$this->checklogin();
		 $query['group']=$this->ApiModel->getChatDataGroupTenant($userId);
		$query['personal']=$this->ApiModel->getChatDataPersonalTenant($userId);
		echo json_encode($query);
	}

	public function getChatUserGroupTenant()
	{
		$userId=$this->checklogin();
		 $query['user_id']=$userId;
		 $query['group']=$this->ApiModel->getChatDataGroupTenant($userId);
		// $query['personal']=$this->ApiModel->getChatDataPersonalTenant($userId);
		echo json_encode($query);
	}
	
	public function getChatUserPersonalTenant()
	{
		$userId=$this->checklogin();
		 $query['user_id']=$userId;
		 // $query['group']=$this->ApiModel->getChatDataGroupTenant($userId);
		$query['personal']=$this->ApiModel->getChatDataPersonalTenant($userId);
		echo json_encode($query);
	}

	public function get_transaction_type_tenant()
	{
		$land_id=file_get_contents("php://input");
		$query=$this->ApiModel->get_income_type($land_id);
		echo json_encode($query);

	}

	// function for Delete Property
	function delete_property()
	{
		$data=(array)json_decode(file_get_contents("php://input"));
		$userId=$this->checklogin();
		$propertyId=$data['PropertyId'];
		$query=$this->ApiModel->deleteData('properties',array('id'=>$propertyId));
		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Delete Property','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		echo json_encode($query);
	}

	//function for Unpdate Unit Deatils

	public function save_edit_unitDetails()
	{
		$data=(array)json_decode(file_get_contents("php://input"));
		$editData = $data['data'];
		$userId=$this->checklogin();
		$unitId = $data['id'];
		$query = $this->ApiModel->updateTableData($editData,array('id'=>$unitId),'units');
		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Update','role'=>'landlord','actions'=>'Landlord Update Unit Details','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		echo json_encode($query);

	}

	// function for Delete Unit

	public function delete_unit()
	{
		$data=(array)json_decode(file_get_contents("php://input"));
		$unitId=$data['unitId'];
		$userId=$this->checklogin();
		$query=$this->ApiModel->deleteData('units',array('id'=>$unitId));
		$logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Delete','role'=>'landlord','actions'=>'Landlord Delete Unit','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
		echo json_encode($query);
	} 


	public function save_add_transaction()
	{
		$userId=$this->checklogin();
		$data=$_POST;
		$data['tenant_id']=$userId;
		$query=$this->ApiModel->insertData('transaction',$data);
		echo json_encode($query);
	}

	public function get_dashboard_data()
	{
		$userId=$this->checklogin();
		$query['unitDetails'] = $this->ApiModel->getUnitDetails($userId);
		$query['paymentList'] = $this->ApiModel->getPaymentDetails($userId);
		$query['latePayment'] = $this->ApiModel->getLatePayment($userId);
		echo json_encode($query);
	}

	// function for get audit log Data
	public function get_log_data()
	{
		$userId=$this->checklogin();
		$query=$this->ApiModel->get_log_data();
		echo json_encode($query);
	}

	// function for get search log data
	public function get_search_logData()
	{
		$userId=$this->checklogin();
		$data=(array)json_decode(file_get_contents("php://input"));
		$query=$this->ApiModel->get_search_logData($data);
		echo json_encode($query);

	}
	public function accessToken()
	{
		$url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		//Use the customer base 64 string
		$credentials = base64_encode('HNbpcbWcsDOlWToZ4rMj4nr1RV9lyZn1:UyvSP34ydJcNqGaK');
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Basic '.$credentials)); 
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		$curl_response = curl_exec($curl);
	    $json_data=json_decode($curl_response);
	    return $json_data->access_token;
	}
	
	public function confirmation()
	{
		$data= (array)json_decode(file_get_contents('php://input'));
		$userId=$this->checklogin();
        $data= array('transactionId'=>$data['TransID'],'transactionAmount'=>$data['TransAmount'],'businessShortCode'=>$data['BusinessShortCode'],'transactionTableId'=>$data['BillRefNumber'],'MSISDN'=>$data['MSISDN'],'userName'=>$data['FirstName'].' '.$data['MiddleName'].' '.$data['LastName']);
        $query=$this->ApiModel->insertData('mpesa_payment',$data);
        $logData=array('audit_date'=>Date('Y-m-d'),'audit_statement'=>'Insert','role'=>'Tenant','actions'=>'Tenant Added New Transaction In Mpesa','userID'=>$userId,'progress_id'=> $userId);
		        $this->ApiModel->insert_Data('audit_log',$logData);
        echo json_encode($query);
	}

	public function checkurl()
	{
		$access_token=$this->accessToken();
		$url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl';
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '.$access_token)); //setting custom header
		$curl_post_data = array(
		  //Fill in the request parameters with valid values
		  'ShortCode' => '600000',
		  'ResponseType' => 'Confirmed',
		  'ConfirmationURL' => 'https://www.volatron.com/property_mgmt/api/confirmation',
		  'ValidationURL' => 'https://www.volatron.com/property_mgmt/api/validation'
		);
		$data_string = json_encode($curl_post_data);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS,$data_string);
		$curl_response = curl_exec($curl);
		return $curl_response;
	
	}

    public function check_confirmation()
	{
		$id=file_get_contents('php://input');
		$query=$this->ApiModel->check_confirmation($id);
		echo json_encode($query);

	}


	/*public function resgiserUrl()
	{
		$access_token=$this->accessToken();
		$url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl';
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '.$access_token)); //setting custom header


	$curl_post_data = array(
	  //Fill in the request parameters with valid values
	  'ShortCode' => '600358',
	  'ResponseType' => 'Confirmed',
	  'ConfirmationURL' => 'http://192.168.100.25/Property_testing/Confirmation',
	  'ValidationURL' => 'http://192.168.100.25/Property_testing/api/validation'
	);

	$data_string = json_encode($curl_post_data);

	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
	$curl_response = curl_exec($curl);
	print_r($curl_response);

	echo $curl_response;
	}*/
 //    public function confirmation()
	// {
		
 //        $data= file_get_contents('php://input');
 //        // echo $data;
 //        $handle= fopen('confirmationss.txt', "w");
 //        fwrite($handle,$data);
 //        fclose($handle);
	// }

	public function validation()
	{
	   	header("Content-type: application/json");
	    $response ='{
			"ResultCode":0,
			"ResultDesc":"Confiramation Recived Successfully"
		}';
	    $data= file_get_contents('php://input');
        $handle= fopen('validation.txt',"w");
        fwrite($handle,$data);
        fclose($handle);
// 	
// 		
// 		$mpesaResponse = file_get_contents('php://input');
// 		$logFile ="validation.txt";
// 		$jsonMpesaResponse = json_decode($mpesaResponse,true);
// 		$log= fopen($logFile,"w");
// 		fwrite($log,$jsonMpesaResponse);
// 		fclose($log);
// 		 echo $response;
	}

	public function C2B()
	{
	   //unlink('validation.txt');
// 	  $userId=$this->checklogin();
      $data= (array)json_decode(file_get_contents('php://input'));
	  $this->checkurl();
      $access_token=$this->accessToken();
      $url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate';
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '.$access_token)); //setting custom header
      $curl_post_data = array(
              //Fill in the request parameters with valid values
             'ShortCode' => '600000',
             'CommandID' => 'CustomerPayBillOnline',
             'Amount' => '1',
             'Msisdn' => (string)$data['mobile'],
             'BillRefNumber' => (string)$data['id']
      );
      
      $data_string = json_encode($curl_post_data);
    
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_POST, true);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
    
      $curl_response = curl_exec($curl);
     $response=json_decode($curl_response);
     echo json_encode($response);
//   if(@$response->errorCode)
//   {
//       echo json_encode($response);
      
//   }else{
//     //echo json_encode(filesize('validation.txt'));
//     //   sleep(8);
//     //   if( filesize('validation.txt')!= 0){
//     //     $myfile = fopen("validation.txt", "r") or die("Unable to open file!");
//     //     $data= fread($myfile,filesize("validation.txt"));
//     //      fclose($myfile);
//          echo json_encode($response);
//     // }else{
//     //      echo json_encode('Transaction Unsuccessfully');
//     // }
    
//     // echo json_encode($response);
//     // if($data !='')
//     // {
//     // // $handle = fopen("validation.txt", "w+");
//     // // fwrite($handle , '');
//     //     echo json_encode($data);
//     // }
      
//   }
	  
	  // return $curl_response;
}

	public function B2C()
	{
		 $url = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest';
		 $InitiatorName = 'TestInit610';
		 $SecurityCredential = 'X0VY5XBLt7xuWGrp0QmFKt/d1Quh109hIxTTQU5HfaQwy6kKoa5tg4iwaq9EJZ2v/Yblq9JRyrOM6DszO+U5ZiEgr5V5OF7WjioLgyInJ/hxOkPz4H6LcROuPgxC7tiEdvCzKxcZUpyyvTA/LHIv6q9+NX5ixyczxPYtL8uA0pUpWUUODIodc7/YnYftWMMEz59+ErjEVJS+X16I2U9QCmfiOJknJCOy1eiWg62oITwQccA2OdcP/uVoNIHmYXjmTihuNc5FXxyyv1/HK4FLHRBvS77iD43sfbKuXUr2pYZz43IhmFYciZLvqM+LaKVXhw9MU4hwl9NgoJNuvq8vFw==';
		  $CommandID = 'SalaryPayment';
		  $Amount = '25000';
		  $PartyA = '600358';
		  $PartyB = '254708374149';
		  $Remarks = 'Salary';
		  $QueueTimeOutURL = 'https://www.idinstate.org/Property/api/validation';
		  $ResultURL = 'https://www.idinstate.org/Property/api/validation';
		  $Occasion = 'salary November 2019';
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '.$this->accessToken())); //setting custom header
		$curl_post_data = array(
		  //Fill in the request parameters with valid values
		  'InitiatorName' => $InitiatorName,
		  'SecurityCredential' => $SecurityCredential,
		  'CommandID' => $CommandID,
		  'Amount' => $Amount,
		  'PartyA' => $PartyA,
		  'PartyB' => $PartyB,
		  'Remarks' => $Remarks,
		  'QueueTimeOutURL' => $QueueTimeOutURL,
		  'ResultURL' =>  $ResultURL,
		  'Occasion' => $Occasion
		);
		// "InitiatorName": "TestInit610",
  // "SecurityCredential": "p/EseFqZ0ChfcNTwkQ2PFNg6DtvMQzFHitRhrnOTNKaca9zggoZk0aa1DmgraLUA0/cZJ5f9pdg9oRM9UEMk/Ixud8sU17pNO4z8/43c9XrG2kSHO9fWkPVSXmSLRswOsWDRdCb5Q9oEOB41SjIGlqMzUQ6tz34mO4ll6SJMU6Fwp/z15x8soHZRGyeYxrYDweKFIQMGnNWTMs4PkmQojsb3oNQMwL6tfQpc89bOpeSW5H4j4/aHRaQGl5nEIUngq5aiUhAPVTwGge9cWf5r5THMR/8lNBAidN3hNtTurvwYcydp0Xj0uxMv3Qg642aCoALkYvxd2fb36PVw==",
  // "CommandID": "[CommandID]",
  // "Amount": "1000",
  // "PartyA": "600610",
  // "PartyB": "254708374149",
  // "Remarks": "",
  // "QueueTimeOutURL": "https://ip:port/" ,
  // "ResultURL": "https://ip:port/",
  // "Occassion":  ""

		$data_string = json_encode($curl_post_data);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);

		$curl_response = curl_exec($curl);
		print_r($curl_response);
		echo $curl_response;
	}

	//card Payment Api Start
	public function get_cardPayment_token()
	{
		
	 $url = 'https://api-test.equitybankgroup.com/v1/token/';
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/x-www-form-urlencoded','Authorization :Basic OXdqTmJnTHpTQ3V2Y2NBOE8zODREZ0dWMEY0c2ZuTU06WEdPRm5ya1JTMjJnTklwSA==')); //setting custom header
      $curl_post_data = 'merchantCode=6798035393&password=b5GsE4rrccEZr3s5tOE93YVExEKLD8Dh&grant_type=password';
      
      $data_string = serialize($curl_post_data);
    
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_POST, true);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
    
      $curl_response = curl_exec($curl);
      $response=(array)json_decode($curl_response);
      return $response['payment-token'];
	}

	function generate_new_bill()
	{
	  $url = 'https://uat.jengahq.io/payment/v2/bills';
	  $access_token = $this->get_cardPayment_token();
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization :Bearer '.$access_token)); //setting custom header
      $curl_post_data = array('customer'=>array('name'=>"John Doe",'customerid'=>'0000000000'),'order'=>array('billerCode'=>"900900",'reference'=>'C3453545ED0','amount'=> "1000",'currency'=>"KES",'expiry'=>"2020-01-17T00:00:00",'description'=>"Test order",'channel'=>"CARD"));
     // $curl_post_data = array('customer'=>array('name'=>"John Doe"));
      $data_string = json_encode($curl_post_data);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_POST, true);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
    
      echo curl_exec($curl);
      //echo $access_token;
	}

}