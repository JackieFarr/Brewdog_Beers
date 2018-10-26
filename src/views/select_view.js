const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js");

const SelectView = function(element){
  this.element = element;
};

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe("Beers:beers-ready", (event) =>
  {
    const allBeers = event.detail;
    this.populate(allBeers)
    console.log(allBeers, "allBeers");
  })

  this.element.addEventListener("change", (event) => {
    const selectedBeer= event.target.value;
    console.log(selectedBeer, "selected beer");
    PubSub.publish("SelectView:change", selectedBeer)
  })
};

SelectView.prototype.populate = function (data){
  const beers = data.map(beer => beer.name)
  .filter((name, index, names) => names.indexOf(name) === index);
      beers.forEach((name) => {
    const option = document.createElement("option");
    option.textContent = name;
    option.value = name;
    this.element.appendChild(option);
  })
};

module.exports = SelectView;
