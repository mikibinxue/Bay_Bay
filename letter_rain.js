let snowflakes = []; // array to hold snowflake objects

//for the font
let fontsize = 32;
let font;

// snowflake class
function snowflake(counter) {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(12, 15);
  this.fontSize = random(10, 300);
  this.letter = char(counter);
  this.h = random(250);
  this.s = random(250);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    // fill(sin(frameCount/60) * 250,cos(frameCount/60) * 250,tan(frameCount/60) * 200);
    //fill color HSB
    fill(this.h,this.s,80);
    textFont(font);
    textSize(this.fontSize);
    text(this.letter, this.posX, this.posY);
  };
}

function createSnow() {

  //draw snowflake
  let t = frameCount / 60; // update time

  if (int(random(6)) == 0) {
    snowflakes.push(new snowflake((35 + t) % 40)); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

}
