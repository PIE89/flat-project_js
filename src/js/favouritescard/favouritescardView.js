function renderContainer() {
  const markup = `
    <div class="container p-0">
        <div class="heading-1">Избранное</div>
    </div>
                    <!-- FILTER -->
    <div class="view-options-wrapper">
      <div class="container p-0">

        <div class="view-options">
          <div class="view-options__sort">
            <label for="sort-cards-by" 
            class="view-options__label">Сортировать</label>
            <select id="sort-cards-by" name="" id="" 
            class="view-options__select">
              <option value="priceIncrease">по цене ↑</option>
              <option value="priceDecrease">по цене ↓</option>
              <option value="squareIncrease">по площади ↑</option>
              <option value="squareDecrease">по площади ↓</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="cards-wrapper">
      <div class="container p-0">
        <div class="row" id="cards-row">
        <!-- Card will be HERE -->
        </div>
      </div>
    </div>
    
    
    `;

  document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
}

function renderCards(elem) {
  const markup = `
  <article class="col-md-4">
    <a href="#/item/${elem.id}" class="card" data-id="${elem.id}">
        <div class="card__header">
            <div class="card__title">ЖК ${elem.complex_name}</div>
            <div class="card__like card__like--active">
                <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="card__img">
            <img src=${elem.image} alt="План квартиры"/>
        </div>
        <div class="card__desc">
            <div class="card__price">
                <div class="card__price-total">${elem.price_total} ₽</div>
                <div class="card__price-per-meter">${elem.price_sq_m} ₽/м2</div>
            </div>

            <div class="card__params params">
                <div class="params__item">
                    <div class="params__definition">Комнат</div>
                    <div class="params__value">${elem.rooms}</div>
                </div>
                <div class="params__item">
                    <div class="params__definition">Площадь</div>
                    <div class="params__value">${elem.square}</div>
                </div>
            </div>
        </div>

        <div class="card__footer">
            <div class="card__art">${elem.scu}</div>
            <div class="card__floor">Этаж ${elem.floor} из ${elem.floors_total}</div>
        </div>
    </a>
</article>
  `;
  document.querySelector("#cards-row").insertAdjacentHTML("beforeend", markup);
}

export function renderPage(resArr) {
  renderContainer();
  resArr.forEach((elem) => renderCards(elem));
}

//функция фильтрации карточки (Сделана Дополнительно)
export function renderFilteredCards(resArr) {
  document.querySelector("#cards-row").innerHTML = "";
  resArr.forEach((elem) => renderCards(elem));
}

export function toggleFavouriteItem(elemIcon, isFaved) {
  if (isFaved) {
    elemIcon.classList.add("card__like--active");
  } else {
    elemIcon.classList.remove("card__like--active");
  }
}
