import * as view from "./filterView";
import Filter from "./filterModel";

export default async function (state) {
  // создание объекта фильтра
  if (!state.filter) state.filter = new Filter();

  // получение параметров для Фильтра
  await state.filter.getParams();

  // Отрисовка фильтра
  view.render(state.filter.params);

  // Запрос на сервер
  await state.filter.getResults();

  // записываем полученные значения с свойство result
  state.results = state.filter.result;

  // Отрисовка кнопки с новым значением
  view.changeButtonText(state.filter.result.length);

  // прослушка для изменения событий формы
  const form = document.querySelector("#filterForm");

  // ставим прослушку на изменение данных фильтра
  form.addEventListener("change", async function (e) {
    e.preventDefault();

    // заносим измененные данные в объект
    state.filter.query = view.getInput();

    // делаем новый запрос на сервер
    await state.filter.getResults();

    // записываем полученные значения с свойство result
    state.results = state.filter.result;

    // рендерим новое значение на кнопке
    view.changeButtonText(state.filter.result.length);
  });

  // делаем прослушку reset
  form.addEventListener("reset", async function () {
    // обнуляем данные полученные ранее из фильтра
    state.filter.query = "";
    // отправляем новый запрос на сервер
    await state.filter.getResults();

    // записываем полученные значения с свойство result
    state.results = state.filter.result;

    // рендерим новое значение на кнопке
    view.changeButtonText(state.filter.result.length);
  });

  // отправка формы
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("submit");
    state.emitter.emit("event:render-listing", {});
  });
}
