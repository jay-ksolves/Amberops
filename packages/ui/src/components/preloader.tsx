
'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { cn } from '@amberops/lib';
import '../styles/preloader.css';
import { AmberOpsLogo } from './icons';

interface PreloaderProps {
  text?: string;
  countdown?: number;
}

export function Preloader({
  text = 'Loading...',
  countdown,
}: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [countdownValue, setCountdownValue] = useState(countdown);

  useEffect(() => {
    if (countdownValue && countdownValue > 0) {
      const timer = setTimeout(() => {
        setCountdownValue(countdownValue - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdownValue]);

  useEffect(() => {
    if (preloaderRef.current) {
      anime({
        targets: '.preloader-container',
        keyframes: [
          { rotateZ: 30 },
          { rotateZ: 60 },
          { rotateZ: 90 },
          { rotateZ: 120 },
          { rotateZ: 150 },
          { rotateZ: 180 },
        ],
        duration: 9000,
        loop: true,
        easing: 'linear',
      });

      anime({
        targets: ['.side-odd .left', '.side-odd .right'],
        keyframes: [{ width: '80px' }, { width: '40px' }],
        duration: 3000,
        loop: true,
        easing: 'easeInOutSine',
      });

      anime({
        targets: ['.side-even .left', '.side-even .right'],
        keyframes: [{ width: '40px' }, { width: '80px' }],
        duration: 3000,
        loop: true,
        easing: 'easeInOutSine',
      });

      anime({
        targets: { progressValue: 0 },
        progressValue: 100,
        duration: 1500, // Slightly shorter than typical load to feel fast
        easing: 'cubicBezier(.5, .05, .1, .3)',
        round: 1,
        update: (anim) => {
          setProgress(anim.animatables[0].target.progressValue);
        },
      });
    }
  }, []);

  return (
    <div ref={preloaderRef} className="preloader-body" data-testid="preloader">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3 text-foreground">
          <AmberOpsLogo className="h-10 w-10" />
          <h1 className="font-headline text-4xl font-semibold">AmberOps</h1>
        </div>
        <div className="preloader-container">
          <div className="side side-odd">
            <div className="left" />
            <div className="right" />
          </div>
          <div className="side side-even">
            <div className="left" />
            <div className="right" />
          </div>
          <div className="side side-odd">
            <div className="left" />
            <div className="right" />
          </div>
          <div className="side side-even">
            <div className="left" />
            <div className="right" />
          </div>
          <div className="side side-odd">
            <div className="left" />
            <div className="right" />
          </div>
          <div className="side side-even">
            <div className="left" />
            <div className="right" />
          </div>
        </div>
        <div className="text-center text-muted-foreground font-mono">
          <p>
            {text}{' '}
            {countdownValue !== undefined && `in ${countdownValue}s...`}
          </p>
          <p className="font-bold text-lg">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
