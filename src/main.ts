import p5, { Vector } from "p5";
import "./main.css";
import { Mover } from "./mover";
import { Liquid } from "./liquid";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number] = [222, 222, 255];

const GRAVITY = new p5.Vector(0, 9.81 / 20);
const WIND_SPEED = 1;

function calculateWindForce(x: number, y: number): Vector {
  const angle = (p.noise(x / 100, y / 100) * (p.TWO_PI * 2)) % p.TWO_PI;
  const v = new p5.Vector(p.cos(angle), p.sin(angle)).normalize();
  return v.setMag(WIND_SPEED);
}

function calculateFriction(velocity: Vector): Vector {
  const coeff = 0.1;
  const normal = 1;

  const frictionMag = coeff * normal;

  const friction = velocity.copy();
  friction.mult(-1);
  friction.setMag(frictionMag);
  return friction;
}
function sketch(p: p5) {
  const movers: Mover[] = [];
  let liquid: Liquid;
  p.setup = () => {
    p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);

    liquid = new Liquid([0, p.height / 2], [p.width, p.height / 2], 400);
    for (let i = 0; i < p.width / 90; i++) {
      movers.push(new Mover([i * 90, 90], p.random(30, 90)));
    }
  };

  p.draw = () => {
    p.background(240);

    liquid.render();

    for (const mover of movers) {
      mover.applyForce(p5.Vector.mult(GRAVITY, mover.mass) as any as Vector);

      const WindForce = calculateWindForce(mover.position.x, mover.position.y);

      mover.applyForce(WindForce);
      if (mover.isContactingEdge()) {
        const FrictionForce = calculateFriction(mover.velocity);
        mover.applyForce(FrictionForce);
      }

      if (liquid.contains(mover)) {
        const drag = liquid.calculateDrag(mover);
        mover.applyForce(drag);
      }

      mover.bounceEdges();
      mover.step();
      mover.render();
    }
  };
}

export const p = new p5(sketch);
