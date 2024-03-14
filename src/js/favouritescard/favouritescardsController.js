import FavoritesCards from "./favouritescardsModel.js";
import * as view from "./favouritescardView.js";

export default async function (state) {
  // получить список объектов из избранного
  const favList = state.favourites.favs;

  //получаем данные по определенным карточкам с сервера
  const favouritesCards = new FavoritesCards(favList);
  await favouritesCards.getFavs();

  const resArr = favouritesCards.cards;

  //отображаем карточки
  view.renderPage(resArr);

  addToFavsListner();

  // // Функция для работы иконок — добавить в избранное
  function addToFavsListner() {
    // ставим прослушку кнопки избранная(сердечко) на странице
    Array.from(document.getElementsByClassName("card__like")).forEach(
      (elem) => {
        elem.addEventListener("click", (e) => {
          e.preventDefault();

          // находим id карточки
          const currentId = e.target.closest(".card").dataset.id;

          // корректируем данные в массиве
          state.favourites.toggleFav(currentId);

          // меняем класс в самой кнопке
          view.toggleFavouriteItem(
            e.target.closest(".card__like"),
            state.favourites.isFav(currentId)
          );
        });
      }
    );
  }

  const option = document.querySelector("#sort-cards-by");

  //СДЕЛАЛ ДОПОЛНИТЕЛЬНО!!!
  // ставим прослушку на фильтр (цена + площадь)
  option.addEventListener("change", (event) => {
    event.preventDefault();
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case "priceIncrease":
        resArr.sort((a, b) => a.price_total - b.price_total);
        break;

      case "priceDecrease":
        resArr.sort((a, b) => b.price_total - a.price_total);
        break;

      case "squareIncrease":
        resArr.sort((a, b) => a.square - b.square);
        break;

      case "squareDecrease":
        resArr.sort((a, b) => b.square - a.square);
        break;
    }

    view.renderFilteredCards(resArr);
  });
}
