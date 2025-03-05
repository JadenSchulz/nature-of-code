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

    // for (let i = 0; i < 3; i++) {
    //   const MAX_DIST = 200;
    //   const x = p.map(
    //     p.noise(i),
    //     0,
    //     1,
    //     p.width / 2 - MAX_DIST,
    //     p.width / 2 + MAX_DIST
    //   );
    //   const y = p.map(
    //     p.noise(i + 10000),
    //     0,
    //     1,
    //     p.height / 2 - MAX_DIST,
    //     p.height / 2 + MAX_DIST
    //   );

    //   const body = new Body([x, y], p.random(5, 10));
    //   bodies.push(body);
    // }

    const DIST_A = 100;
    const DIST_B = 150;

    bodies.push(new Body([p.width / 2 - DIST_A, p.height / 2 - DIST_A], 8));
    bodies.push(new Body([p.width / 2 + DIST_A, p.height / 2 + DIST_A], 8));
    // bodies.push(new Body([p.width / 2 - DIST_A, p.height / 2 + DIST_A], 125));
    // bodies.push(new Body([p.width / 2 + DIST_A, p.height / 2 - DIST_A], 125));

    bodies[0].velocity.set(20, 0);
    bodies[1].velocity.set(-20, 0);
    // bodies[2].velocity.set(0, -20);
    // bodies[3].velocity.set(0, 20);

    // bodies.push(new Body([p.width / 2 - DIST_B, p.height / 2 - DIST_B], 5));
    // bodies.push(new Body([p.width / 2 + DIST_B, p.height / 2 + DIST_B], 5));
    // bodies.push(new Body([p.width / 2 - DIST_B, p.height / 2 + DIST_B], 5));
    // bodies.push(new Body([p.width / 2 + DIST_B, p.height / 2 - DIST_B], 5));

    // bodies[4].velocity.set(5, 0);
    // bodies[5].velocity.set(-5, 0);
    // bodies[6].velocity.set(0, -5);
    // bodies[7].velocity.set(0, 5);

    // bodies.push(new Body([p.width / 2, p.height / 2], 20));
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
}

export const p = new p5(sketch);
