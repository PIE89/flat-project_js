import favouritesCards from "./../favouritescard/favouritescardsController.js";

export default function (state) {
  document.querySelector("#app").innerHTML = "";
  favouritesCards(state);

}
