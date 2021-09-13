window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");
  document.querySelector("#menuknap").addEventListener("click", toggleMenu); //lyt efter klik
}

function toggleMenu() {
  console.log("toggleMenu");
  document.querySelector("#menu").classList.toggle("hidden"); //toggle = fjern og tilføj skiftevis klassen

  let erSkjult = document.querySelector("#menu").classList.contains("hidden"); //erSkjult er når menuen har klassen hidden

  if (erSkjult == true) {
    //hvis det er sandt at menuen er skjult (har klassen hidden) skal dette gøres:
    document.querySelector("#menuknap").textContent = "☰";
  } else {
    //hvis ikke menuen er skjult skal dette gøres:
    document.querySelector("#menuknap").textContent = "X";
  }
}
