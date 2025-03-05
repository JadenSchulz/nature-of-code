import p5, { Vector } from "p5";
import { p } from "./main";

export class Body {
  static G: number = 1;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;

  radius: number;
  mass: number;
  canMove: boolean;

  constructor(position: [number, number], mass: number, canMove?: boolean) {
    this.position = new p5.Vector(...position);
    this.velocity = new p5.Vector();
    this.acceleration = new p5.Vector();

    this.radius = p.sqrt(mass) * 2;
    this.mass = mass;
    this.canMove = canMove ?? true;
  }

  applyForce(force: Vector) {
    const applied = p5.Vector.div(force, this.mass) as any as Vector;
    this.acceleration.add(applied);
  }

  step() {
    if (this.canMove) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.set(0, 0);
    }
  }

  render() {
    p.push();
    p.stroke(0);
    p.strokeWeight(2);
    p.fill(200);
    p.circle(this.position.x, this.position.y, this.radius * 2);
    p.pop();
  }

  getCumulativeAttraction(bodies: Body[]): Vector {
    if (!this.canMove) return new p5.Vector();

    const accumulator = new p5.Vector();
    for (const body of bodies) {
      if (body === this) continue;
      const force = p5.Vector.sub(body.position, this.position).normalize();
      const distance = p.constrain(force.mag(), 5, 25);
      const strength = (Body.G * (this.mass * body.mass)) / distance ** 2;

      force.setMag(strength).div(this.mass);

      accumulator.add(force);
    }
    return accumulator;
  }
}
