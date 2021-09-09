window.addEventListener("load", sidenVises);

function sidenVises() {
  console.log("sidenVises");
  document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

function toggleMenu() {
  console.log("toggleMenu");
  document.querySelector("#menu").classList.toggle("hidden");

  let erSkjult = document.querySelector("#menu").classList.contains("hidden");

  if (erSkjult == true) {
    document.querySelector("#menuknap").textContent = "☰";
  } else {
    document.querySelector("#menuknap").textContent = "X";
  }
}

const url = "https://hunde-e58a.restdb.io/rest/hunde";

const options = {
  headers: {
    "x-apikey": "6139d6f343cedb6d1f97eec8",
  },
};

document.addEventListener("DOMContentLoaded", start);
let hunde;
let container;
let temp;
let filter = "alle";
const header = document.querySelector(".filtermenu h2");

function start() {
  container = document.querySelector(".data_container");
  temp = document.querySelector("template");

  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerHunde));
  hentData();
}

function filtrerHunde() {
  filter = this.dataset.talent;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visHund();
  header.textContent = this.textContent;
}

async function hentData() {
  const resspons = await fetch(url, options);
  hunde = await resspons.json();
  visHund();
}

function visHund() {
  container.textContent = "";

  hunde.forEach((dyr) => {
    if (filter == dyr.talent || filter == "alle") {
      const klon = temp.cloneNode(true).content;
      const pic = ".jpg";
      klon.querySelector("img").src = "billeder/" + dyr.billede + pic;
      klon.querySelector("h3").textContent = dyr.navn;
      klon.querySelector(".alder").textContent = "Alder: " + dyr.alder;
      klon.querySelector(".race").textContent = "Race: " + dyr.race;
      klon.querySelector(".talent").textContent = "Talent: " + dyr.talent;
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(dyr));
      container.appendChild(klon);
    }
  });
}

function visDetaljer(hundeData) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector(".billedep").src =
    "billeder/" + hundeData.billednavn + ".jpg";
  popup.querySelector("h2").textContent = hundeData.navn;
  popup.querySelector(".langbeskrivelse").textContent =
    hundeData.langbeskrivelse;
  popup.querySelector(".pris").textContent = "Pris: " + hundeData.pris + ",-";
  console.log(hundeData);
}

document.querySelector("#tilbage").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

hentData();
