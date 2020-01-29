// A link to the Pinterest Board for Inspiration: https://pin.it/tt3xmedxw5pgqv
//
// By Miki Bin, Alex Krzyzosiak
// mikibx.com
//
// Based on Daniel Shiffman's 'CodingTrain Clown Nose'
//  - https://editor.p5js.org/codingtrain/sketches/Skd42hIy4
//  - Video: https://www.youtube.com/watch?v=EA3-k9mnLHs&list=PL01V3PUF-ZeccWhDAWwBjtWyZ8ZOzdZT6&index=11&t=762s
//Based on P5.js Example: 'Snowflake' by Aatish Bhatia
// - https://p5js.org/examples/simulate-snowflakes.html



let video;
let poseNet;

//nose
let noses =[];
let noseCounter =0;

let noseX = 0;
let noseY = 0;
//head

// let face;
let faces =[];
let faceCounter =0;

//mouth
let mouths =[];
let mouthCounter =0;

//left eye
let lEyes =[];
let lEyeCounter =0;
let eyelX = 0;
let eyelY = 0;

//right eye
let rEyes =[];
let rEyeCounter =0;

//the updated distance
let d =0;
let oldD = 0;
let change = false;

//music
let mySound;


//bool for background dispolay
let switchBg = false;


//save createCanvas
let c;
function preload() {

  //deco
  for(let i=1;i<6;i++){
    let plant = loadImage('assets/plant0'+i+'.png');
    let insect = loadImage('assets/insect0'+i+'.png');

    deco.push(plant);
    deco.push(insect);
  }

  //fontSize
  font = loadFont('assets/SigmarOne-Regular.ttf');

  //music
  mySound = loadSound('assets/Bay_Bay.mp3');



}



function setup() {
  // createCanvas(600, 600);
  c = createCanvas(900, 900);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);


  //creat object list
  //face
  for(let i=0; i<5; i++){
    let newFace = new Face("assets/face0"+(i+1)+".png");
    faces.push(newFace);
  }

  //nose
  for(let i=0; i<5; i++){
    let newNose = new Nose("assets/nose0"+(i+1)+".png");
    noses.push(newNose);
  }

  //mouth
  for(let i=0; i<5; i++){
    let newMouth = new Mouth("assets/mouth0"+(i+1)+".png");
    mouths.push(newMouth);
  }

  //left eye
  for(let i=0; i<5; i++){
    let newlEye = new LeftEye("assets/eye0"+(i+1)+".png");
    lEyes.push(newlEye);
  }

  //right eye
  for(let i=0; i<5; i++){
    let newrEye = new RightEye("assets/eye0"+(i+1)+".png");
    rEyes.push(newrEye);
  }


  //background
  dots = new Pokas();
  dots.initialize();



}


function calculateDistance(nosex,nosey,eyex,eyey){
 oldD = d;
  //nose
  let newNoseX = nosex;
  let newNoseY = nosey;
  //left eye
  let newElX = eyex;
  let newElY = eyey;

  //update position
  //nose
  noseX = lerp(noseX, newNoseX, 0.5);
  noseY = lerp(noseY, newNoseY, 0.5);

  //left eye
  eyelX = lerp(eyelX, newElX, 0.5);
  eyelY = lerp(eyelY, newElY, 0.5);


//calculate scale
  d = dist(noseX, noseY, eyelX, eyelY);
// print("dist diff: "+ abs(oldD - d));
 if(abs(oldD - d)>10){
   change = true;
 }else{
   change = false;
 }

}


