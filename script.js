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
const header = document.querySelector("header h2");

function start() {
  container = document.querySelector(".data_container");
  temp = document.querySelector("template");

  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerHunde));
  hentData();
}

function filtrerHunde() {
  filter = this.dataset.kategori;
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
    if (filter == dyr.kategori || filter == "alle") {
      const klon = temp.cloneNode(true).content;
      const pic = ".jpg";
      klon.querySelector("img").src = "billeder/" + dyr.billede + pic;
      klon.querySelector("h3").textContent = dyr.navn;
      klon.querySelector(".kortbeskrivelse").textContent = dyr.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "Pris: " + dyr.pris + ",-";
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
    "billeder/" + hundeData.billednavn + "-md.jpg";
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
