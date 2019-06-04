const gpio = require('onoff').Gpio;

var sem1Rojo = new gpio(2, 'out');
var sem1Amarillo = new gpio(3, 'out');
var sem1Verde = new gpio(18, 'out');


var sem2Rojo = new gpio(5, 'out');
var sem2Amarillo = new gpio(6, 'out');
var sem2Verde = new gpio(13, 'out');

var p1Rojo = new gpio(17, 'out');
var p1Verde = new gpio(27, 'out');

var p2Rojo = new gpio(23, 'out');
var p2Verde = new gpio(24, 'out');

function delay(millis)
{
    var date = Date.now();
    var curDate = null;
    do
    {
        curDate = Date.now();
    } while (curDate - date < millis);
}

function titilarAmarillo(t = 500)
{
    while (true)
    {
	sem1Amarillo.writeSync(1);
	sem2Amarillo.writeSync(1);
	delay(t);
	sem1Amarillo.writeSync(0);
	sem2Amarillo.writeSync(0);
	delay(t);
    }
}

p1Rojo.writeSync(1);
p1Verde.writeSync(0);

p2Rojo.writeSync(1);
p2Verde.writeSync(0);

titilarAmarillo();
