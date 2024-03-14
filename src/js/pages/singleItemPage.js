import singleItem from "./../singleItem/singleItemControllet.js";
export default function (state) {
  // Очищаем прошлый контент (контейнер приложения)
  document.querySelector("#app").innerHTML = "";

  //Запускаем компонент SingleItem
  singleItem(state);
}
