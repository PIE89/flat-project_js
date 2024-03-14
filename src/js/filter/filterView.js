import "url-search-params-polyfill";

const elements = {
  filterSelect: document.getElementsByClassName("filter__dropdown"),
  filterRooms: document.getElementsByClassName("rooms__checkbox"),
  filterFields: document.getElementsByClassName("range__input"),
  filterSubmit: document.getElementsByClassName("filter__show"),
};

// рендерим компонент фильтра
export function render(params) {
  let complexNames = "";
  params.complexNames.forEach((name) => {
    complexNames += `<option value="${name}">ЖК ${name}</option>`;
  });

  let roomValues = "";
  params.roomValues.forEach((count) => {
    roomValues += `<input
    name="rooms"
    type="checkbox"
    id="rooms_${count}"
    class="rooms__checkbox"
    value="${count}"
/><label for="rooms_${count}" class="rooms__btn">${count}</label>`;
  });

  const markup = ` <!-- Filter -->
  <form method="GET" id="filterForm" class="container p-0">
      <div class="heading-1">Выбор квартир:</div>
      <div class="filter">
          <div class="filter__col">
              <div class="filter__label">Выбор проекта:</div>
              <select name="complex" id="" class="filter__dropdown">
                  <option value="all">Все проекты</option>
                  ${complexNames}
              </select>
          </div>
          <div class="filter__col rooms">
              <div class="filter__label">Комнат:</div>
              <div class="rooms__wrapper">${roomValues}</div>
          </div>
          <div class="filter__col">
              <div class="filter__label">Площадь:</div>
              <div class="range__wrapper">
                  <label class="range">
                      <div for="" class="range__label">от</div>
                      <input
                          name="sqmin"
                          min="0"
                          type="number"
                          class="range__input"
                          placeholder="${params.squareMin}"
                          value="${params.squareMin}"
                      />
                      <div class="range__value">м2</div>
                  </label>
                  <label class="range">
                      <div for="" class="range__label">до</div>
                      <input
                          name="sqmax"
                          min="0"
                          type="number"
                          class="range__input"
                          placeholder="${params.squareMax}"
                          value="${params.squareMax}"
                      />
                      <div class="range__value">м2</div>
                  </label>
              </div>
          </div>
          <div class="filter__col">
              <div class="filter__label">Стоимость:</div>
              <div class="range__wrapper">
                  <div class="range">
                      <label for="" class="range__label">от</label>
                      <input
                          type="number"
                          name="pricemin"
                          min="0"
                          class="range__input range__input--price"
                          placeholder="${params.priceMin}"
                          value="${params.priceMin}"
                      />
                      <div class="range__value">₽</div>
                  </div>
                  <div class="range">
                      <label for="" class="range__label">до</label>
                      <input
                          type="number"
                          name="pricemax"
                          min="0"
                          class="range__input range__input--price"
                          placeholder="${params.priceMax}"
                          value="${params.priceMax}"
                      />
                      <div class="range__value">₽</div>
                  </div>
              </div>
          </div>
      </div>
      <div class="filter__buttons">
          <button class="filter__show">Показать объекты</button>
          <button class="filter__reset" type="reset">Сбросить фильтр</button>
      </div>
  </form>
  <!-- // Filter -->`;

  document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
}

// изменение данных в кнопке
export function changeButtonText(number) {
  const btn = elements.filterSubmit[0];

  let massage;

  massage =
    number > 0
      ? `Показать ${number} объектов`
      : (massage = `Объекты не найдены. Измените условия поиска`);

  btn.innerText = massage;

  //disable btn на пустой результат
  btn.disabled = number === 0 ? true : false;
}

// получаем внесенные данные на странице и составляем строку для отправки на сервер
export function getInput() {
  const searchParams = new URLSearchParams();

  // значение селекта
  if (elements.filterSelect[0] !== "all") {
    searchParams.append(
      elements.filterSelect[0].name,
      elements.filterSelect[0].value
    );
  }

  //значение чекбоксов
  const roomsValues = [];
  // найдем все чекбоксы, пройдемся по ним и занесем в массив выбранные чекбоксы
  Array.from(elements.filterRooms).forEach((checkbox) => {
    if (checkbox.value !== "" && checkbox.checked) {
      roomsValues.push(checkbox.value);
    }
  });
  // заносим в массив выбранное количество квартир
  const roomsValuesString = roomsValues.join(",");
  if (roomsValuesString !== "") {
    searchParams.append("rooms", roomsValuesString);
  }

  //найдем значение цены и площади, пройдемся по ним и занесем в массив выбранные значения
  Array.from(elements.filterFields).forEach((field) => {
    if (field.value !== "") {
      searchParams.append(field.name, field.value);
    }
  });

  // выводим в консоль строку, которую направляем на сервер
  const queryString = searchParams.toString();

  // проверяем строку и добавляем знак ? для отправки get запроса на сервер
  if (queryString) {
    return "?" + queryString;
  } else {
    ("");
  }
}
