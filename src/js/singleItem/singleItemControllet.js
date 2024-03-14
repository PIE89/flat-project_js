import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";

export default async function (state) {
  // создали новый объект по классу SingleItem
  state.singleItem = new SingleItem(state.routeParams);

  await state.singleItem.getItem();

  // отрисовка элемента на странице
  view.render(
    state.singleItem.result,
    state.favourites.isFav(state.singleItem.id)
  );

  //
  //  Запуск прослушки событий
  //

  // открытие модального окна

  const btn = document.querySelector(".button-order");
  btn.addEventListener("click", () => {
    view.showModal();
  });

  // Закрытие модального окна клик по кнопке
  document.querySelector(".modal__close").onclick = function () {
    view.hideModal();
  };

  // Закрытие модального окна клик по overlay
  document.querySelector(".modal-wrapper").onclick = function (e) {
    if (e.target.closest(".modal")) {
      return null;
    } else {
      view.hideModal();
    }
  };

  // отправка формы
  document
    .querySelector(".modal__form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = view.saveData();
      await state.singleItem.submitForm(formData);

      const response = state.singleItem.response;

      // проверяем полученный ответ с сервера
      // ошибок нет
      if (response.message === "Bid Created") {
        alert("Заявка добавлена");
        view.hideModal();
        view.clearInput();
      } else if (response.message === "Bid Not Created") {
        // есть ошибки
        response.errors.forEach((elem) => alert(elem));
      }
    });

  // кнопка добавить в избранное
  document.querySelector(".button-favourite").addEventListener("click", () => {
    // добавляем в массив
    state.favourites.toggleFav(state.singleItem.id);

    view.toggleFavouriteBtn(state.favourites.isFav(state.singleItem.id));
  });
}
