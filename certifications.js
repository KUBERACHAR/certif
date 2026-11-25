// Certifications viewer: opens the clicked card in the modal.
const cards = document.querySelectorAll(".cert-card");
const modal = document.getElementById("certModal");
const link = document.getElementById("certModalLink");
let current = 0;

function show(i) {
  current = (i + cards.length) % cards.length;
  const card = cards[current];
  document.getElementById("certModalImg").src = card.querySelector("img").src;
  document.getElementById("certModalTitle").textContent = card.querySelector(".cert-card__title").textContent;
  document.getElementById("certModalMeta").textContent =
    card.querySelector(".cert-card__issuer").textContent + " • " + card.querySelector(".cert-card__date").textContent;
  document.getElementById("certModalDesc").textContent = card.querySelector(".cert-card__desc").textContent;
  link.href = card.dataset.link;
  link.style.display = card.dataset.link ? "" : "none";
  modal.classList.add("is-open");
}

function closeModal() {
  modal.classList.remove("is-open");
}

cards.forEach((card, i) => card.querySelectorAll("button").forEach((btn) => (btn.onclick = () => show(i))));
modal.querySelectorAll("[data-close]").forEach((el) => (el.onclick = closeModal));
modal.querySelector(".cert-modal__nav--prev").onclick = () => show(current - 1);
modal.querySelector(".cert-modal__nav--next").onclick = () => show(current + 1);

document.onkeydown = (e) => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
};
