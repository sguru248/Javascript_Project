"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

////////////////////////////////////////////////

//using Geolocation API with Asyn / Await

const getPosition = async function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//RenderCountry function
const renderCountry = function (data, classname = "") {
  console.log(data);

  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];

  const currency = Object.values(data.currencies)[0].name;

  const html = `
              <article class="country  ${classname}">
                <img class="country__img" src=${flag} />
                <div class="country__data">
                  <h3 class="country__name">${name}</h3>
                  <h4 class="country__region">${region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                  ).toFixed(1)} people</p>
                  <p class="country__row"><span>🗣️</span>${language}</p>
                  <p class="country__row"><span>💰</span>${currency}</p>
                </div>
              </article>
        `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

//__MAIN Function_//
const whereAmI = async function () {
  // 1.) Geolocation API using Await
  const position = await getPosition();
  const { latitude, longitude } = position;

  // 2.) fetch()API using Await (Reverse Geocoding API)
  const res1 = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  const data1 = await res1.json();
  const country = data1.countryName;

  // 3.) fetch()API using Await (REST Country API)
  const res2 = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data2 = await res2.json();
  console.log(data2);

  renderCountry(data2[0]);
};

btn.addEventListener("click", whereAmI);
