<?php session_start(); ?>
<!DOCTYPE html>

<html>
  <head>
      <!-- Título -->
      <h1>Control de Intersección de Semáforo</h1>
      <!-- CSS -->
      <style>
      h1 /*Para los h1*/
      {
        font:  bold Times; /*Negrilla, letra Times*/
      }
      button /*Para los botones*/
      {
        font: bold 16px Arial; /*Negrilla, tamaño 16, letra Arial*/
        background-color: rgb(0,70,124); /*Color de fondo*/
        color: rgb(255,255,255); /*Color del texto*/
        padding: 6px 18px 6px 18px; /*Margen entre el texto del botón y sus bordes*/
        margin-top: 6px; /*Margen superior por fuera de los bordes*/
        margin-right: 3px; /*Margen a la derecha por fuera de los bordes*/
        border-top: 1px solid #000; /*Color negro para el borde superior*/
        border-right: 1px solid #000; /*Color negro para el borde derecho*/
        border-bottom: 1px solid #000; /*Color negro para el borde inferior*/
        border-left: 1px solid #000; /*Color negro para el borde izquierdo*/
      }
      </style>
  </head>

  <img src = "semaforo.gif" align = "right" width = "400" height = "500">

  <?php
    set_time_limit(0);

    $dur1 = 5;
    $dur2 = 5;

    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['empezar']))
    {
        empezar();
    }

    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['peaton1']))
     {
        peaton1();
     }

    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['peaton2']))
    {
        peaton2();
    }

    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['noche']))
    {
        noche();
    }

    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['apagar']))
    {
        apagar();
    }

    //Variables Globales
    $verde1prendido = True;
    $verde2prendido = False;
    $interrumpir = False;

    //Funciones

    function empezar()
    {   
        global $dur1;
        global $dur2;

        shell_exec("killall node");
        shell_exec("node apagar");

        $comando = "node funcionamiento ";
        $comando .= $dur1;
        $comando .= " ";
        $comando .= $dur2;
        $comando .= " ";
        $comando .= "1";
        $comando .= " >/dev/null &";
        shell_exec($comando);
    }

    function apagar()
    {
        shell_exec("killall node");
        shell_exec("node apagar");
    }

    function noche()
    {
        shell_exec("killall node");
        shell_exec("node noche  >/dev/null &");
    }

    function peaton1()
    {
        global $dur1;
        global $dur2;

        shell_exec("killall node");

        $comando = "node cambiarSemaforo 1 ";
        $comando .= $dur1;
        $comando .= " ";
        $comando .= $dur2;
        $comando .= " >/dev/null &";

        shell_exec($comando);
    }

    function peaton2()
    {
        global $dur1;
        global $dur2;

        shell_exec("killall node");

        $comando = "node cambiarSemaforo 2 ";
        $comando .= $dur1;
        $comando .= " ";
        $comando .= $dur2;
        $comando .= " >/dev/null &";
        shell_exec($comando);
    }		  
			   
   ?>
    <br><br>

    <form action = "<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <input type="submit" value = "Empezar" name = "empezar">
    </form>

    <br><br>
			       

    <form action = "<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <input type="submit" value = "Peatón 1" name = "peaton1">
    </form>

    <br><br>


    <form action = "<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <input type="submit" value = "Peatón 2" name = "peaton2">
    </form>

    <br><br>


    <form action = "<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <input type="submit" value = "Noche" name = "noche">
    </form>

    <br><br>


    <form action = "<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <input type="submit" value = "Apagar" name = "apagar">
    </form>
   
  
  <body>

      <p id="dur_sem1"></p>
      <p id="dur_sem2"></p>

      <p></p>

      <!-- Botón de cambiar semáforo-->
      <!-- <button type="button" onclick="cambiarSemaforo()">Cambiar Semaforo</button> -->

      <!-- Javascript -->
      <script>
	//Función para cambiar el semáforo
	function cambiarSemaforo()
	{
	    var exec = require('child_process').exec;
	    exec('node noche', function(err, stdout, stderr){
	        console.log(stdout);
            });
	}
	

      </script>
  </body>
</html>
