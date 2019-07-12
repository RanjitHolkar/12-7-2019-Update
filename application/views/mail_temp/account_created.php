<?php
$msg="";
echo $msg="<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
   <meta name='viewport' content='width=device-width, initial-scale=1.0'> 
</head>
<body>

    <div style='font-family: arial,helvetica,sans-serif;'>
	<div class='container' style='max-width:750px; margin:0 auto; padding-left: 20px; padding-right: 20px; background: #fff; padding-top: 20px;padding-bottom: 20px;'>
	
		<div class='first-sect'style='border: 1px solid #ddd; padding-left: 15px; padding-right: 15px; padding-bottom: 20px; border-style: double; border-width: 6px; padding-top: 80px;'>
		<div style='text-align:center; margin-bottom: 10px; margin-top: 10px;'>
			<img src='".base_url()."img/logo.png'>
		</div>	
			<div class=''>
				
				<h1 style='text-align: center; color: #1F2147;font-family: arial,helvetica,sans-serif; font-size: 30px;'>Property Management </h1>
				<h1 style='text-align: center; color: #1F2147;font-family: arial,helvetica,sans-serif; font-size: 30px;'></h1>
				 <div class='date-sect' style='width: 620px; margin: 0 auto;	margin-bottom: 20px; padding-bottom: 50px;'>
			    			
					
					<p style='color: #5D5959;font-size: 14px;'>Dear ".$info['userName'].",</p>

					<p style='padding-left:35px; padding-right: 20px;color: #5D5959;font-size: 14px;'>  .</p>
                   <p style='color: #5D5959;font-size: 14px;'><b style='color:green'> Welcome to Property Management Your account created successfully </b></p>
					<p style='text-align: justify;color: #5D5959;font-size: 14px;'>Login with below credential   <p>
					<p style='text-align: justify;color: #5D5959;font-size: 14px;'>Email :- ". $info['email'] ."   <p>
					<p style='text-align: justify;color: #5D5959;font-size: 14px;'>Password :- ".$info['password'] ."   <p>

					<p style='text-align: justify;color: #5D5959;font-size: 14px;'> <a href=".$info['url'].">Click To Activate Account </a>  <p>
                  
					<p style='color: #5D5959;font-size: 14px;'>Thank you,</p>
			
					
                   
			    </div>
			</div>
		
		</div>
		
	</div>

</div>
</body>
</html>";
?>