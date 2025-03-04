import p5, { Vector } from "p5";
import { p } from "./main";
import { IEntity } from "./IEntity";

export default class Boid implements IEntity {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;

  forceQueue: Vector[];

  maxSpeed: number;

  mass: number;

  constructor(position: [number, number]) {
    this.acceleration = new p5.Vector();
    this.velocity = new p5.Vector();
    this.position = new p5.Vector(...position);

    this.maxSpeed = 10;
    this.forceQueue = [];

    this.mass = p.random(1, 10);
  }

  queueForce(force: Vector) {
    this.forceQueue.push(force);
  }
  applyForce(force: Vector) {
    this.acceleration.add(force);
  }

  applyForces() {
    while (this.forceQueue.length > 0) {
      const force = this.forceQueue.pop()!;
      const appliedForce = p5.Vector.div(force, this.mass) as any as p5.Vector;
      this.applyForce(appliedForce);
    }
  }

  step() {
    this.acceleration.set(0, 0);
    this.applyForces();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    // this.wrap();
  }

  render() {
    p.push();
    p.fill(0);
    p.translate(this.position.x, this.position.y);

    p.rotate(this.velocity.heading() + Math.PI / 2);
    p.triangle(
      0,
      0,
      -1 * this.mass,
      4 * this.mass,
      1 * this.mass,
      4 * this.mass
    );
    p.pop();
  }

  wrap() {
    if (this.position.x > p.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = p.width;
    }

    if (this.position.y > p.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = p.height;
    }
  }
}