function gotPoses(poses) {
  if (poses.length > 0) {
calculateDistance(poses[0].pose.keypoints[0].position.x,poses[0].pose.keypoints[0].position.y,poses[0].pose.keypoints[1].position.x,poses[0].pose.keypoints[1].position.y);

    //update Face
    faces[faceCounter].update(d,poses);
    //update Nose
    noses[noseCounter].update(d,poses);

    //update Mouth
    mouths[mouthCounter].update(d,poses);
    //update left Eye
    lEyes[lEyeCounter].update(d,poses);
    //update right Eye
    rEyes[rEyeCounter].update(d,poses);


  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  //change color mode to HSB
  colorMode(HSB);
  // background(100,100,255);

    background(101,38,100);

///background
push();
  dots.run();
pop();


if(switchBg){
createSnow();
}else{
  //art deco
  drawDeco();
}





  //update randomizer
// if((frameCount >60) && (frameCount % 30) == 0){
if((frameCount >60) && (change)){
  faceCounter = int(random(5));
  noseCounter = int(random(5));
  mouthCounter = int(random(5));
  lEyeCounter = int(random(5));
  rEyeCounter = int(random(5));
}


//scale
push();
rectMode(CENTER);
scale(2);
translate(-100,0);


//draw head
push();
//display Face
faces[faceCounter].display();
pop();

//draw nose
push();
//display Nose
noses[noseCounter].display();
pop();
//draw mouth
push();
//display Face
mouths[mouthCounter].display();
pop();

//draw leftEye
push();
lEyes[lEyeCounter].display();
pop();

//draw rightEye
push();
rEyes[rEyeCounter].display();
pop();



pop();



}

// face class
class Face {
  constructor(path) {
    this.img=  loadImage(path);
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
  }

  update(d,poses) {
    //resize
    this.width = d*12;
    this.height = d*12;

    let newX = poses[0].pose.keypoints[0].position.x-this.width/2;
    let newY = poses[0].pose.keypoints[0].position.y-this.height/2;

    //nose
    this.x = lerp(this.x, newX, 0.5);
    this.y = lerp(this.y, newY, 0.5);

  }

  display() {
   image(this.img, this.x, this.y, this.width, this.height);
  }
}

// face class
class Nose {
  constructor(path) {
    this.img=  loadImage(path);
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
  }

  update(d,poses) {
    //resize
    this.width = d*1.5;
    this.height = d*1.5;

    let newX = poses[0].pose.keypoints[0].position.x;
    let newY = poses[0].pose.keypoints[0].position.y;

    //nose
    this.x = lerp(this.x, newX, 0.5);
    this.y = lerp(this.y, newY, 0.5);

  }

  display() {
   image(this.img, this.x, this.y, this.width, this.height);
  }
}



class Mouth extends Face{
  constructor(path){
    super(path);
  }

  update(d,poses) {
    //resize
    this.width = d*3;
    this.height = d*3;

    let newX = poses[0].pose.keypoints[0].position.x - this.width/2;
    let newY = poses[0].pose.keypoints[0].position.y +this.height/2;

    //mouth
    this.x = lerp(this.x, newX, 0.5);
    this.y = lerp(this.y, newY, 0.5);

  }
}


class LeftEye extends Face{
  constructor(path){
    super(path);
  }

  update(d,poses) {
    //resize
    this.width = d*3;
    this.height = d*3;

    let newX = poses[0].pose.keypoints[1].position.x - this.width/2;
    let newY = poses[0].pose.keypoints[1].position.y - this.height/2;

    //left eye
    this.x = lerp(this.x, newX, 0.5);
    this.y = lerp(this.y, newY, 0.5);
  }
}

class RightEye extends Face{
  constructor(path){
    super(path);
  }

  update(d,poses) {
    //resize
    this.width = d*2;
    this.height = d*2;

    let newX = poses[0].pose.keypoints[2].position.x - this.width/2;
    let newY = poses[0].pose.keypoints[2].position.y - this.height/2;

    //left eye
    this.x = lerp(this.x, newX, 0.5);
    this.y = lerp(this.y, newY, 0.5);
  }
}



//keypress
function keyPressed(){
  if(keyCode == 32){
    saveCanvas(c, 'myPortrait', 'jpg');
    switchBg = !switchBg;
    if(!mySound.isPlaying()){
      //play music
      mySound.setVolume(0.5);
      mySound.play();
    }
  }
  return false;
}
