import p5, { Vector } from "p5";
import { p } from "./main";
import { Mover } from "./mover";

export class Liquid {
  origin: Vector;
  dimensions: Vector;

  c: number;
  constructor(
    origin: [number, number],
    dimensions: [number, number],
    c: number
  ) {
    this.origin = new p5.Vector(...origin);
    this.dimensions = new p5.Vector(...dimensions);
    this.c = c;
  }

  render() {
    p.push();
    p.noStroke();
    p.fill(175);
    p.rect(this.origin.x, this.origin.y, this.dimensions.x, this.dimensions.y);
    p.pop();
  }

  calculateDrag(mover: Mover) {
    const vMagSq = mover.velocity.mag() ** 2;
    let dragMag = this.c * vMagSq;

    const force = mover.velocity.copy().mult(-1).setMag(dragMag);

    return force;
  }

  contains(mover: Mover) {
    return (
      mover.position.x > this.origin.x &&
      mover.position.x < this.origin.x + this.dimensions.x &&
      mover.position.y > this.origin.y &&
      mover.position.y < this.origin.y + this.dimensions.y
    );
  }
}
