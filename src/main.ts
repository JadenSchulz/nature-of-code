import p5 from "p5";
import "./main.css";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number] = [222, 222, 255];
function sketch(p: p5) {
  p.setup = () => {
    p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);
  };

  p.draw = () => {
    p.background(240);
  };
}

export const p = new p5(sketch);
