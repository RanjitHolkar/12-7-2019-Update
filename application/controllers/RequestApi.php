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
    header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");         
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  exit(0);
}		
class RequestApi extends CI_Controller {
  function __construct() {
   parent::__construct();
   $this->load->library(array('JwtAuth','form_validation','MyFuncationLab'));
   $this->load->model('RequestApiModel');
   $this->load->helper(array('form', 'url'));
//   $this->db->query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))");
 }

/*check Token*/

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

 /* --Get request data list-- */
 public function get_request_data(){
   try{
      $userId=$this->checklogin();
     $result=$this->RequestApiModel->get_request_dataModel($userId);
     // $con="'reciver_id',$userId";
     $updateData=$this->RequestApiModel->UpdateData('notification','receiver_id',$userId,array('status'=>1));
     echo json_encode($result);
   } catch  (Exception $e) {
     log_message('error', $e->getMessage());
     echo 'ERROR : ',  'Something went wrong !!!!'.$e->getMessage(), "\n";
   } 	
 }


 /* --Update status according to the user input-- start*/
 public function accept_decline_request_status(){
  
  
 $info =(array) json_decode(file_get_contents("php://input"),TRUE);
   $id=$info['id'];
   $status=$info['status'];
   $tenant_id=$info['tenant_id'];
   $land_id=$this->checklogin();

    
   $checkId = $this->RequestApiModel->checkUserLikedOrNot($tenant_id);
   if(count($checkId)==0)
   {
    $chatkit=$this->chatKit_token();
    $room_id=$this->RequestApiModel->get_room_id($tenant_id);
    $data= $chatkit->addUsersToRoom([
      'user_ids' => ["$land_id"],
      'room_id' => $room_id->room_id
    ]);
    $result=$this->RequestApiModel->accept_decline_request_statusModel($id,$status,$land_id,$tenant_id);
   // // $data=array('sender_id'=>$land_id,'receiver_id'=>$tenant_id,'redirect_url'=>'service_request');
   echo json_encode($data);  
 }else{
  echo json_encode(array('res'=>0,'msg'=>'Tenant Added Alrady In Other system'));

 }
   
  
}


 /* --Get filters applied request data list-- */
public function searchRequestData(){
  $userId=$this->checklogin();
  // echo json_encode($userId);
 
   $info =(array) json_decode(file_get_contents("php://input"),TRUE);
   //  $tenant_id=$info['tenant_id'];
   // $land_id=$this->checklogin();
   $result=$this->RequestApiModel->searchRequestDataModel($userId,$info['searchData'],$info['optionSelect']);
   // $data=array('sender_id'=>$land_id,'receiver_id'=>$tenant_id,'redirect_url'=>'service_request');
   echo json_encode($result);

  
}


/* --Update the status code to 3 for delete-- */
public function deleteRequestStatusConfiramtion(){
  try{
   $info =(array) json_decode(file_get_contents("php://input"),TRUE);
   $result=$this->RequestApiModel->deleteRequestStatusConfiramtionModel($info['id'],
    $info['status']);
   echo json_encode($result);
  }catch(Exception $e) {
  log_message('error', $e->getMessage());
  echo 'ERROR : ',  'Something went wrong !!!!'.$e->getMessage(), "\n";
  }       
}
}
?>
