import { Vector } from "p5";

export interface IEntity {
  position: Vector;
  step(): void;
  render(): void;

  queueForce(force: Vector): void;
}

export interface EntityConstructor<Entity extends IEntity> {
  new (position: [number, number]): Entity;
}
