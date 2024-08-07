document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("darkModeToggle");
  const currentTheme = localStorage.getItem("theme") || "light-mode";
  document.body.classList.add(currentTheme);

  if (currentTheme === "dark-mode") {
    toggleSwitch.checked = true;
  }
  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      document.body.classList.replace("light-mode", "dark-mode");
      localStorage.setItem("theme", "dark-mode");
      ball.color = "white";
    } else {
      document.body.classList.replace("dark-mode", "light-mode");
      localStorage.setItem("theme", "light-mode");
      ball.color = "black";
    }
  });
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  class Ball {
    constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    update() {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }
  const ball = new Ball(
    canvas.width / 2,
    canvas.height / 2,
    2,
    2,
    30,
    currentTheme === "dark-mode" ? "white" : "black"
  );
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
  }

  animate();
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  });
});
