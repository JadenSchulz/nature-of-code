import p5, { Vector } from "p5";
import { p } from "./main";

export class Mover {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;

  mass: number;
  size: number;
  static MAX_SPEED = 20;

  /**
   *
   */
  constructor(initialPosition: [number, number], mass: number) {
    this.acceleration = new p5.Vector();
    this.velocity = new p5.Vector();
    this.position = new p5.Vector(...initialPosition);

    this.mass = mass;
    this.size = mass;
  }

  applyForce(force: Vector) {
    const applied = p5.Vector.div(force, this.mass) as unknown as Vector;
    this.acceleration.add(applied);
  }

  step() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(Mover.MAX_SPEED);
    this.position.add(this.velocity);

    this.acceleration.set(0, 0);
  }

  render() {
    p.push();
    p.fill(200);
    p.stroke(50);
    p.strokeWeight(3);
    p.circle(this.position.x, this.position.y, this.size);
  }

  bounceEdges() {
    // A new variable to simulate an inelastic collision
    // 10% of the velocity's x or y component is lost
    let bounce = -0.85;
    let r = this.size / 2 - 1;

    if (this.position.x > p.width - r) {
      this.position.x = p.width - r;
      this.velocity.x *= bounce;
    } else if (this.position.x < r) {
      this.position.x = r;
      this.velocity.x *= bounce;
    }
    if (this.position.y > p.height - r) {
      this.position.y = p.height - r;
      this.velocity.y *= bounce;
    }
  }

  isContactingEdge() {
    const r = this.size / 2 - 1;
    return (
      this.position.y > p.height - r ||
      this.position.y < 0 + r ||
      this.position.x > p.width - r ||
      this.position.x < 0 + r
    );
  }
}
