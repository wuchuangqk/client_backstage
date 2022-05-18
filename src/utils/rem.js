(function flexible(window, document) {
  let docEl = document.documentElement;
  let dpr = window.devicePixelRatio || 1;
  let setBodyFontSize = () => {
    if (document.body) {
      document.body.style.fontSize = `16px`
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();
  let setRemUnit = () => {
    var rem = docEl.clientWidth / 24;
    docEl.style.fontSize = `${rem}px`
  }
  setRemUnit();
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", e => {
    if (e.persisted) {
      setRemUnit();
    }
  });
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);