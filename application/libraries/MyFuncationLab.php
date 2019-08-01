<?php 

defined('BASEPATH') OR exit('No direct script access allowed');
class MyFuncationLab {
	
  private $CI;

        public function __construct()
        {
           $this->CI =& get_instance();
        }

    function randString(){
         $token = "";
         $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
         $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
         $codeAlphabet.= "0123456789";
         $max = strlen($codeAlphabet); // edited

        for ($i=0; $i < 20; $i++) {
            $token .= $codeAlphabet[random_int(0, $max-1)];
        }
        return $token;
      }  

  public  function  sendNotification($user_token,$message){
        //$cleaner_id=5;
        // $user_token=$this->PublishBookingModel->get_Token($cleaner_id); 

      $onesignal_token=$user_token[0]['token'];
      $app_token=$user_token[0]['app_token'];
     for($i=0;$i<2;$i++)
        {
            if($i==0)
            { 
                $content = array(
                "en" => $message,
                            );
           $fields = array(
            'app_id' => constant("app_id"),
            'include_player_ids' =>  array($app_token),
           'contents' => $content,
           'priority' => 'high',
            );
            $fields = json_encode($fields);
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8','Authorization: Basic '.constant("app_Authorization")));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, FALSE);
            curl_setopt($ch, CURLOPT_POST, TRUE);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            $response = curl_exec($ch);
            
            curl_close($ch);

             $response;

            }
         
            if($i==1)
            {
                $content = array(
                "en" => $message,
                            );
            $fields = array(
                'app_id' => constant("web_app_id"),
                'include_player_ids' =>  array($onesignal_token),
               'contents' => $content,
               'priority' => 'high',
                );
                $fields = json_encode($fields);
                
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8','Authorization: Basic '.constant("web_Authorization")));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                curl_setopt($ch, CURLOPT_HEADER, FALSE);
                curl_setopt($ch, CURLOPT_POST, TRUE);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                $response = curl_exec($ch);
                
                curl_close($ch);

                 $response;

            }
        
        }
     
        
        //$published=$this->PublishBookingModel->publishedBookings($publishDate);
        
    }  

     public function getNotificationToken($userId)
     {
            $this->CI->db->select('token,app_token');
            $this->CI->db->from('users');
            $this->CI->db->where('id',$userId);
            return $this->CI->db->get()->result_array();
     }


  }
 ?>