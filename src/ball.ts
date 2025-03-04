// import p5, { Vector } from "p5";
// import { energySlider, p } from "./main";

// export class Ball {
//   position: Vector;
//   velocity: Vector;
//   acceleration: Vector;
//   maxSpeed: number;
//   diameter: number;
//   color: [number, number, number];
//   /**
//    *
//    */
//   constructor(
//     initialPosition: [number, number],
//     initialVelocity: [number, number]
//   ) {
//     this.position = new p5.Vector(...initialPosition);
//     this.velocity = new p5.Vector(...initialVelocity);
//     this.acceleration = new p5.Vector();

//     this.maxSpeed = 1;
//     this.diameter = 10;
//     this.color = [p.random(255), p.random(255), p.random(255)];
//   }

//   draw() {
//     p.fill(...this.color);
//     p.circle(this.position.x, this.position.y, this.diameter);
//   }

//   step(neighbourhood: Ball[]) {
//     this.gravity();
//     this.collideFloor();
//     this.collideWalls();
//     this.collideBalls(neighbourhood);

//     this.position.add(this.velocity);
//     this.velocity.add(this.acceleration);
//     this.velocity.limit(Number(energySlider.value()) ?? this.maxSpeed);
//   }

//   collideBalls(neighbourhood: Ball[]) {
//     for (const ball of neighbourhood) {
//       const distance = ball.position.dist(this.position);
//       if (distance < this.diameter / 2) {
//         const collisionVector = new p5.Vector(
//           this.position.x - ball.position.x,
//           this.position.y - ball.position.y
//         );
//         this.velocity.add(collisionVector);
//       }
//     }
//   }
//   collideFloor() {
//     if (this.position.y > p.height - this.diameter / 2 && this.velocity.y > 0) {
//       this.velocity.y = this.velocity.y * -0.75;
//     }
//   }

//   collideWalls() {
//     if (
//       this.position.x < 0 + this.diameter / 2 ||
//       this.position.x > p.width - this.diameter / 2
//     ) {
//       this.velocity.x = this.velocity.x * -0.75;
//     }
//   }
//   gravity() {
//     this.acceleration.set(0, 9.81 / 100);
//   }
// }
