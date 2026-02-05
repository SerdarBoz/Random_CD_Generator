import { getAllCds, deleteCd, toggleCdActiveStatus } from "./storage.js";

export function displayAllCDs() {
  const container = document.getElementById("cdListContainer");
  if (!container) return;

  const cds = getAllCds();

  if (cds.length === 0) {
    container.innerHTML = "<p>No CDs added yet.</p>";
    return;
  }

  container.innerHTML = cds.map(cd => `
     <div class="cd-item ${cd.active ? 'active' : 'inactive'}">
      <h3>${cd.artist} – ${cd.album}</h3>
      ${cd.cover ? `<img src="${cd.cover}" width="100">` : ""}
      <div class="cd-controls">
        <button class="toggle-btn ${cd.active ? 'active' : 'inactive'}" 
                data-id="${cd.id}">
          ${cd.active ? '✅ Active' : '❌ Inactive'}
        </button>
        <button class="delete-btn" data-id="${cd.id}">
          Delete
        </button>
      </div>
    </div>
  `).join("");
}

export function setupDeleteHandler() {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const cdId = Number(event.target.dataset.id);
      if (confirm("Are you sure you want to delete this CD?")) {
        deleteCd(cdId);
        displayAllCDs();
      }
    }

    if (event.target.classList.contains("toggle-btn")) {
      const cdId = Number(event.target.dataset.id);
      toggleCdActiveStatus(cdId);
      displayAllCDs();
    }
  });
}