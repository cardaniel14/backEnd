const modal = document.querySelector(".modal_");

function closeModal() {
  const btnCloseModal = document.querySelector(".close-modal");
  btnCloseModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal--show");
  });
}
closeModal();
function openModal() {
  const divOpenModal = document.querySelector(".div-open-modal");
  divOpenModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("modal--show");
  });
}
openModal();
function rellenarTodosLosCampos() {
  const btnSubmit = document.getElementById("addBtn");
  const errorMsg = document.getElementById("errorMessage");
  btnSubmit.addEventListener("click", (e) => {
    const titulo = document.querySelector('input[name="titulo"]').value;
    const subtitulo = document.querySelector(
      'textarea[name="subtitulo"]'
    ).value;
    const cuerpo = document.querySelector('textarea[name="cuerpo"]').value;
    if (
      titulo.trim() === "" ||
      subtitulo.trim() === "" ||
      cuerpo.trim() === ""
    ) {
      e.preventDefault();
      errorMsg.style.display = "block";
    }
  });
}
rellenarTodosLosCampos();
