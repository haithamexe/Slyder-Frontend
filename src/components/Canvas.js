import { useEffect, useRef } from "react";
import "../styles/canvas.css";

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 550;
    canvas.height = 750;

    const canvas2 = canvasRef2.current;
    const context2 = canvas2.getContext("2d");
    canvas2.width = 550;
    canvas2.height = 750;

    let frameCount = 0;
    let animationFrameId;

    const gradient = context.createLinearGradient(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "gold");
    gradient.addColorStop(1, "orangered");
    context.fillStyle = "#5976ff";
    // context.fillStyle = "white";
    context.strokeStyle = "white";
    context2.fillStyle = "white";
    context2.strokeStyle = "#95bc29";

    context2.lineWidth = 1;

    const effect = new Effect(canvas, canvas2, context, context2);

    //Our draw came here
    const render = () => {
      frameCount++;
      // draw(context, frameCount);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context2.clearRect(0, 0, canvas2.width, canvas2.height);
      effect.handleParticles(context, context2);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, canvasRef2]);

  class Particle {
    constructor(effect) {
      this.effect = effect;
      this.radius = Math.floor(Math.random() * 40 + 10);
      this.buffer = this.radius * 3;
      this.x =
        this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y =
        this.radius + Math.random() * (this.effect.height - this.radius * 2);
      this.vx = Math.random() * 0.5 - 0.25;
      this.vy = Math.random() * 0.5 - 0.25;
      this.pushX = 0;
      this.pushY = 0;
      this.friction = 0.85;
    }
    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      //context.stroke();
    }
    update() {
      if (this.effect.mouse.pressed) {
        const dx = this.x - this.effect.mouse.x;
        const dy = this.y - this.effect.mouse.y;
        const distance = Math.hypot(dx, dy);
        const force = this.effect.mouse.radius / distance;
        if (distance < this.effect.mouse.radius) {
          const angle = Math.atan2(dy, dx);
          this.pushX += Math.cos(angle) * force;
          this.pushY += Math.sin(angle) * force;
        }
      }

      this.x += (this.pushX *= this.friction) + this.vx;
      this.y += (this.pushY *= this.friction) + this.vy;

      if (this.x < this.buffer) {
        this.x = this.buffer;
        this.vx *= -1;
      } else if (this.x > this.effect.width - this.buffer) {
        this.x = this.effect.width - this.buffer;
        this.vx *= -1;
      }
      if (this.y < this.buffer) {
        this.y = this.buffer;
        this.vy *= -1;
      } else if (this.y > this.effect.height - this.buffer) {
        this.y = this.effect.height - this.buffer;
        this.vy *= -1;
      }
    }
    reset() {
      this.x =
        this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y =
        this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
  }

  class Effect {
    constructor(canvas, canvas2, context, context2) {
      this.canvas = canvas;
      this.canvas2 = canvas2;
      this.context = context;
      this.context2 = context2;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.particles = [];
      this.numberOfParticles = 300;
      this.createParticles();

      this.mouse = {
        x: 0,
        y: 0,
        pressed: false,
        radius: 200,
      };

      // window.addEventListener("resize", (e) => {
      //   this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
      // });
      canvas2.addEventListener("mousemove", (e) => {
        if (this.mouse.pressed) {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
        }
      });
      canvas2.addEventListener("mousedown", (e) => {
        if (
          e.offsetX > 0 &&
          e.offsetX < this.width &&
          e.offsetY > 0 &&
          e.offsetY < this.height
        ) {
          this.mouse.pressed = true;
          this.mouse.x = e.x;
          this.mouse.y = e.y;
        } else {
          this.mouse.pressed = false;
        }
      });
      canvas2.addEventListener("mouseup", (e) => {
        this.mouse.pressed = false;
      });
      // canvas.addEventListener("mousemove", (e) => {
      //   if (this.mouse.pressed) {
      //     this.mouse.x = e.offsetX;
      //     this.mouse.y = e.offsetY;
      //     console.log(this.mouse.x, this.mouse.y, e);
      //   }
      // });
      // canvas.addEventListener("mousedown", (e) => {
      //   this.mouse.pressed = true;
      //   this.mouse.x = e.x;
      //   this.mouse.y = e.y;
      // });
      // canvas.addEventListener("mouseup", (e) => {
      //   this.mouse.pressed = false;
      // });
    }
    createParticles() {
      for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(new Particle(this));
      }
    }
    handleParticles(context, context2) {
      this.connectParticles(context2);
      this.particles.forEach((particle) => {
        particle.draw(context);
        particle.update();
      });
    }
    connectParticles(context) {
      const maxDistance = 80;
      for (let a = 0; a < this.particles.length; a++) {
        for (let b = a; b < this.particles.length; b++) {
          const dx = this.particles[a].x - this.particles[b].x;
          const dy = this.particles[a].y - this.particles[b].y;
          const distance = Math.hypot(dx, dy);
          if (distance < maxDistance) {
            context.save();
            const opacity = 1 - distance / maxDistance;
            context.globalAlpha = opacity;
            context.beginPath();
            context.moveTo(this.particles[a].x, this.particles[a].y);
            context.lineTo(this.particles[b].x, this.particles[b].y);
            context.stroke();
            context.restore();
          }
        }
      }
    }
    // resize(width, height) {
    //   this.canvas.width = width;
    //   this.canvas.height = height;
    //   // this.canvas2.width = width;
    //   // this.canvas2.height = height;
    //   this.width = width;
    //   this.height = height;
    //   // const gradient = this.context.createLinearGradient(0, 0, width, height);
    //   // gradient.addColorStop(0, "white");
    //   // gradient.addColorStop(0.5, "gold");
    //   // gradient.addColorStop(1, "orangered");

    //   this.context.fillStyle = "white";
    //   this.context.strokeStyle = "white";
    //   this.particles.forEach((particle) => {
    //     particle.reset();
    //   });
    // }
  }
  // const effect = new Effect(canvas, ctx);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="canvas1" />
      <canvas ref={canvasRef2} className="canvas2" />
    </div>
  );
};

export default Canvas;
