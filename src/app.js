const SelectView = require('./views/select_view.js');
const Beers = require("./models/beers.js");
const ErrorView = require("./views/error_view.js");

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const info = document.querySelector("#beers");
  const selectView = new SelectView(info);
  selectView.bindEvents();

  const beerData = new Beers()
  beerData.getData()

  const beers = document.querySelector("div#beer-selected")
  const errorView = new ErrorView(beers);
    errorView.bindEvents();
})
