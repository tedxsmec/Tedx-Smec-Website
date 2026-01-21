import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const isPointerRef = useRef(false);
  const isHiddenRef = useRef(false);
  const isClickedRef = useRef(false);
  const echoSegments = useRef([]);
  const mouse = useRef({ 
    x: 0, 
    y: 0, 
    targetX: 0, 
    targetY: 0,
    velocityX: 0,
    velocityY: 0,
  });
  const morphProgress = useRef(0);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Echo segment class for click effect
    class EchoSegment {
      constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.length = 0;
        this.maxLength = 25;
        this.life = 1;
        this.expandSpeed = 1.2;
        this.decaySpeed = 0.04;
      }

      update() {
        if (this.length < this.maxLength) {
          this.length += this.expandSpeed;
        } else {
          this.life -= this.decaySpeed;
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        ctx.strokeStyle = `rgba(211, 0, 36, ${this.life})`;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        const endX = this.x + Math.cos(this.angle) * this.length;
        const endY = this.y + Math.sin(this.angle) * this.length;
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const prevTargetX = mouse.current.targetX;
      const prevTargetY = mouse.current.targetY;
      
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;

      mouse.current.velocityX = mouse.current.targetX - prevTargetX;
      mouse.current.velocityY = mouse.current.targetY - prevTargetY;

      // Check for clickable elements
      const target = e.target.closest('a, button, input, textarea, [role="button"]') || e.target;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';

      isPointerRef.current = isClickable;
    };

    // Click handler for echo effect
    const handleMouseDown = (e) => {
      isClickedRef.current = true;
      
      // Create echo segments in an X pattern
      const angles = [
        Math.PI / 4,        // top-left to bottom-right
        -Math.PI / 4,       // top-right to bottom-left
        -Math.PI / 4 - Math.PI, // opposite to first
        Math.PI / 4 + Math.PI   // opposite to second
      ];

      angles.forEach(angle => {
        echoSegments.current.push(new EchoSegment(e.clientX, e.clientY, angle));
      });

      setTimeout(() => { isClickedRef.current = false; }, 300);
    };

    const handleMouseEnter = () => { isHiddenRef.current = false; };
    const handleMouseLeave = () => { isHiddenRef.current = true; };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor movement
      const easing = 0.18;
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * easing;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * easing;

      const { x, y } = mouse.current;
      const time = Date.now() * 0.001;

      // Morph progress based on hover state
      if (isPointerRef.current && morphProgress.current < 1) {
        morphProgress.current += 0.08;
      } else if (!isPointerRef.current && morphProgress.current > 0) {
        morphProgress.current -= 0.08;
      }
      morphProgress.current = Math.max(0, Math.min(1, morphProgress.current));

      ctx.save();
      ctx.globalAlpha = isHiddenRef.current ? 0 : 1;

      // Glow effect - subtle and refined
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(211, 0, 36, 0.4)`;

      // BASE DOT STATE (0% morph)
      const dotRadius = 6;
      const dotOpacity = 1 - morphProgress.current * 0.3;

      ctx.strokeStyle = `rgba(211, 0, 36, ${0.6 * dotOpacity})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x, y, dotRadius + 2, 0, Math.PI * 2);
      ctx.stroke();

      // Main dot with gradient
      const gradient = ctx.createRadialGradient(x - 1, y - 1, 0, x, y, dotRadius);
      gradient.addColorStop(0, `rgba(211, 0, 36, ${0.9 * dotOpacity})`);
      gradient.addColorStop(1, `rgba(211, 0, 36, ${0.4 * dotOpacity})`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing center dot
      const pulse = 2 + Math.sin(time * 2.5) * 0.8;
      ctx.fillStyle = `rgba(255, 0, 40, ${dotOpacity})`;
      ctx.beginPath();
      ctx.arc(x, y, pulse, 0, Math.PI * 2);
      ctx.fill();

      // X MORPHED STATE (100% morph)
      if (morphProgress.current > 0.1) {
        const xSize = 8 + morphProgress.current * 4;
        const xOpacity = morphProgress.current;

        ctx.strokeStyle = `rgba(211, 0, 36, ${0.95 * xOpacity})`;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.save();
        ctx.translate(x, y);
        
        // Slow subtle rotation
        ctx.rotate(time * 0.15 * morphProgress.current);

        // Draw refined X with smooth lines
        ctx.beginPath();
        ctx.moveTo(-xSize, -xSize);
        ctx.lineTo(xSize, xSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xSize, -xSize);
        ctx.lineTo(-xSize, xSize);
        ctx.stroke();

        ctx.restore();

        // Accent ring around X
        const ringRadius = xSize + 3 + Math.sin(time * 3) * 1;
        ctx.strokeStyle = `rgba(211, 0, 36, ${0.35 * xOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Animated center point
        const centerPulse = 2 + Math.sin(time * 2) * 0.6;
        ctx.fillStyle = `rgba(255, 0, 40, ${xOpacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(x, y, centerPulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw echo segments on click
      echoSegments.current = echoSegments.current.filter(segment => {
        segment.update();
        segment.draw(ctx);
        return segment.life > 0;
      });

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="custom-cursor-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
