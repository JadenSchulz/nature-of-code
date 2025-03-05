import p5, { Vector } from "p5";
import "./main.css";
import { Body } from "./body";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number, number] = [255, 255, 255, 255];
function sketch(p: p5) {
  const bodies: Body[] = [];
  p.setup = () => {
    p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);

    const DIST_OFFSET = 80;

    bodies.push(
      new Body([p.width / 2 - DIST_OFFSET, p.height / 2 - DIST_OFFSET], 64)
    );
    bodies.push(
      new Body([p.width / 2 + DIST_OFFSET, p.height / 2 + DIST_OFFSET], 64)
    );
    bodies.push(
      new Body([p.width / 2 + DIST_OFFSET, p.height / 2 - DIST_OFFSET], 64)
    );
    bodies.push(
      new Body([p.width / 2 - DIST_OFFSET, p.height / 2 + DIST_OFFSET], 64)
    );

    bodies[0].velocity.set(3, 0);
    bodies[1].velocity.set(-3, 0);

    bodies[2].velocity.set(0, 3);
    bodies[3].velocity.set(0, -3);
  };

  p.draw = () => {
    p.background(...CANVAS_COLOR);
    const forces: Vector[] = [];
    for (const body of bodies) {
      forces.push(body.getCumulativeAttraction(bodies));
    }

    for (let i = 0; i < bodies.length; i++) {
      bodies[i].applyForce(forces[i]);
      bodies[i].step();
      bodies[i].render();
    }
  };

  p.mouseClicked = () => {
    bodies.push(new Body([p.mouseX, p.mouseY], 64));
  };
}

export const p = new p5(sketch);
