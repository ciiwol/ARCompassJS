/*
AR Compass Main.
Jujin Kim
jk012345@gmail.com
www.ciiwolstudio.com
*/
var scene;
var camera;
var renderer, render;
var compass;
var cpBody, cpNorthHand, cpBigHands, cpMidHands, cpSmallHands;

document.addEventListener("DOMContentLoaded", function(event) {
    /* Get Video(Camera) stream */
    var video = document.getElementById("video");
    var videoObj = {"video":true};
    var errBack = function(error) { console.log("Video Error : ", error.code);};
    /* Put video listener */
    if(navigator.getUserMedia) {
        navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}

    /* Create scene */
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({alpha:true});   //make renderer.alpha to true for transparent background
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement )

    /* Create Compass */
    compass = new THREE.Group();
    cpBody, cpNorthHand, cpBigHands, cpMidHands, cpSmallHands;
    createCompass();
    compass.position.y -= 3;
    compass.rotation.x = 90;

    scene.add(compass);
    //camera.position.z = 15;

    /* Update */
    render = function() {
        requestAnimationFrame(render);

        /* Update Direction */

        /* Rotate Scene Camera or Compass */
        // compass.rotation.x = deg2rad(-gPitch);
        // compass.rotation.y = deg2rad(-gRoll);
        // compass.rotation.z = deg2rad(-90-gHead);
        camera.rotation.x = deg2rad(gPitch);
        camera.rotation.y = deg2rad(gRoll);
        camera.rotation.z = deg2rad(gHead);

        renderer.render(scene, camera);
    };

    render();
}, false);

/* Create Compass */
function createCompass()
{
    //clear compass
    for(var i = compass.children.length - 1; i>=0; i--)
        compass.remove(compass.children[i]);

    //body
    var cpGeometry = new THREE.TorusGeometry(cpBodyRadius, 0.1, 16, 100);
    var cpMaterial = new THREE.MeshBasicMaterial({color : cpBodyColor});
    cpBody = new THREE.Mesh(cpGeometry, cpMaterial);
    compass.add(cpBody);

    //north hand
    var nhGeometry = new THREE.ConeGeometry(cpNorthHandSize,3,8);
    var nhMaterial = new THREE.MeshBasicMaterial({color : cpNorthHandColor});
    cpNorthHand = new THREE.Mesh(nhGeometry, nhMaterial);
    cpNorthHand.position.x = cpBodyRadius+0.5;
    cpNorthHand.rotateZ(Math.PI*1.5);
    compass.add(cpNorthHand);

    //big hands
    cpBigHands = new Array(3);
    for(var i=0; i<3; i++)
    {
        var bhGeometry = new THREE.ConeGeometry(cpBigHandSize, 2, 8);
        var bhMaterial = new THREE.MeshBasicMaterial({color : cpBigHandColor});
        cpBigHands[i] = new THREE.Mesh(bhGeometry, bhMaterial);
        var p = calcPos((i+1) * 90);
        cpBigHands[i].position.x = p.x;
        cpBigHands[i].position.y = p.y;
        cpBigHands[i].position.z = p.z;
        cpBigHands[i].rotateZ(deg2rad(i*90));
        compass.add(cpBigHands[i]);
    }

    //mid hands
    cpMidHands = new Array(3);
    for(var i=0; i<4; i++)
    {
        var mhGeometry = new THREE.ConeGeometry(cpMidHandSize, 2, 8);
        var mhMaterial = new THREE.MeshBasicMaterial({color : cpMidHandColor});
        cpMidHands[i] = new THREE.Mesh(mhGeometry, mhMaterial);
        var p = calcPos((i+1) * 90-45);
        cpMidHands[i].position.x = p.x;
        cpMidHands[i].position.y = p.y;
        cpMidHands[i].position.z = p.z;
        cpMidHands[i].rotateZ(deg2rad(i*90-45));
        compass.add(cpMidHands[i]);
    }

    //small hands
    cpSmallHands = new Array(cpCountHandsOctant * 8);
    for(var seg=0; seg<8; seg++)
    {
        for(var i=0; i<cpCountHandsOctant; i++)
        {
            var shGeometry = new THREE.ConeGeometry(cpSmallHandSize, 1, 8);
            var shMaterial = new THREE.MeshBasicMaterial({color : cpSmallHandColor});
            cpSmallHands[i] = new THREE.Mesh(shGeometry, shMaterial); 
            var sDeg = seg * 45;
            var splitDeg = 45 / (cpCountHandsOctant+1);
            var p = calcPos(sDeg + splitDeg*(i+1));
            cpSmallHands[i].position.x = p.x;
            cpSmallHands[i].position.y = p.y;
            cpSmallHands[i].position.z = p.z;
            cpSmallHands[i].rotateZ(deg2rad(-90+sDeg + splitDeg * (i+1)));
            compass.add(cpSmallHands[i]);
        }
    }
}

/* calculate position of x, y refer degree */
function calcPos(degree)
{
    var position = new THREE.Vector3();
    var rad = deg2rad(degree);
    position.x = Math.cos(rad) * (cpBodyRadius+0.5);
    position.y = Math.sin(rad) * (cpBodyRadius+0.5);
    position.z = 0;
    return position;
}

/* Degree - Radian convertion method */
function rad2deg(radian) { return radian*180/Math.PI;}
function deg2rad(degree) { return degree*Math.PI/180;}