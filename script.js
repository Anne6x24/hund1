const url = "https://hunde-e58a.restdb.io/rest/hunde";

const options = {
  headers: {
    "x-apikey": "6139d6f343cedb6d1f97eec8",
  },
};

document.addEventListener("DOMContentLoaded", start);
let madretter;
let container;
let temp;
let filter = "alle";
const header = document.querySelector("header h2");

function start() {
  container = document.querySelector(".data_container");
  temp = document.querySelector("template");

  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerMadretter)
  );
  hentData();
}

function filtrerMadretter() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visMad();
  header.textContent = this.textContent;
}

async function hentData() {
  const resspons = await fetch(url, options);
  madretter = await resspons.json();
  visMad();
}

function visMad() {
  container.textContent = "";

  madretter.forEach((madret) => {
    if (filter == madret.kategori || filter == "alle") {
      const klon = temp.cloneNode(true).content;
      const md = "-md.jpg";
      klon.querySelector("img").src = "billeder/" + madret.billednavn + md;
      klon.querySelector("h3").textContent = madret.navn;
      klon.querySelector(".kortbeskrivelse").textContent =
        madret.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "Pris: " + madret.pris + ",-";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(madret));
      container.appendChild(klon);
    }
  });
}

function visDetaljer(madData) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector(".billedep").src =
    "billeder/" + madData.billednavn + "-md.jpg";
  popup.querySelector("h2").textContent = madData.navn;
  popup.querySelector(".langbeskrivelse").textContent = madData.langbeskrivelse;
  popup.querySelector(".pris").textContent = "Pris: " + madData.pris + ",-";
  console.log(madData);
}

document.querySelector("#tilbage").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

hentData();
