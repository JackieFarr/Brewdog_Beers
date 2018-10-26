const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js");
const ResultView = require ("../views/result_view.js");

const Beers = function(){
  this.data = null;
}

Beers.prototype.getData = function (beerData) {
  const url = `https://api.punkapi.com/v2/beers`
  const request = new RequestHelper(url);
  request.get()
  .then((data) => {
    this.data = data;
    console.log(this.data, "data");
    PubSub.publish("Beers:beers-ready", data);
  })
  .catch((error) => {
    PubSub.publish("Beers:error", error);
  });
  PubSub.subscribe("SelectView:change", (event) => {
    const selectedName = event.detail;
    this.publishBeer(selectedName);
  });
}

Beers.prototype.publishBeer = function (name){
  const resultView = new ResultView("div#beer-selected");
  resultView.bindEvents()
  const selectedBeer = this.data.filter((beer) => beer.name == name);
  PubSub.publish("Beer:selected", selectedBeer);
}





module.exports = Beers;
