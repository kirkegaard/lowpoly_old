import { useRef, useEffect } from 'react';

const useCanvas = (draw, context = '2d') => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext(context);

    const renderFrame = () => {
      animationFrameId = requestAnimationFrame(renderFrame);
      draw(ctx, animationFrameId);
    }

    let animationFrameId = requestAnimationFrame(renderFrame);

    return () => cancelAnimationFrame(animationFrameId);
  }, [context, draw]);

  return canvasRef;
}

export default useCanvas;