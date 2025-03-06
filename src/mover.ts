import { Vector } from "p5";
import { p } from "./main";

export class Mover {
  velocity: Vector;
  position: Vector;
  acceleration: Vector;
  mass: number;
  radius: number;

  DAMPING: number = 0.98;
  dragging: boolean = false;
  dragOffset: Vector = new Vector();

  /**
   *
   */
  constructor(position: [number, number], mass: number) {
    this.position = new Vector(...position);
    this.velocity = new Vector();
    this.acceleration = new Vector();

    this.mass = mass;
    this.radius = p.sqrt(mass) * 2;
  }

  render() {
    p.push();

    p.fill(175);

    p.translate(this.position.x, this.position.y);
    p.circle(0, 0, this.radius * 2);

    p.pop();
  }

  step() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.DAMPING);

    this.position.add(this.velocity);

    this.acceleration.set(0, 0);
  }

  applyForce(force: Vector) {
    const applied = Vector.div(force, this.mass) as any as Vector;
    this.acceleration.add(applied);
  }

  handleClick(mouseX: number, mouseY: number) {
    const distance = p.dist(mouseX, mouseY, this.position.x, this.position.y);
    if (distance < this.radius) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mouseX;
      this.dragOffset.y = this.position.y - mouseY;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mouseX: number, mouseY: number) {
    if (this.dragging) {
      this.position.x = mouseX + this.dragOffset.x;
      this.position.y = mouseY + this.dragOffset.y;
    }
  }
}
