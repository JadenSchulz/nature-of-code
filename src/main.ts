import p5, { Vector } from "p5";
import "./main.css";
import { Mover } from "./mover";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number, number] = [255, 255, 255, 255];
function sketch(p: p5) {
  let canvas: p5.Renderer;

  let anchor: Vector;
  let bob: Vector;
  let restLength: number;

  let mover: Mover;

  const K = 0.1;
  p.setup = () => {
    canvas = p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);
    restLength = 100;

    anchor = new Vector(p.width / 2, 0);
    bob = new Vector(p.width / 2, 120);

    mover = new Mover([bob.x, bob.y], 5);
  };
  p.draw = () => {
    p.background(...CANVAS_COLOR);

    const gravity = new Vector(0, 9.81);

    const force = p5.Vector.sub(mover.position, anchor);
    const length = force.mag();

    const x = length - restLength;
    force.setMag(-1 * K * x);

    p.push();
    p.strokeWeight(p.constrain((4 * restLength) / length, 0, 4));
    p.line(anchor.x, anchor.y, mover.position.x, mover.position.y);
    p.pop();
    mover.applyForce(force);
    mover.applyForce(gravity);

    mover.handleDrag(p.mouseX, p.mouseY);
    mover.step();
    mover.render();
  };

  p.mousePressed = () => {
    mover.handleClick(p.mouseX, p.mouseY);
  };

  p.mouseReleased = () => {
    mover.stopDragging();
  };
}

export const p = new p5(sketch);
