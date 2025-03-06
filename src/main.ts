import p5, { Vector } from "p5";
import "./main.css";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number, number] = [255, 255, 255, 255];
function sketch(p: p5) {
  let r: number;
  let theta: number;

  let canvas: p5.Renderer;
  p.setup = () => {
    canvas = p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);

    // polar coordinates
    r = p.height * 0.45;
    theta = 0;
  };
  p.draw = () => {
    // p.background(...CANVAS_COLOR);

    p.translate(p.width / 2, p.height / 2);

    // let x = r * p.cos(theta);
    // let y = r * p.sin(theta);

    let { x, y } = Vector.fromAngle(theta).mult(r);

    p.fill(127);
    p.stroke(0);
    p.line(0, 0, x, y);
    p.circle(x, y, 48);

    theta += 0.1;
  };
}

export const p = new p5(sketch);
