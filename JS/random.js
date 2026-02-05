import { getActiveCds } from "./storage.js";

export function getRandomCd() {
  const activeCds = getActiveCds();
  if (activeCds.length === 0) return null;

  const index = Math.floor(Math.random() * activeCds.length);
  return activeCds[index];
}

export function setupRandomCdButton() {
  const btn = document.getElementById("RandomCdBtn");
  const display = document.getElementById("RandomCdDisplay");

  if (!btn || !display) return;

  btn.addEventListener("click", () => {
    display.innerHTML = "";

    const cd = getRandomCd();
    if (!cd) {
      display.innerHTML = "<p>No active CDs available.</p>";
      return;
    }

    display.innerHTML = `
      <h2>${cd.artist} – ${cd.album}</h2>
      ${cd.cover ? `<img src="${cd.cover}" style="max-width:200px;">` : ""}
    `;
  });
}