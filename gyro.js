/*
AR Compass Mobile Gyro Sensor.
Jujin Kim
jk012345@gmail.com
www.ciiwolstudio.com
*/

var gHead = 0; //alpha 방향, 폰의 상단부 각도
var gPitch = 0; //beta 방향, 폰의 전면부 각도
var gRoll = 0;  //gamma방향, 폰의 측면부 각도

// var axwg = 0;    //x방향 가속도
// var aywg = 0;    //y방향 가속도
// var azwg = 0;    //z방향 가속도

// var ax = 0; //가속도인데 중력미포함
// var ay = 0;
// var az = 0;

// var aHead = 0; //alpha축 각속도
// var aPitch = 0;    //beta축 각속도
// var aRoll = 0;     //gamma축 각속도

if (window.DeviceMotionEvent==undefined) {
		console.log("not support device");
	} else {
		window.ondeviceorientation = function(event) {
		  gHead = event.alpha;
		  gPitch = event.beta;	// front to back
		  gRoll = event.gamma;	// side to side
		  
		}
		
		// window.ondevicemotion = function(event) {

		//   axwg = event.accelerationIncludingGravity.x;
		//   aywg = event.accelerationIncludingGravity.y;
		//   azwg = event.accelerationIncludingGravity.z;
          
        //   ax = event.acceleration.x;
        //   ay = event.acceleration.y;
        //   az = event.acceleration.z;
		  
		//   rotation = event.rotationRate;
		//   if (rotation != null) {
		//     arAlpha = rotation.alpha;	// x축 회전값. 화면 방향 양수, 250
		//     arBeta = rotation.beta;		// y축 화전값. 시계 방향 양수, 400
		//     arGamma = rotation.gamma;
			
		
		//   }
		// }
	}