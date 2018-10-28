const PubSub = require ("../helpers/pub_sub.js");

const ResultView = function(container) {
  this.container = document.querySelector(container)
};

ResultView.prototype.bindEvents = function () {
  console.log("resultview.prototype.bindevents");
  PubSub.subscribe("Beer:selected", event => {
    const selectedBeer = event.detail;
    console.log(selectedBeer, "ResultBeer");
    this.display(selectedBeer);
  });
};

ResultView.prototype.display = function (beers) {
  this.container.innerHTML = '';
  const allBeers = document.createElement("div")
  beers.forEach((beer) => {

    const beerName = document.createElement("h2")
    beerName.textContent = beer.name;
    allBeers.appendChild(beerName);

    const beerTagline = document.createElement("h3")
    beerTagline.textContent = beer.tagline;
    allBeers.appendChild(beerTagline);

    const beerImage = document.createElement("img");
    beerImage.src = beer.image_url;
    this.container.appendChild(beerImage);

    const beerDescription = document.createElement("p")
    beerDescription.textContent = `Description: ${ beer.description } `;
    allBeers.appendChild(beerDescription);

    const beerABV = document.createElement("p")
    beerABV.textContent = `ABV: ${ beer.abv }% `;
    allBeers.appendChild(beerABV);

    const beerFoodPairing = document.createElement("p")
    beerFoodPairing.textContent = `Food pairing: ${ beer.food_pairing } `
    allBeers.appendChild(beerFoodPairing);
  })

  this.container.appendChild(allBeers)
};

module.exports = ResultView;
