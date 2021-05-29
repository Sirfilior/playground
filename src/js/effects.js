var x = 0;
let textelements = document.getElementsByClassName("showtext");
let steps = document.getElementsByClassName("step");
let lastScroll = 0;

textelements[0].classList.add("show");
var interval = setInterval(function () {
  // Your logic here
  switch (++x) {
    case 4:
      textelements[0].classList.add("hide");
      break;
    case 6:
      textelements[0].classList.remove("show");
      steps[0].classList.remove("active");
      textelements[1].classList.add("show");
      steps[1].classList.add("active");
      break;
    case 10:
      textelements[1].classList.add("hide");
      break;
    case 12:
      textelements[1].classList.remove("show");
      steps[1].classList.remove("active");
      textelements[2].classList.add("show");
      steps[2].classList.add("active");
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

document.addEventListener('scroll', function (e) {
  let scrollUp = lastScroll > window.scrollY;
  if (scrollUp) {
    document.getElementById("jsHeader").classList.add("scrolled");
  } else {
    document.getElementById("jsHeader").classList.remove("scrolled");
  }
  if (window.scrollY > 0) {
    document.getElementById("jsHeader").classList.remove("attop");
  } else {
    document.getElementById("jsHeader").classList.add("attop");
  }
  lastScroll = window.scrollY;
});