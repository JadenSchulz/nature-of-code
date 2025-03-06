import p5, { Vector } from "p5";
import "./main.css";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number, number] = [200, 200, 200, 255];
function sketch(p: p5) {
  let canvas: p5.Renderer;
  let snek: Snek;
  p.setup = () => {
    canvas = p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);

    snek = new Snek(32, -8, 32, 4);
  };

  p.draw = () => {
    p.background(...CANVAS_COLOR);

    if (p.keyIsDown(p.LEFT_ARROW)) {
      snek.rotate(-1);
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      snek.rotate(1);
    }
    if (p.keyIsDown(p.UP_ARROW)) {
      snek.moveForward();
    }

    snek.step();
    snek.render();
  };
}

export const p = new p5(sketch);

class Oscillator {
  angle: number;
  angularVelocity: number;
  amplitude: number;
  x: number;
  constructor(x: number, offset: number) {
    this.x = x;
    this.angle = offset;
    this.angularVelocity = 0.025;
    this.amplitude = p.height / 2;
  }

  step() {
    this.angle += this.angularVelocity;
  }

  render() {
    const y =
      (p.map(p.noise(this.angle), 0, 1, -1, 1) * this.amplitude * 2) %
      this.amplitude;

    p.push();
    p.translate(0, p.height / 2);
    p.stroke(0);
    p.fill(127);
    p.circle(this.x, y, 1);
    p.pop();
  }
}

class Snek {
  speed: number;
  size: number;
  position: Vector;
  velocity: Vector;
  angle: number;
  spacing: number;
  segments: Segment[] = [];

  /**
   *
   */
  constructor(segments: number, gap: number, size: number, speed: number) {
    this.size = size;
    this.spacing = size + gap;
    this.position = new Vector(p.width / 2, p.height / 2);
    this.velocity = new Vector();
    this.angle = 0;
    this.speed = speed;

    for (let i = 0; i < segments; i++) {
      this.segments.push(
        new Segment(this.position, this.spacing, i + 1, this.size, this.speed)
      );
    }
  }
  rotate(angle: number) {
    this.angle += p.constrain(angle, -0.1, 0.1);
    this.segments.forEach((segment, i, segments) =>
      segment.lookAt(i === 0 ? this.position : segments[i - 1].position)
    );
  }

  moveForward() {
    this.velocity = Vector.fromAngle(this.angle).mult(this.speed);
    this.segments.forEach((segment, i, segments) =>
      segment.moveToward(i === 0 ? this.position : segments[i - 1].position)
    );
  }

  step() {
    this.position.add(this.velocity);

    this.segments.forEach((segment) => segment.step());

    this.velocity.set(0, 0);
  }

  render() {
    p.push();

    p.stroke(0);
    p.fill(0, 255, 80);

    p.translate(this.position.x % p.width, this.position.y % p.height);
    p.rotate(this.angle);
    p.circle(0, 0, this.size * 1.15);
    p.line(0, 0, this.size / 2, 0);
    p.pop();

    this.segments.forEach((segment) => segment.render());
  }

  wrap() {}
}

class Segment {
  speed: number;
  segment: number;
  size: number;
  spacing: number;
  position: Vector;
  velocity: Vector;
  angle: number;
  constructor(
    position: Vector,
    spacing: number,
    segment: number,
    size: number,
    speed: number
  ) {
    this.size = size;
    this.spacing = spacing;
    this.position = new Vector(position.x - spacing * segment, position.y);
    this.velocity = new Vector();
    this.segment = segment;
    this.speed = speed;
    this.angle = 0;
  }
  lookAt(point: Vector) {
    this.angle = p.atan2(
      -this.position.y + point.y,
      -this.position.x + point.x
    );
  }

  moveToward(point: Vector) {
    if (this.position.dist(point) > this.spacing) {
      this.lookAt(point);
      this.velocity = Vector.fromAngle(this.angle).mult(this.speed);
    }
  }

  step() {
    this.position.add(this.velocity);
    this.velocity.set(0, 0);
  }

  render() {
    p.push();

    p.stroke(0);
    p.fill(0, 255, 80);

    const offset =
      ((p.sin(
        this.position.x / (this.size + this.spacing) +
          this.position.y / (this.size + this.spacing)
      ) *
        this.size) /
        2) *
      p.constrain((this.segment - 1) / 3, 0, 1);

    p.translate(this.position.x % p.width, this.position.y % p.height);
    p.rotate(this.angle);
    p.translate(0, offset);
    p.circle(0, 0, this.size);
    p.pop();
  }
}
