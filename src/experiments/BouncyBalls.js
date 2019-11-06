import React from "react";
import useWindowSize from '../hooks/useWindowSize';
import useCanvas from '../hooks/useCanvas';
import Vec2 from '../utils/Vec2';

class Ball extends Vec2 {
  constructor (x, y, r, c, b) {
    super(x, y);
    this.b = b;
    this.r = r;
    this.c = c;
    this.vel = new Vec2(5, 10);
    this.pos = this.clone();
    this.trail = [];
  }

  update () {
    if (this.y >= this.pos.y) {
      this.vel.y = -this.vel.y;
    } else {
      this.vel.y += this.b;
    }

    this.y += this.vel.y;

    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];

      p.x -= this.vel.x;
      if (p.x < 0) {
        this.trail.splice(i, 1);
      }
    }
  }

  draw (ctx) {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();

    this.trail.push(this.clone());

    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];

      if (this.trail[i - 1] !== undefined) {
        const lp = this.trail[i - 1];
        ctx.beginPath();
        ctx.strokeStyle = this.c;
        ctx.lineCap = 'round';
        ctx.lineWidth = this.r;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(lp.x, lp.y);
        ctx.stroke();
      }
    }
  }
}


const BouncyBalls = (props) => {
  let size = useWindowSize();

  size.width = (props.width) ? props.width : size.width;
  size.height = (props.height) ? props.height : size.height;


  const BALLS = [
    new Ball(size.width / 10 * 4, size.height, 10, '#EE9495', 100 / size.height * 1),
    new Ball(size.width / 10 * 3, size.height, 10, '#EFCC92', 100 / size.height * 2),
    new Ball(size.width / 10 * 2, size.height, 10, '#A5DDA5', 100 / size.height * 4),
    new Ball(size.width / 10 * 1, size.height, 10, '#71CEE7', 100 / size.height * 8),
  ];


  const canvasRef = useCanvas((ctx) => {
    // ctx.clearRect(0, 0, size.width, size.height);
    ctx.fillStyle = '#FFF4F4';
    ctx.fillRect(0, 0, size.width, size.height);

    for (let i = 0; i < BALLS.length; i++) {
      BALLS[i].update();
      BALLS[i].draw(ctx);
    }
  }, '2d');

  return (
    <canvas
      ref={canvasRef}
      height={size.height}
      width={size.width}
    />
  );
};

export default BouncyBalls;
