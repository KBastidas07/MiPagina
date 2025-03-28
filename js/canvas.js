document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("landscapeCanvas");
  if (!canvas) {
      console.error("No se encontró el canvas");
      return;
  }

  const ctx = canvas.getContext("2d");

  // Cielo nocturno
  ctx.fillStyle = "#0b1a33"; // Azul oscuro
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar estrellas aleatorias
  function drawStars(count) {
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < count; i++) {
          let x = Math.random() * canvas.width;
          let y = Math.random() * 150; // Solo en la parte superior
          let size = Math.random() * 2 + 1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
      }
  }
  drawStars(50); // 50 estrellas aleatorias

  // Luna
  ctx.fillStyle = "#fdfd96"; // Amarillo claro
  ctx.beginPath();
  ctx.arc(320, 60, 30, 0, Math.PI * 2);
  ctx.fill();

  // Pequeña sombra en la luna para dar realismo
  ctx.fillStyle = "#cfcf85";
  ctx.beginPath();
  ctx.arc(330, 50, 10, 0, Math.PI * 2);
  ctx.fill();

  // Colinas (con degradado)
  let hillGradient = ctx.createLinearGradient(0, 200, 0, 300);
  hillGradient.addColorStop(0, "#173d20"); // Verde oscuro
  hillGradient.addColorStop(1, "#0b2612"); // Verde más oscuro

  ctx.fillStyle = hillGradient;
  ctx.beginPath();
  ctx.moveTo(0, 220);
  ctx.quadraticCurveTo(100, 170, 200, 220);
  ctx.quadraticCurveTo(300, 270, 400, 220);
  ctx.lineTo(400, 300);
  ctx.lineTo(0, 300);
  ctx.closePath();
  ctx.fill();

  // Árboles
  function drawTree(x, y) {
      // Tronco
      ctx.fillStyle = "#4b2e16";
      ctx.fillRect(x - 5, y, 10, 40);
      // Copa del árbol
      ctx.fillStyle = "#183d1b";
      ctx.beginPath();
      ctx.arc(x, y - 10, 20, 0, Math.PI * 2);
      ctx.fill();
  }

  drawTree(50, 200);
  drawTree(100, 190);
  drawTree(170, 210);
  drawTree(300, 210);
});
