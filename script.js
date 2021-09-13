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
  //console.log(hunde);
  visHund();
}

function visHund() {
  container.textContent = "";
  console.log(filter);
  hunde.forEach((dyr) => {
    //  console.log(dyr.talent);
    if (filter == dyr.talent || filter == "alle") {
      const klon = temp.cloneNode(true).content;
      const pic = ".jpg";
      klon.querySelector("img").src = "billeder/" + dyr.billede + pic;
      klon.querySelector("h3").textContent = dyr.navn;
      klon.querySelector(".alder").textContent = "Alder: " + dyr.alder;
      klon.querySelector(".race").textContent = "Race: " + dyr.race;
      klon.querySelector(".talent").textContent = "Talent: " + dyr.talent;
      klon
        .querySelector(".quickview")
        .addEventListener("click", () => visDetaljer(dyr));

      klon.querySelector(".detaljer").addEventListener("click", () => {
        location.href = "singleview.html?id=" + dyr._id;
      });

      container.appendChild(klon);
    }
  });
}

function visDetaljer(hundeData) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector(".billede").src =
    "billeder/" + hundeData.billede + ".jpg";
  popup.querySelector("h3").textContent = hundeData.navn;
  popup.querySelector(".alder").textContent = hundeData.alder;
  popup.querySelector(".race").textContent = hundeData.race;
  popup.querySelector(".talent").textContent = hundeData.talent;
  popup.querySelector(".kortbeskrivelse").textContent =
    hundeData.kortbeskrivelse;
  popup.querySelector(".pris").textContent = hundeData.pris + ",-";
  //console.log(hundeData);
}

document.querySelector("#tilbage").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

hentData();
