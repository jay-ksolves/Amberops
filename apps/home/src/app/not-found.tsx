'use client';

import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { Button } from '@amberops/ui/components/ui/button';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { AnimatedThemeToggle } from '../components/animated-theme-toggle';
import '../styles/not-found.css';

export default function NotFound() {
  const cordCanvasRef = useRef<HTMLCanvasElement>(null);
  const visorCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const visorCanvas = visorCanvasRef.current;
    const cordCanvas = cordCanvasRef.current;
    if (!visorCanvas || !cordCanvas) return;

    const visorCtx = visorCanvas.getContext('2d');
    const cordCtx = cordCanvas.getContext('2d');
    if (!visorCtx || !cordCtx) return;

    const drawVisor = () => {
      if (!visorCtx) return;
      visorCtx.clearRect(0, 0, visorCanvas.width, visorCanvas.height);
      visorCtx.beginPath();
      visorCtx.moveTo(5, 45);
      visorCtx.bezierCurveTo(15, 64, 45, 64, 55, 45);
      visorCtx.lineTo(55, 20);
      visorCtx.bezierCurveTo(55, 15, 50, 10, 45, 10);
      visorCtx.lineTo(15, 10);
      visorCtx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      visorCtx.lineTo(5, 45);

      const themeIsDark = document.documentElement.classList.contains('dark');
      visorCtx.fillStyle = themeIsDark ? '#2f3640' : '#e0e0e0';
      visorCtx.strokeStyle = themeIsDark ? '#f5f6fa' : '#333';
      visorCtx.fill();
      visorCtx.stroke();
    };

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;
    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (!cordCtx) return;
      cordCtx.clearRect(0, 0, cordCanvas.width, cordCanvas.height);

      cordCtx.beginPath();
      cordCtx.moveTo(130, 170);
      cordCtx.bezierCurveTo(250, y1, 345, y2, 400, y3);

      cordCtx.strokeStyle = getComputedStyle(
        document.documentElement,
      ).getPropertyValue('--primary').trim();
      cordCtx.lineWidth = 8;
      cordCtx.stroke();

      if (y1 <= 100) y1Forward = true;
      if (y1 >= 300) y1Forward = false;
      if (y2 <= 100) y2Forward = true;
      if (y2 >= 310) y2Forward = false;
      if (y3 <= 100) y3Forward = true;
      if (y3 >= 317) y3Forward = false;

      y1 += y1Forward ? 1 : -1;
      y2 += y2Forward ? 1 : -1;
      y3 += y3Forward ? 1 : -1;
    };

    drawVisor();

    const observer = new MutationObserver(() => {
      drawVisor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    animate();
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="not-found-body">
      <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center px-4 lg:px-6">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-foreground"
          prefetch={false}
        >
          <AmberOpsLogo className="h-8 w-8" />
          <span className="font-headline text-xl font-semibold">AmberOps</span>
        </Link>
        <div className="ml-auto">
          <AnimatedThemeToggle />
        </div>
      </header>

      <div className="moon" />
      <div className="moon__crater moon__crater1" />
      <div className="moon__crater moon__crater2" />
      <div className="moon__crater moon__crater3" />

      <div className="star star1" />
      <div className="star star2" />
      <div className="star star3" />
      <div className="star star4" />
      <div className="star star5" />

      <div className="error">
        <div className="error__title">404</div>
        <div className="error__subtitle">Hmmm...</div>
        <div className="error__description">
          It looks like one of the developers fell asleep at the keyboard.
        </div>
        <div className="mt-4 flex gap-2">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contact">Contact Support</Link>
          </Button>
        </div>
      </div>

      <div className="astronaut">
        <div className="astronaut__backpack" />
        <div className="astronaut__body" />
        <div className="astronaut__body__chest" />
        <div className="astronaut__arm-left1" />
        <div className="astronaut__arm-left2" />
        <div className="astronaut__arm-right1" />
        <div className="astronaut__arm-right2" />
        <div className="astronaut__arm-thumb-left" />
        <div className="astronaut__arm-thumb-right" />
        <div className="astronaut__leg-left" />
        <div className="astronaut__leg-right" />
        <div className="astronaut__foot-left" />
        <div className="astronaut__foot-right" />
        <div className="astronaut__wrist-left" />
        <div className="astronaut__wrist-right" />

        <div className="astronaut__cord">
          <canvas ref={cordCanvasRef} id="cord" height="500px" width="500px" />
        </div>

        <div className="astronaut__head">
          <canvas ref={visorCanvasRef} id="visor" width="60px" height="60px" />
          <div className="astronaut__head-visor-flare1" />
          <div className="astronaut__head-visor-flare2" />
        </div>
      </div>
    </div>
  );
}
