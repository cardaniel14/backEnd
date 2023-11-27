const modal = document.querySelector(".modal1");
function closeModal() {
  const closeModal1 = document.querySelector(".close-modal");
  closeModal1.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal--show");
  });
}
function openModal() {
  const openModal1 = document.querySelector(".click-open-modal");
  openModal1.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("modal--show");
  });
}
document.getElementById("addBtn").addEventListener("click", function (e) {
  const titulo = document.querySelector('input[name="titulo"]').value;
  const subtitulo = document.querySelector('textarea[name="subtitulo"]').value;
  const cuerpo = document.querySelector('textarea[name="cuerpo"]').value;
  if (titulo.trim() === "" || subtitulo.trim() === "" || cuerpo.trim() === "") {
    e.preventDefault();
    document.getElementById("errorMessage").style.display = "block";
  }
});
const modalModif = document.querySelector(".modalModif");
function closeModal1() {
  const closeModal1 = document.querySelector(".close-modalModif");
  closeModal1.addEventListener("click", (e) => {
    e.preventDefault();
    modalModif.classList.remove("modal--show");
  });
}
function openModal1() {
  const openModal = document.querySelector(".pen");
  console.log(openModal);

  openModal.addEventListener("click", (e) => {
    console.log("eeee", e);
    console.log("novedad id: ", e.dataset.novedad_id);
    e.preventDefault();
    modalModif.classList.add("modal--show");
  });
}
function displayModifyModal(a, b, c) {
  console.log("id :", a);
  console.log("titulo :", b);
  console.log("cuerpo :", c);
  modalModif.classList.add("modal--show");
}
