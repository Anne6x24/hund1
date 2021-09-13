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
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerHunde)); //lyt efter klik

  hentData(); //JSON data
}

function filtrerHunde() {
  filter = this.dataset.talent; //vi henter information til hvad filteret er.
  document.querySelector(".valgt").classList.remove("valgt"); //vi fjerner klassen for at den kan tilføjes (der kan klikkes) igen.
  this.classList.add("valgt");

  visHund();
  header.textContent = this.textContent; //vores overskrift i filteret
}

async function hentData() {
  const resspons = await fetch(url, options); //vi henter vores JSON data.
  hunde = await resspons.json();
  //console.log(hunde);
  visHund();
}

function visHund() {
  container.textContent = ""; //vi tømmer vores container med data for at vi kan klikke og filtrere igen.
  console.log(filter);
  hunde.forEach((dyr) => {
    //  console.log(dyr.talent);
    if (filter == dyr.talent || filter == "alle") {
      //hvis filter er lig med dyr.talent eller filter er lig med "alle" skal dettes gøres:
      const klon = temp.cloneNode(true).content; //vores template skal klones
      const pic = ".jpg";
      klon.querySelector("img").src = "billeder/" + dyr.billede + pic; //billedet i template - sæt data fra JSON ind.
      klon.querySelector("h3").textContent = dyr.navn;
      klon.querySelector(".alder").textContent = "Alder: " + dyr.alder;
      klon.querySelector(".race").textContent = "Race: " + dyr.race;
      klon.querySelector(".talent").textContent = "Talent: " + dyr.talent;
      klon
        .querySelector(".quickview")
        .addEventListener("click", () => visDetaljer(dyr)); //lyt efter klik

      klon.querySelector(".detaljer").addEventListener("click", () => {
        //lyt efter klik og i stedet for function skal vi sendes videre til location.
        location.href = "singleview.html?id=" + dyr._id;
      });

      container.appendChild(klon); //afslutning på kloning
    }
  });
}

function visDetaljer(hundeData) {
  //samme princip som visHund
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

document.querySelector("#tilbage").addEventListener("click", lukPopup); //lyt efter klik

function lukPopup() {
  document.querySelector("#popup").style.display = "none"; //fjerner popup
}

hentData(); //JSON data
