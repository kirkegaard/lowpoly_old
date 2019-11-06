import React from "react";
import useWindowSize from '../hooks/useWindowSize';
import useCanvas from '../hooks/useCanvas';

const seed = (count) => {
  let res = [];
  for(let i = 0; i < count; i++) {
    res[i] = Math.ceil(Math.random(0, 1) * 3 + 1);
  }
  return res;
}

const Plasma = (props) => {
  let size = useWindowSize();

  size.width = (props.width) ? props.width : size.width;
  size.height = (props.height) ? props.height : size.height;

  const a = seed(6);
  const res = 32;
  const rad = Math.PI / 180;
  const HALF_WIDTH = Math.ceil(size.width / res);
  const HALF_HEIGHT = Math.ceil(size.height / res);

  let aa = 0;
  let ab = 0;
  let ac = 0;
  let ad = 0;
  let cr = 0;
  let cg = 0;
  let cb = 0;

  const canvasRef = useCanvas((ctx) => {
    draw(ctx);
  }, '2d');

  const draw = (ctx) => {
    for(let x = 0; x < res; x++) {
      aa += 0.0005 * Math.cos(rad * x * a[0]);
      ac += 0.0010 * Math.sin(rad * (res - x) * a[2]);

      for(let y = 0; y < res; y++) {
        ab += 0.001 * Math.cos(rad * y * a[1]);
        ad += 0.001 * Math.sin(rad * (res - y) * a[3]);

        let h = x * 8 * Math.sin(rad * (aa + ab) * a[4]);
        let j = y * 8 * Math.cos(rad * (ac + ad) * a[5]);
        let k = (x * a[0] + y * a[1]) * 32 * Math.sin(rad * ((res - x) * h + (y - res) * h) * a[2] / 720);
        let l = (res * a[3] - x  * a[3] + (res * a[4] - y * a[4])) * 32 * Math.sin(rad * (x * h + y * j) * a[5] / 720);

        h = 48 * Math.cos(rad * h) + 42 * Math.cos(rad * j);
        cr = 128 + Math.ceil(42 * Math.cos(rad * k) + h);
        cg = 128 + Math.ceil(42 * Math.cos(rad * l) + h);
        cb = 128 + Math.ceil((cr + cg) / 2 - h * 2);

        ctx.fillStyle = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
        ctx.fillRect(y * HALF_WIDTH, x * HALF_HEIGHT, HALF_WIDTH, HALF_HEIGHT);
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      height={size.height}
      width={size.width}
    />
  );
}

export default Plasma;