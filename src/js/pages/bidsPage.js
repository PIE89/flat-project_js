import bids from "./../bids/bidsController.js";

export default function (state) {
  // очищаем контейнер app
  document.querySelector("#app").innerHTML = "";
  bids(state);
}
