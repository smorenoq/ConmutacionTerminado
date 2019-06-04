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


sem1Rojo.writeSync(0);
sem1Amarillo.writeSync(0);
sem1Verde.writeSync(0);

sem2Rojo.writeSync(0);
sem2Amarillo.writeSync(0);
sem2Verde.writeSync(0);

p1Rojo.writeSync(0);
p1Verde.writeSync(0);

p2Rojo.writeSync(0);
p2Verde.writeSync(0);
