import p5, { Vector } from "p5";
import "./main.css";
import { EntityConstructor, IEntity } from "./IEntity";
import Boid from "./boid";
function sketch(p: p5) {
  // let entities: Boid[] = [];

  let entityManager: EntityManager;

  let wind: Wind;
  p.setup = () => {
    p.createCanvas(32 * 32, 32 * 16);
    p.background(200);
    wind = new Wind(64);
    entityManager = new EntityManager();
  };

  let n: number = 0;
  p.draw = () => {
    p.background(240);
    wind.step();
    wind.render();
    if (n === 0) {
      entityManager.create(1, Boid, [256, 256]);
    }
    entityManager.entities.forEach((entity) => {
      entity.queueForce(wind.query(entity.position.x, entity.position.y));
    });
    entityManager.updateThenDraw();
    if (entityManager.cull() > 0) {
      entityManager.create(1, Boid, [256, 256]);
    }
    n++;
    n %= 20;
  };
}

export const p = new p5(sketch);

class Wind {
  #t: number = 0;
  cellSize: number;
  speed: number = 16;
  constructor(cellSize: number) {
    this.cellSize = cellSize;
  }

  step() {
    this.#t += 0.0025;
  }
  render() {
    for (let x = 0; x < p.width / this.cellSize; x++) {
      for (let y = 0; y < p.height / this.cellSize; y++) {
        const v = this.query(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize / 2
        );

        const c = p5.Vector.normalize(v).mult(255);
        p.push();
        p.fill(c.x, c.y, 255 - c.x, 50);
        p.strokeWeight(0.5);
        p.translate(x * this.cellSize, y * this.cellSize);
        p.square(0, 0, this.cellSize - 1);

        p.stroke(0);
        p.translate(this.cellSize / 2, this.cellSize / 2);
        p.line(0, 0, v.x, v.y);
        p.fill(255, 0, 0);
        p.circle(v.x, v.y, 3);
        p.pop();
      }
    }
  }
  query(x: number, y: number, maxMag?: number): Vector {
    x /= this.cellSize * 10;
    y /= this.cellSize * 10;
    const theta = (p.noise(x, y, this.#t) * (p.TWO_PI * 2)) % p.TWO_PI;

    const mag = p.map(
      p.noise(x + 10000, y + 10000, this.#t),
      0,
      1,
      0,
      maxMag ?? this.speed
    );

    return p.createVector(p.cos(theta), p.sin(theta)).normalize().mult(mag);
  }
}

class EntityManager {
  entities: IEntity[];
  /**
   *
   */
  constructor() {
    this.entities = [];
  }

  cull() {
    const length = this.entities.length;
    console.log(length);
    this.entities = this.entities.filter(
      (entity) =>
        entity.position.x < p.width &&
        entity.position.x > 0 &&
        entity.position.y < p.height &&
        entity.position.y > 0
    );

    return length - this.entities.length;
  }

  updateThenDraw() {
    for (const entity of this.entities) {
      entity.step();
      entity.render();
    }
  }

  create<Entity extends IEntity>(
    n: number,
    constructor: EntityConstructor<Entity>,
    position: [number, number]
  ) {
    for (let i = 0; i < n; i++) {
      this.entities.push(new constructor(position));
    }
  }
}
