import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './PaperCrumple.css';

interface PaperCrumpleProps {
  imageSrc: string;
  altText?: string;
  maxCrumpleAmount?: number;
  restoreDuration?: number; // ms to restore
  dragTilt?: number; // degrees
  className?: string;
}

export const PaperCrumple: React.FC<PaperCrumpleProps> = ({
  imageSrc,
  altText = 'Portrait',
  maxCrumpleAmount = 0.85,
  restoreDuration = 600,
  dragTilt = 18,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported for PaperCrumple, using image fallback', e);
      setUseFallback(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.6;

    // Lighting for paper folds and creases
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffe8c2, 1.2);
    dirLight1.position.set(-2, 3, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xaac8ff, 0.4);
    dirLight2.position.set(3, -2, 2);
    scene.add(dirLight2);

    // Plane geometry with resolution for creases
    const planeW = 2.0;
    const planeH = 2.65;
    const segmentsX = 48;
    const segmentsY = 64;
    const geometry = new THREE.PlaneGeometry(planeW, planeH, segmentsX, segmentsY);

    // Cache original vertex positions
    const posAttr = geometry.attributes.position;
    const vertexCount = posAttr.count;
    const origPositions = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount * 3; i++) {
      origPositions[i] = posAttr.array[i];
    }

    let mesh: THREE.Mesh | null = null;
    let animationId: number;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageSrc,
      (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.55,
          metalness: 0.05,
          side: THREE.DoubleSide,
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        resize();
      },
      undefined,
      (err) => {
        console.warn('Failed to load texture for PaperCrumple', err);
        setUseFallback(true);
      }
    );

    // Responsive resize
    const resize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    window.addEventListener('resize', resize);

    // Interaction state
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentCrumple = 0;
    let targetCrumple = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let targetPosX = 0;
    let targetPosY = 0;
    let currentPosX = 0;
    let currentPosY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      startX = e.clientX;
      startY = e.clientY;
      container.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Crumple amount grows smoothly up to maxCrumpleAmount
      const normalizedDist = Math.min(dist / 160, 1.0);
      targetCrumple = normalizedDist * maxCrumpleAmount;

      // Subtle tilt in radians
      const maxTiltRad = (dragTilt * Math.PI) / 180;
      targetTiltY = (dx / 150) * maxTiltRad;
      targetTiltX = (-dy / 150) * maxTiltRad;

      // Slight translational displacement
      targetPosX = (dx / 300) * 0.35;
      targetPosY = (-dy / 300) * 0.35;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      setIsInteracting(false);
      // Restore flat and return to origin
      targetCrumple = 0;
      targetTiltX = 0;
      targetTiltY = 0;
      targetPosX = 0;
      targetPosY = 0;
      try {
        container.releasePointerCapture?.(e.pointerId);
      } catch {
        // ignore
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    // Render loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth lerp to target values
      const lerpSpeed = isDragging ? 0.14 : 0.09;
      currentCrumple += (targetCrumple - currentCrumple) * lerpSpeed;
      currentTiltX += (targetTiltX - currentTiltX) * lerpSpeed;
      currentTiltY += (targetTiltY - currentTiltY) * lerpSpeed;
      currentPosX += (targetPosX - currentPosX) * lerpSpeed;
      currentPosY += (targetPosY - currentPosY) * lerpSpeed;

      if (mesh) {
        mesh.rotation.x = currentTiltX;
        mesh.rotation.y = currentTiltY;
        mesh.position.x = currentPosX;
        mesh.position.y = currentPosY;

        // Apply procedural paper wrinkling to geometry
        const positions = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < vertexCount; i++) {
          const idx = i * 3;
          const ox = origPositions[idx];
          const oy = origPositions[idx + 1];
          const oz = origPositions[idx + 2];

          if (currentCrumple > 0.001) {
            // Organic multi-harmonic fold function
            const fold1 = Math.sin(ox * 4.5 + oy * 3.2) * Math.cos(ox * 2.8 - oy * 4.1);
            const fold2 = Math.sin(Math.abs(ox * 7.0 - oy * 5.0)) * 0.45;
            const fold3 = Math.cos(ox * 9.2 + oy * 8.0) * 0.25;

            // Crease height displacement along Z
            const zDisp = (fold1 + fold2 + fold3) * currentCrumple * 0.42;

            // Lateral paper shrinkage
            const shrink = 1 - currentCrumple * 0.08;

            positions[idx] = ox * shrink;
            positions[idx + 1] = oy * shrink;
            positions[idx + 2] = oz + zDisp;
          } else {
            // Fully restored
            positions[idx] = ox;
            positions[idx + 1] = oy;
            positions[idx + 2] = oz;
          }
        }

        geometry.attributes.position.needsUpdate = true;
        if (currentCrumple > 0.001) {
          geometry.computeVertexNormals();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
      renderer.dispose();
      geometry.dispose();
    };
  }, [imageSrc, maxCrumpleAmount, restoreDuration, dragTilt]);

  if (useFallback) {
    return (
      <div className={`paper-crumple-wrapper ${className}`}>
        <img
          src={imageSrc}
          alt={altText}
          className="paper-crumple-fallback"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`paper-crumple-wrapper ${className}`}
      title="Click & drag to interactively crumple the photo — releases to restore"
    >
      <canvas ref={canvasRef} className="paper-crumple-canvas" />
      <div
        className="paper-crumple-hint"
        style={{ opacity: isInteracting ? 0 : 0.85 }}
      >
        ✦ Drag or hold photo to crumple
      </div>
    </div>
  );
};

export default PaperCrumple;
