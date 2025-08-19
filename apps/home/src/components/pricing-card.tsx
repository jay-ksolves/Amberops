'use client';

import { cn } from '@amberops/lib';
import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';
import * as THREE from 'three';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isFeatured?: boolean;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  isFeatured = false,
}: PricingCardProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const cardId = useId();

  useEffect(() => {
    let isMounted = true;
    let renderer: THREE.WebGLRenderer;

    async function init() {
      if (!isMounted || !cardContainerRef.current || !canvasRef.current) return;

      let scene: THREE.Scene;
      let camera: THREE.OrthographicCamera;
      let fieryBandMesh: THREE.Mesh;
      let uniforms: any;

      const cardContainer = cardContainerRef.current;
      const canvas = canvasRef.current;

      const bandVertexShader = `
                uniform float time;
                varying vec2 vUv;
                varying vec3 vPosition;
                float noise(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
                void main() {
                    vUv = uv;
                    vPosition = position;
                    vec3 newPosition = position;
                    float distortionAmount = 0.02; 
                    float distortion = noise(vec2(position.x * 0.05 + time * 0.1, position.y * 0.05 - time * 0.15)) * distortionAmount;
                    vec2 normalizedPos = normalize(position.xy);
                    newPosition.x += normalizedPos.x * distortion;
                    newPosition.y += normalizedPos.y * distortion;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `;

      const fieryBandFragmentShader = `
                uniform float time;
                uniform vec3 fireColorBase;
                varying vec2 vUv;
                float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
                float noise(vec2 st) {
                    vec2 i = floor(st); vec2 f = fract(st);
                    float a = random(i); float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }
                float turbulence(vec2 st, float baseFreq, int octaves) {
                    float value = 0.0; float amplitude = 1.0; float frequency = baseFreq;
                    for (int i = 0; i < octaves; i++) {
                        value += amplitude * abs(noise(st * frequency));
                        st = st * 1.4 + vec2(3.2, 1.7); 
                        frequency *= 2.0; amplitude *= 0.5;
                    }
                    return value;
                }
                void main() {
                    float slowTime = time * 0.4; float mediumTime = time * 0.8; float fastTime = time * 1.6;
                    vec2 centeredUv = vUv - vec2(0.5);
                    float angle = atan(centeredUv.y, centeredUv.x);
                    float normalizedAngle = (angle / (2.0 * 3.14159)) + 0.5;
                    vec2 noiseCoord1 = vec2(normalizedAngle * 8.0 + mediumTime * 0.3, vUv.y * 4.0 - mediumTime * 0.4);
                    float fireDetail1 = turbulence(noiseCoord1, 1.0, 4);
                    vec2 noiseCoord2 = vec2(normalizedAngle * 6.0 - mediumTime * 0.5, vUv.y * 3.0 + mediumTime * 0.3);
                    float fireDetail2 = turbulence(noiseCoord2, 0.8, 3);
                    float fireDetail = fireDetail1 * 0.6 + fireDetail2 * 0.4;
                    fireDetail = pow(fireDetail, 1.2); 
                    float widthModulation = 1.0 - pow(abs(vUv.y - 0.5) * 1.8, 2.0);
                    widthModulation = clamp(widthModulation, 0.3, 1.0);
                    float turbulentIntensity = fireDetail * widthModulation;
                    vec3 finalColor = mix(vec3(0.7, 0.05, 0.01), fireColorBase, turbulentIntensity);
                    gl_FragColor = vec4(finalColor, turbulentIntensity);
                }
            `;

      const createRingGeometry = () => {
        if (!cardContainer) return;
        try {
          const cardRect = cardContainer.getBoundingClientRect();
          if (cardRect.width === 0 || cardRect.height === 0) {
            return;
          }
          const gap = 10;
          const ringThickness = 20;
          const cornerRadius = 28;
          const outerWidth = cardRect.width + 2 * (gap + ringThickness);
          const outerHeight = cardRect.height + 2 * (gap + ringThickness);
          const outerRadius = cornerRadius + gap + ringThickness;
          const innerWidth = cardRect.width + 2 * gap;
          const innerHeight = cardRect.height + 2 * gap;
          const innerRadius = cornerRadius + gap;
          const canvasPadding = 40;
          const canvasWidth = outerWidth + canvasPadding;
          const canvasHeight = outerHeight + canvasPadding;

          if (renderer) renderer.setSize(canvasWidth, canvasHeight);
          if (camera) {
            camera.left = -canvasWidth / 2;
            camera.right = canvasWidth / 2;
            camera.top = canvasHeight / 2;
            camera.bottom = -canvasHeight / 2;
            camera.updateProjectionMatrix();
          }
          if (fieryBandMesh && fieryBandMesh.geometry)
            fieryBandMesh.geometry.dispose();

          const outerShape = new THREE.Shape();
          outerShape.moveTo(-outerWidth / 2 + outerRadius, -outerHeight / 2);
          outerShape.lineTo(outerWidth / 2 - outerRadius, -outerHeight / 2);
          outerShape.quadraticCurveTo(
            outerWidth / 2,
            -outerHeight / 2,
            outerWidth / 2,
            -outerHeight / 2 + outerRadius,
          );
          outerShape.lineTo(outerWidth / 2, outerHeight / 2 - outerRadius);
          outerShape.quadraticCurveTo(
            outerWidth / 2,
            outerHeight / 2,
            outerWidth / 2 - outerRadius,
            outerHeight / 2,
          );
          outerShape.lineTo(-outerWidth / 2 + outerRadius, outerHeight / 2);
          outerShape.quadraticCurveTo(
            -outerWidth / 2,
            outerHeight / 2,
            -outerWidth / 2,
            outerHeight / 2 - outerRadius,
          );
          outerShape.lineTo(-outerWidth / 2, -outerHeight / 2 + outerRadius);
          outerShape.quadraticCurveTo(
            -outerWidth / 2,
            -outerHeight / 2,
            -outerWidth / 2 + outerRadius,
            -outerHeight / 2,
          );

          const innerShapePath = new THREE.Path();
          innerShapePath.moveTo(-innerWidth / 2 + innerRadius, -innerHeight / 2);
          innerShapePath.lineTo(innerWidth / 2 - innerRadius, -innerHeight / 2);
          innerShapePath.quadraticCurveTo(
            innerWidth / 2,
            -innerHeight / 2,
            innerWidth / 2,
            -innerHeight / 2 + innerRadius,
          );
          innerShapePath.lineTo(innerWidth / 2, innerHeight / 2 - innerRadius);
          innerShapePath.quadraticCurveTo(
            innerWidth / 2,
            innerHeight / 2,
            innerWidth / 2 - innerRadius,
            innerHeight / 2,
          );
          innerShapePath.lineTo(-innerWidth / 2 + innerRadius, innerHeight / 2);
          innerShapePath.quadraticCurveTo(
            -innerWidth / 2,
            innerHeight / 2,
            -innerWidth / 2,
            innerHeight / 2 - innerRadius,
          );
          innerShapePath.lineTo(-innerWidth / 2, -innerHeight / 2 + innerRadius);
          innerShapePath.quadraticCurveTo(
            -innerWidth / 2,
            -innerHeight / 2,
            -innerWidth / 2 + innerRadius,
            -innerHeight / 2,
          );

          outerShape.holes.push(innerShapePath);
          const ringGeometry = new THREE.ShapeGeometry(outerShape, 48);
          if (fieryBandMesh) fieryBandMesh.geometry = ringGeometry;
        } catch (error) {
          console.warn('Error creating ring geometry:', error);
        }
      };

      const animate = () => {
        if (!isMounted) return;
        animationFrameId.current = requestAnimationFrame(animate);
        if (uniforms) {
          uniforms.time.value += 0.016;
        }
        try {
          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        } catch (error) {
          console.warn('Error during rendering:', error);
        }
      };

      const initThree = () => {
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(
          -1000,
          1000,
          1000,
          -1000,
          0.1,
          2000,
        );
        camera.position.z = 100;

        try {
          renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
          });
          uniforms = {
            time: { value: 0.0 },
            fireColorBase: {
              value: new THREE.Color(
                `hsl(${getComputedStyle(
                  document.documentElement,
                ).getPropertyValue('--primary')})`,
              ),
            },
          };
          const material = new THREE.ShaderMaterial({
            vertexShader: bandVertexShader,
            fragmentShader: fieryBandFragmentShader,
            uniforms,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
            side: THREE.DoubleSide,
          });
          const placeHolderGeometry = new THREE.PlaneGeometry(50, 50);
          fieryBandMesh = new THREE.Mesh(placeHolderGeometry, material);
          scene.add(fieryBandMesh);
          createRingGeometry();
          animate();
        } catch (error) {
          console.warn('Error in Three.js initialization:', error);
        }
      };

      let resizeTimeout: NodeJS.Timeout;
      const onWindowResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createRingGeometry, 150);
      };

      initThree();
      window.addEventListener('resize', onWindowResize);
      if (cardContainerRef.current) {
        const cardElement =
          cardContainerRef.current.querySelector<HTMLElement>('.card');
        if (cardElement) {
          import('vanilla-tilt').then((module) => {
            const VanillaTilt = module.default;
            if (cardElement) {
              VanillaTilt.init(cardElement, {
                max: 10,
                speed: 400,
                glare: true,
                'max-glare': 0.2,
              });
            }
          });
        }
      }
    }

    init();

    return () => {
      isMounted = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      window.removeEventListener('resize', () => {});
    };
  }, [cardId]);

  const buttonLink =
    title === 'Enterprise' ? '#contact' : '/auth?action=signup';

  return (
    <div
      ref={cardContainerRef}
      className={cn('card-container', isFeatured && 'scale-105')}
    >
      <canvas id={cardId} ref={canvasRef} />
      <div
        className="card"
        data-tilt
        data-tilt-max="10"
        data-tilt-speed="400"
        data-tilt-perspective="1000"
        data-tilt-glare
        data-tilt-max-glare="0.2"
      >
        <h2 className="card-title">{title}</h2>
        <p className="card-price">
          {price.match(/^\d+$/) ? (
            <>
              <span className="currency">$</span>
              {price}
              <span className="align-baseline text-3xl">.00</span>
            </>
          ) : (
            price
          )}
          <span className="period">{period}</span>
        </p>
        <p className="card-description">{description}</p>
        <ul className="features-list">
          {features.map((feature, index) => (
            <li key={index}>
              <svg
                className="rotating-disc-svg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="8" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={buttonLink}
          className="cta-button no-underline text-center"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
