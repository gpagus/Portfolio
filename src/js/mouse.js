// Cursor personalizado
const cursor = document.getElementById("cursor");
const cursorTrail = document.getElementById("cursor-trail");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorTrail.style.left = e.clientX - 4 + "px";
    cursorTrail.style.top = e.clientY - 4 + "px";
  }, 100);
});

document.addEventListener("mousedown", () => {
  cursor.classList.add("scale-150");
  cursorTrail.classList.remove("scale-150");
});
document.addEventListener("mouseup", () => {
  cursor.classList.remove("scale-150");
  cursorTrail.classList.remove("scale-150");
});
