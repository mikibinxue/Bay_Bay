let deco=[];

function drawDeco(){
  //draw inner circle
    for(let i=0;i<5;i++){
  push();
      translate(width/2+noise(frameCount/1000)*100,height/6+noise(frameCount/160)*10);
      scale(1+ sin(frameCount/100)*0.2);
      rotate(noise(i+i*frameCount/1000)*5);
      image(deco[i], cos(frameCount/60)*30+50, sin(frameCount/60)*30+50);
  pop();

    }
  //draw outer circle
    for(let i=5;i<10;i++){
  push();
      translate(width/2+noise(frameCount/1000)*90,height/6+noise(frameCount/100)*10);
scale(1+ cos(frameCount/100)*0.2);
      rotate(noise(i*frameCount/1000)*10);
      image(deco[i], sin(frameCount/100)*30+200, cos(frameCount/60)*30+200);
  pop();

    }
}
