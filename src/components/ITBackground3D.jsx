import React, { useEffect, useRef } from 'react';

const ITBackground3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // 3D floating geometric shapes
    const shapes = [];
    const shapeTypes = ['cube', 'pyramid', 'ring', 'triangle'];
    for (let i = 0; i < 18; i++) {
      shapes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 3, // spread across scrollable area
        z: Math.random() * 400 + 100,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        rotation: Math.random() * Math.PI * 2,
        size: Math.random() * 25 + 10,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        opacity: Math.random() * 0.3 + 0.05,
        drift: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Floating particles
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 3,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Connection lines between nearby shapes
    const drawConnections = () => {
      const scrollY = window.scrollY;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const a = shapes[i];
          const b = shapes[j];
          const ay = a.y - scrollY;
          const by = b.y - scrollY;
          const dist = Math.sqrt((a.x - b.x) ** 2 + (ay - by) ** 2);
          if (dist < 250) {
            const alpha = (1 - dist / 250) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, by);
            ctx.strokeStyle = `rgba(76, 175, 80, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Draw 3D wireframe shapes
    const drawShape = (shape, scrollY) => {
      const screenY = shape.y - scrollY;
      if (screenY < -100 || screenY > window.innerHeight + 100) return;

      const parallaxX = (mouse.x - window.innerWidth / 2) * 0.01;
      const parallaxY = (mouse.y - window.innerHeight / 2) * 0.01;
      const sx = shape.x + parallaxX + Math.sin(time * 0.001 + shape.phase) * shape.drift * 30;
      const sy = screenY + parallaxY + Math.cos(time * 0.0015 + shape.phase) * shape.drift * 20;

      const r = shape.rotation + time * shape.rotSpeed;
      const s = shape.size;
      const color = `rgba(76, 175, 80, ${shape.opacity})`;
      const blueColor = `rgba(30, 136, 229, ${shape.opacity * 0.7})`;

      ctx.strokeStyle = shape.type === 'cube' ? blueColor : color;
      ctx.lineWidth = 1;

      if (shape.type === 'cube') {
        // 3D rotating cube
        const points3D = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
        ];
        const projected = points3D.map(([x, y, z]) => {
          const rx = x * Math.cos(r) - z * Math.sin(r);
          const rz = x * Math.sin(r) + z * Math.cos(r);
          const ry = y * Math.cos(r * 0.7) - rz * Math.sin(r * 0.7);
          const fz = y * Math.sin(r * 0.7) + rz * Math.cos(r * 0.7);
          const scale = 200 / (200 + fz * s);
          return [sx + rx * s * scale, sy + ry * s * scale];
        });
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
        ];
        edges.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(projected[a][0], projected[a][1]);
          ctx.lineTo(projected[b][0], projected[b][1]);
          ctx.stroke();
        });
      } else if (shape.type === 'pyramid') {
        const points3D = [
          [0, -1, 0], [-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1],
        ];
        const projected = points3D.map(([x, y, z]) => {
          const rx = x * Math.cos(r) - z * Math.sin(r);
          const rz = x * Math.sin(r) + z * Math.cos(r);
          const ry = y * Math.cos(r * 0.5) - rz * Math.sin(r * 0.5);
          const fz = y * Math.sin(r * 0.5) + rz * Math.cos(r * 0.5);
          const scale = 200 / (200 + fz * s);
          return [sx + rx * s * scale, sy + ry * s * scale];
        });
        const edges = [
          [0, 1], [0, 2], [0, 3], [0, 4],
          [1, 2], [2, 3], [3, 4], [4, 1],
        ];
        edges.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(projected[a][0], projected[a][1]);
          ctx.lineTo(projected[b][0], projected[b][1]);
          ctx.stroke();
        });
      } else if (shape.type === 'ring') {
        const pts = 20;
        for (let i = 0; i < pts; i++) {
          const a1 = (i / pts) * Math.PI * 2 + r;
          const a2 = ((i + 1) / pts) * Math.PI * 2 + r;
          const x1 = sx + Math.cos(a1) * s;
          const y1 = sy + Math.sin(a1) * s * Math.cos(r * 0.5);
          const x2 = sx + Math.cos(a2) * s;
          const y2 = sy + Math.sin(a2) * s * Math.cos(r * 0.5);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      } else if (shape.type === 'triangle') {
        const projected = [];
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2 + r - Math.PI / 2;
          projected.push([sx + Math.cos(a) * s, sy + Math.sin(a) * s]);
        }
        ctx.beginPath();
        ctx.moveTo(projected[0][0], projected[0][1]);
        ctx.lineTo(projected[1][0], projected[1][1]);
        ctx.lineTo(projected[2][0], projected[2][1]);
        ctx.closePath();
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = window.scrollY;
      time++;

      // Draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) p.y = window.innerHeight * 3;
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;

        const screenY = p.y - scrollY;
        if (screenY > -10 && screenY < window.innerHeight + 10) {
          const parallaxX = (mouse.x - window.innerWidth / 2) * 0.005;
          ctx.beginPath();
          ctx.arc(p.x + parallaxX, screenY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(76, 175, 80, ${p.opacity})`;
          ctx.fill();
        }
      });

      // Draw connections
      drawConnections();

      // Draw shapes
      shapes.forEach((shape) => {
        shape.rotation += shape.rotSpeed;
        drawShape(shape, scrollY);
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ITBackground3D;
