import p5, { Vector } from "p5";
import "./main.css";

const CANVAS_DIMENSIONS: [number, number] = [1024, 512];
const CANVAS_COLOR: [number, number, number, number] = [255, 255, 255, 255];
function sketch(p: p5) {
  let canvas: p5.Renderer;
  let drawer: Drawer;

  p.setup = () => {
    canvas = p.createCanvas(...CANVAS_DIMENSIONS);
    p.background(...CANVAS_COLOR);
    drawer = new Drawer([p.width / 2, p.height / 2], p.height / 2, 1, (n) =>
      p.sin(n + n / 3 + n / 9 + n / 27 + n / 81 + n / 81 ** 2)
    );
  };
  p5.sound;
  p.draw = () => {
    p.background(...CANVAS_COLOR);
    drawer.step();
    drawer.render();
  };
}

export const p = new p5(sketch);

class Drawer {
  static SAMPLE_RATE: number = 0.5;
  points: Vector[] = [];
  position: Vector;
  time: number = 0;
  amplitude: number;
  frequency: number;
  function: (n: number) => number;
  constructor(
    position: [number, number],
    a: number,
    f: number,
    fn: (n: number) => number
  ) {
    this.position = new Vector(...position);
    this.amplitude = a;
    this.frequency = f;
    this.function = fn;
  }

  step() {
    console.log(this.points.length);
    for (let i = 0; i < Drawer.SAMPLE_RATE; i++) {
      for (const point of this.points) {
        point.x -= 1 / Drawer.SAMPLE_RATE;
      }
      this.points.push(
        this.position
          .copy()
          .add(
            0,
            p.map(
              p.constrain(this.function(p.cos(this.time)), -1, 1),
              -1,
              1,
              -this.amplitude,
              this.amplitude
            )
          )
      );
      this.points = this.points.filter((p) => p.x > 0);
      this.time += (this.frequency * 0.16) / Drawer.SAMPLE_RATE;
    }
  }

  render() {
    p.fill(0);
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      const nextPoint = this.points[i + 1];

      if (point && nextPoint) {
        p.strokeWeight(0.5);
        p.line(point.x, point.y, nextPoint.x, nextPoint.y);
      }
      p.circle(point.x, point.y, 1);
    }
  }
}
