const gpio = require('onoff').Gpio;

var sem1Rojo = new gpio(2, 'out');
var sem1Amarillo = new gpio(3, 'out');
var sem1Verde = new gpio(4, 'out');


var sem2Rojo = new gpio(5, 'out');
var sem2Amarillo = new gpio(6, 'out');
var sem2Verde = new gpio(13, 'out');


function delay(millis)
{
    var date = Date.now();
    var curDate = null;
    do
    {
        curDate = Date.now();
    } while (curDate - date < millis);
}

function prender1()
{
    sem1Rojo.writeSync(0);
    sem1Amarillo.writeSync(0);
    sem1Verde.writeSync(1);

    sem2Rojo.writeSync(1);
    sem2Amarillo.writeSync(0);
    sem2Verde.writeSync(0);
}

function prender2()
{
    sem1Rojo.writeSync(1);
    sem1Amarillo.writeSync(0);
    sem1Verde.writeSync(0);

    sem2Rojo.writeSync(0);
    sem2Amarillo.writeSync(0);
    sem2Verde.writeSync(1);
}

function titilarVerde1(t = 500)
{
    for (var i = 0; i < 5; i++)
    {
	sem1Verde.writeSync(0);
	delay(t);
	sem1Verde.writeSync(1);
	delay(t);
    }
}

function titilarVerde2(t = 500)
{
    for (var i = 0; i < 5; i++)
    {
	sem2Verde.writeSync(0);
	delay(t);
	sem2Verde.writeSync(1);
	delay(t);
    }
}

function cambiarSemaforo(num)
{
    if (num == 1)
    {
	titilarVerde1();
	sem1Verde.writeSync(0);

	sem1Amarillo.writeSync(1);
	delay(2000);
	sem1Amarillo.writeSync(0);

	sem1Rojo.writeSync(1);
	delay(1000);
	
	sem2Rojo.writeSync(0);
	sem2Verde.writeSync(1);
    }
    else
    {
	titilarVerde2();
	sem2Verde.writeSync(0);

	sem2Amarillo.writeSync(1);
	delay(2000);
	sem2Amarillo.writeSync(0);

	sem2Rojo.writeSync(1);
	delay(1000);

	sem1Rojo.writeSync(0);
	sem1Verde.writeSync(1);
    }
}

function funcionamiento(dur1, dur2, semInicial)
{

    if (semInicial == 1)
    {
	prender1();
	
	while (true)
	{
	    delay(dur1);
	    cambiarSemaforo(1);
	    delay(dur2)
	    cambiarSemaforo(2);
	    delay(dur1);
	}
    }
    else
    {
	prender2();
	
	while (true)
	{
	    delay(dur2);
	    cambiarSemaforo(2);
	    delay(dur1)
	    cambiarSemaforo(1);
	    delay(dur2);
	}
    }
	    
}

funcionamiento(process.argv[2]*1000, process.argv[3]*1000, process.argv[4]);
