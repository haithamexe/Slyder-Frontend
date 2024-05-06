import { useEffect, useRef } from "react";
import "../styles/canvaschat.css";

const CanvasChat = (props) => {
  const {
    numberOfParticlesChanged,
    colorsChangedPri,
    colorChangedSec,
    radiusChanged,
  } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(
      "CanvasChat.js",
      numberOfParticlesChanged,
      colorsChangedPri,
      colorChangedSec,
      radiusChanged
    );
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 500;

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
    context.fillStyle = colorsChangedPri;
    context.strokeStyle = colorChangedSec;

    const effect = new Effect(canvas, context);

    //Our draw came here
    const render = () => {
      frameCount++;
      // draw(context, frameCount);
      // context.clearRect(0, 0, canvas.width, canvas.height);
      // context2.clearRect(0, 0, canvas2.width, canvas2.height);
      // effect.handleParticles(context, context2);
      context.clearRect(0, 0, canvas.width, canvas.height);
      effect.handleParticles(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [
    canvasRef,
    numberOfParticlesChanged,
    colorsChangedPri,
    colorChangedSec,
    radiusChanged,
  ]);

  class Particle {
    constructor(effect, index) {
      this.effect = effect;
      this.index = index;
      this.radius = Math.floor(Math.random() * radiusChanged + 10);
      this.buffer = this.radius * 2;
      this.x =
        this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y =
        this.radius + Math.random() * (this.effect.height - this.radius * 2);
      this.vx = Math.random() * 0.5 - 0.25;
      this.vy = Math.random() * 0.5 - 0.25;
      this.pushX = 0;
      this.pushY = 0;
      this.friction = 0.8;
    }
    draw(context) {
      if (this.index % 5 === 0) {
        context.save();
        context.globalAlpha = 0.4;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.effect.mouse.x, this.effect.mouse.y);
        context.stroke();
        context.restore();
      }
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      // context.stroke();
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
    constructor(canvas, context) {
      this.canvas = canvas;
      this.context = context;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.particles = [];
      this.numberOfParticles = numberOfParticlesChanged;
      this.createParticles();

      this.mouse = {
        x: this.width / 2,
        y: this.height / 2,
        pressed: false,
        radius: 120,
      };

      // window.addEventListener("resize", (e) => {
      //   this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
      // });
      canvas.addEventListener("mousemove", (e) => {
        if (this.mouse.pressed) {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
        }
      });
      canvas.addEventListener("mousedown", (e) => {
        this.mouse.pressed = true;
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });
      canvas.addEventListener("mouseup", (e) => {
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
        this.particles.push(new Particle(this, i));
      }
    }
    handleParticles(context) {
      this.connectParticles(context);

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
    <div className="canvas-container-chat">
      <canvas ref={canvasRef} className="canvasChat" />
    </div>
  );
};

export default CanvasChat;
