<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
<style>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.paymentPopDiv {
    max-width: 450px;
    margin: 40px auto;
}
.paymentPopDivInner {
    background-color: #fff;
    box-shadow: 0px 0px 10px #ddd;
    border-radius: 5px;
}
.headerDiv {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    text-align: center;
}
.popBody {
    padding: 20px;
}
.popBody h4 {
    font-size: 20px;
    color: #7e7e7e;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
}
.amt {
    display: flex;
    align-items: center;
    margin: 20px 0;
}
.popBody label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
    width: 220px;
    font-size: 15px;
}
.popBody input[type="text"] {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 0 20px;
}
.blueBtn {
    background-color: #2196F3;
    border: 1px solid #2196F3;
    margin: 20px 0;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
}
.logoHeaderPop {
    height:20px;
    width: auto;
    max-width: 100%;
}
.loaderDivMain{
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.colorGreen{
   
    display:none;
}

</style>
</head>
<body>
	<div class="paymentPopDiv">
		<form actions="sendPayementRequest">
		<div class="paymentPopDivInner">
			<div class="headerDiv">
				<img src="" class="logoHeaderPop">
			</div>
			<div class="popBody">
				<h4>Enter Your MPESA number to receive STK Push</h4>
				<div class="amt">
					<label>Amount:</label>
					<input type="text" placeholder="" id="amount" value="<?php echo $data['amount'];?>" readonly/>
                    <input type="hidden" value="<?php echo $data['userId'];?>" id="userId">
                    <input type="hidden" value="<?php echo $data['transaction_id'];?>" id="transaction_id"> 
				</div>
				<div class="amt">
					<label>MPESA Number:</label>
					<input type="text" placeholder="" id="mobile_number"/>
				</div>
					<h4 class="text-success colorGreen" id="success_span">Wait for conformation</h4>
				<div class="requestDiv">
					<button type="button" class="blueBtn" onclick="sendPaymentRequest()">Send payment request</button> 
				</div>
			</div>
		</div>
		</form>
	</div>
<div class="modal fade" id="loader" role="dialog">
    <div class="modal-dialog loaderDivMain">
    
      <!-- Modal content-->
    

      <div class="loader"></div>
      
    </div>
  </div>
<script>
function sendPaymentRequest()
{
     $('#success_span').hide();
    // var userId = $('#userId').val();
    $('#loader').modal('show');
    var transaction_id = $('#transaction_id').val();
    var mobile_number = $('#mobile_number').val();
    var amount = $('#amount').val();
    var data= {'mobile':mobile_number,'amount':amount,'id':transaction_id};
    var jsonData = JSON.stringify( data );
    $.ajax({
        url:'sendPaymentRequest',
        type:'POST',
        data:jsonData,
        success:function(res){
            console.log(res);
            if(res !=null)
            {
                
                if(res.length !=0)
                {
                    var res=JSON.parse(res);
                    if(res['errorMessage'])
                    {
                        $('#success_span').show();
                        $('#success_span').text(res['errorMessage']);
                        $('#success_span').css('color', 'red');
                         $('#loader').modal('hide');
                     // alert(res['errorMessage']);
                      
                    }else{
                        $('#success_span').text("Accept the service request successfully. Please Wait for confirmation");
                        $('#success_span').show();
                        $('#success_span').css('color', 'green ');
                        $('#loader').modal('hide');
                        $(".blueBtn").attr("disabled", true);
                      // alert('Waiting for Confirmation');
                        setTimeout(function(){ 
                            confirmation();
                             }, 5000);
        
                    }
                }else{
                    alert('Payment Failed');
                    
                }
            
            }else{
                alert('Payment Failed');
            }
            
        }
    })

}

function confirmation()
{
    var transaction_id = $('#transaction_id').val();
    $.ajax({
        url:'checkConfirmation',
        type:'POST',
        data:transaction_id,
        success:function(res){
            console.log('res',res);
            if(res !=null)
            {
                var res =JSON.parse(res);
                console.log(res);
                 if(res.length > 0)
                {
                    window.location.href = "<?php echo base_url().'api/successPayment';?>";
                }else{
                    window.location.href = "<?php echo base_url().'api/errorPayment';?>";
                }
            }else{
                   window.location.href = "<?php echo base_url().'api/errorPayment';?>";
            }
            
        }
    })
}

</script>
</body>
</html>