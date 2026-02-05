import { addNewCd } from "./storage.js";
import { displayAllCDs, setupDeleteHandler } from "./ui.js";
import { setupRandomCdButton } from "./random.js";

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("cdListContainer")) {
    displayAllCDs();
    setupDeleteHandler();
  }

  const submitBtn = document.getElementById("SubmitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const artist = document.getElementById("artist").value.trim();
      const album = document.getElementById("album").value.trim();
      const coverInput = document.getElementById("album_cover");

      if (!artist || !album) {
        alert("Artist and album are required.");
        return;
      }

      const file = coverInput.files[0];

      if (file && !file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          addNewCd(artist, album, reader.result);
          window.location.href = "index.html";
        };
        reader.readAsDataURL(file);
      } else {
        addNewCd(artist, album, null);
        window.location.href = "index.html";
      }
    });
  }

  setupRandomCdButton();
});
