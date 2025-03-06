import p5 from "p5";
import "./main.css";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number, number] = [255, 255, 255, 255];
function sketch(p: p5) {
  let canvas: p5.Renderer;
  p.setup = () => {
    canvas = p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);
  };
  p.draw = () => {
    p.background(...CANVAS_COLOR);
  };
}

export const p = new p5(sketch);
