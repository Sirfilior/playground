var x = 0;
let textelements = document.getElementsByClassName("showtext");
textelements[0].classList.add("show");
var interval = setInterval(function () {
  // Your logic here
  switch (++x) {
    case 4:
      textelements[0].classList.add("hide");
      break;
    case 6:
      textelements[0].classList.remove("show");
      textelements[1].classList.add("show");
      break;
    case 10:
      textelements[1].classList.add("hide");
      break;
    case 12:
      textelements[1].classList.remove("show");
      textelements[2].classList.add("show");
      window.clearInterval(interval);
      break;
    default:
      break;
  }
}, 1000);

document.getElementById("jsscroll").addEventListener(
  "click",
  function () {
    let nextSection = document.getElementById("next");
    nextSection.scrollIntoView({ behavior: "smooth", block: "end" });
  },
  false
);
