/*
AR Compass Mobile Gyro Sensor.
Jujin Kim
jk012345@gmail.com
www.ciiwolstudio.com
*/

var gHead = 0; //alpha 방향, 폰의 상단부 각도
var gPitch = 0; //beta 방향, 폰의 전면부 각도
var gRoll = 0;  //gamma방향, 폰의 측면부 각도


if (window.DeviceMotionEvent==undefined) {
		console.log("not support device");
	} else {
		window.ondeviceorientation = function(event) {
		  gHead = event.alpha;
		  gPitch = event.beta;	// front to back
		  gRoll = event.gamma;	// side to side
		  
		}
		
	}