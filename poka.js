let dots;


class Pokas {
  constructor() {
    this.dots = [];
    this.gap = height/4;
    this.margin = height/40;
  }

  initialize() {


    let counter = 0;
    let dot;
    for (let y = 0; y < height - this.gap; y += this.gap) {
      for (let x = 0; x < width - this.gap; x += this.gap) {

        if (counter % 3 == 0) {
          dot = new Poka1(x, y, height);
        } else if (counter % 3 == 1) {
          dot = new Poka2(x, y, height);
        } else {
          dot = new Poka3(x, y, height);

        }

        this.dots.push(dot);

        counter++;
      }
    }
  }

  run() {

    push();
    translate(this.margin * 4, this.margin * 4);
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].update();
      this.dots[i].display();
    }

    pop();

  }
}

class Poka1 {
  constructor(x, y, d) {
    this.posX = x;
    this.posY = y;
    this.dia = d;
    this.d = 0;
    this.angle = 0;
  }

  update() {
    this.angle += 0.05;
    this.d = 10 + (sin(this.angle) * this.dia) / 2+ this.dia / 2;
  }

  display() {
    noStroke();
    fill(54,6,90);
    ellipse(this.posX, this.posY, this.d, this.d);
  }
}

class Poka2 extends Poka1 {
  constructor(x, y, d) {
    super(x, y, d);
  }

  update() {
    this.angle += 0.05;
    this.d = 10 + (sin(this.angle + PI / 2) * this.dia) / 2 + this.dia / 2;
  }

}

class Poka3 extends Poka1 {
  constructor(x, y, d) {
    super(x, y, d);
  }

  update() {
    this.angle += 0.05;
    this.d = 10 + (sin(this.angle + PI) * this.dia) / 2 + this.dia / 2;
  }

}
