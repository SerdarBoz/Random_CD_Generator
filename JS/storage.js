const STORAGE_KEY = "cds";

export function getAllCds() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveCds(cds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cds));
}

export function addNewCd(artist, album, coverBase64) {
  const newCd = {
    id: Date.now(),
    artist,
    album,
    cover: coverBase64,
    addedDate: new Date().toISOString(),
    active: true
  };

  const cds = getAllCds();
  cds.push(newCd);
  saveCds(cds);
}

export function deleteCd(cdId) {
  const cds = getAllCds().filter(cd => cd.id !== cdId);
  saveCds(cds);
}

export function toggleCdActiveStatus(cdId) {
  const cds = getAllCds();
  const updatedCds = cds.map(cd => {
    if (cd.id === cdId) {
      return { ...cd, active: !cd.active };
    }
    return cd;
  });
  saveCds(updatedCds);
}

export function getActiveCds() {
  const cds = getAllCds();
  return cds.filter(cd => cd.active);
}