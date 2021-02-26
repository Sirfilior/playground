var panZoom = svgPanZoom("#citySvg");
panZoom.fit();

let b1 = document.getElementsByClassName("building1")[0];
let bt1 = document.getElementsByClassName("building1-text")[0];
let b2 = document.getElementsByClassName("building2")[0];
let bt2 = document.getElementsByClassName("building2-text")[0];
let bp2 = document.getElementsByClassName("building2-path");

let t1 = document.getElementById("t1");
let tc = 0;

b1.addEventListener(
  "mouseenter",
  function (event) {
    bt1.style.display = "block";
  },
  false
);
b1.addEventListener(
  "mouseleave",
  function (event) {
    bt1.style.display = "none";
  },
  false
);

b2.addEventListener(
  "mouseenter",
  function (event) {
    bt2.style.display = "block";
  },
  false
);
b2.addEventListener(
  "mouseleave",
  function (event) {
    bt2.style.display = "none";
  },
  false
);

t1.addEventListener(
  "click",
  function (event) {
    tc += 1;
    for (element of bp2) {
      if (tc % 2 === 0) {
        element.style.opacity = "0";
      } else {
        element.style.opacity = "1";
      }
    }
  },
  false
);
