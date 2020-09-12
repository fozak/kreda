<?php
<<<<<<< HEAD
    if($_POST[]){
        echo "Post Data Found"; die();
    }
=======
    if(isset['$_POST']){
        if(isset($_POST['submit']) && $_POST['submit'] = 'submit'){

        }else{
            $message = "Form not Submitted";
        }
    }else{
        $message = "Post Data not found";
    }
?>


<?php 
echo $_SERVER['PHP_SELF'];
echo "<br>";
echo $_SERVER['SERVER_NAME'];
echo "<br>";
echo $_SERVER['HTTP_HOST'];
echo "<br>";
echo $_SERVER['HTTP_REFERER'];
echo "<br>";
echo $_SERVER['HTTP_USER_AGENT'];
echo "<br>";
echo $_SERVER['SCRIPT_NAME'];
>>>>>>> master
?>