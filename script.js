const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

function begin(){
  main.style.animation = "fadeOut 0.3s";
  setTimeout(() => {
    qna.style.animation = "fadeIn 0.3s";
    setTimeout(() => {
      main.classList.add("hidden");
      qna.classList.remove("hidden");
    }, 140)
  }, 140);
}