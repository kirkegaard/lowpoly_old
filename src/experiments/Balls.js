import React from "react";
import useWindowSize from '../hooks/useWindowSize';
import useCanvas from '../hooks/useCanvas';
import Vec2 from '../utils/Vec2';
import { Random } from '../utils/Random';

class Ball extends Vec2 {
  constructor (x, y, r, c) {
    super(x, y);
    this.r = r;
    this.c = c;
    this.s = Random(1, 2);
    this.p = new Vec2(
      Random(-100, 100),
      Random(-100, 100)
    );
  }

  update (time) {
    const t = time / Math.PI * 2 / 100 * this.s;
    this.x += Math.cos(t) * this.p.x / 25;
    this.y += Math.sin(t) * this.p.y / 100;
  }

  draw (ctx, balls) {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();

    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];
      if (this.isCloseTo(ball, 50)) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(ball.x, ball.y);
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.1)';
        ctx.stroke();
      }
    }
  }
}

const Balls = (props) => {
  let size = useWindowSize();

  size.width = (props.width) ? props.width : size.width;
  size.height = (props.height) ? props.height : size.height;

  let BALLS = [];

  const NUM = 200;
  const radX = Math.min(size.width, size.height) / 2 - 100 * 2;
  const radY = Math.min(size.height, size.width) / 2 - 100 * 2;

  for (let i = 0; i < NUM; i++) {
    const x = Math.sin(i) * Math.PI * Random(100, radX) / 2 + size.width / 2;
    const y = Math.cos(i) * Math.PI * Random(100, radY) / 2 + size.height / 2;

    const ball = new Ball(x, y, 2, 'rgba(250, 250, 250, 0.4)');
    BALLS.push(ball);
  }

  const canvasRef = useCanvas((ctx, time) => {
    // ctx.clearRect(0, 0, size.width, size.height);
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, size.width, size.height);

    for (let i = 0; i < NUM; i++) {
      BALLS[i].update(time);
      BALLS[i].draw(ctx, BALLS);
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

export default Balls;