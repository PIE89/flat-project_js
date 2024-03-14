import * as view from "./listingView.js";

export default function (state) {
  // рендер контейнера для карточек
  view.render();

  //рендер самих карточек
  state.results.forEach((elem) => {
    view.renderCard(elem, state.favourites.isFav(elem.id));
  });

  // запускаем Функцию для работы иконок — добавить в избранное
  addToFavsListner();

  state.emitter.subscribe("event:render-listing", () => {
    // Очистить контейнер с карточками
    view.clearListingContainer();

    //рендер самих отфильтрованных карточек
    state.results.forEach((elem) => {
      view.renderCard(elem, state.favourites.isFav(elem.id));
    });

    // запускаем Функцию для работы иконок — добавить в избранное
    addToFavsListner();
  });

  // Функция для работы иконок — добавить в избранное
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
}
