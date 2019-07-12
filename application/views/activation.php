<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Style CSS-->
 <style>
 .ActivationPage{
  background:url(uploads/Icon/bgpicture.png) no-repeat;
  height: 100vh;
  justify-content: center;
    display: flex;
    align-items: center;
}
.login-module {
    background-color: #ffffff42;
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 45px 30px;

  
}

.login h1 {
    color: #ffffff;
    font-size: 18px;
    margin: 25px 0;
    font-weight: normal;
}
.login button {
    border: 2px solid #ffffff;
    background-color: #019ae8;
    border-radius: 20px;
    font-size: 16px;
    padding: 5px 13px;
    color: #ffffff;
    min-width: 200px;
    font-weight: 700;
}

</style>
    <title>Activation Page</title>

   
  </head>
  <body>
    <div class="ActivationPage">
      <div class="login-module">
        <div class="login text-center">
          <img src="uploads/Icon/verified.png" style="width: 64px; height: 64px;">
          <h1><?php echo $msg;?></h1>
          <?php 
          if($msg == 'Your account has been activated')
          {
            ?>
          <a href="<?php echo ANGULAR_URL; ?>"><button>Login To Continue</button></a>
          <?php
        }
        ?>
        </div>

      </div>

    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>