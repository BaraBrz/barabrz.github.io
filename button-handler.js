const btn = document.getElementById("ThemeBtn");
const btn2 = document.getElementById("ThemeBtn2");

if (btn) {
    btn.addEventListener("click", () => {
      handleThemeBtnClick("Logo bylo kliknuto");
    });
  }

 if (btn2) {
    btn2.addEventListener("click", () => {
      handleThemeBtnClick("Logo bylo kliknuto");
    });
  } 

