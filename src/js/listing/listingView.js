// производим рендер контейнера родителя карточек на странице
export function render() {
  const markup = `<div class="cards-wrapper">
                    <div class="container p-0 pt-5 ">
                        <div id="listingContainer" class="row">
                        </div> 
                    </div>
                </div>`;

  document.querySelector("#app").insertAdjacentHTML("beforeend", markup);
}

// производим рендер карточек на странице
export function renderCard(elem, isFaved) {
  const listingContainer = document.querySelector("#listingContainer");
  const markup = `<article class="col-md-4">
    <!-- card -->
    <a href="#/item/${elem.id}" class="card" data-id="${elem.id}">
        <div class="card__header">
            <div class="card__title">
               ЖК ${elem.complex_name}
            </div>
            <div class="
            card__like
            ${isFaved ? "card__like--active" : ""}">
                <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="card__img">
            <img src=${elem.image} alt="План квартиры" />
        </div>
        <div class="card__desc">
            <div class="card__price">
                <div class="card__price-total">
                    ${elem.price_total} ₽
                </div>
                <div class="card__price-per-meter">
                    ${elem.price_sq_m} ₽/м2
                </div>
            </div>

            <!-- card__params params -->
            <div class="card__params params">
                <div class="params__item">
                    <div class="params__definition">
                        Комнат
                    </div>
                    <div class="params__value">${elem.rooms}</div>
                </div>
                <div class="params__item">
                    <div class="params__definition">
                        Площадь
                    </div>
                    <div class="params__value">${elem.square}</div>
                </div>
            </div>
            <!-- //card__params params -->
        </div>
        <div class="card__footer">
            <div class="card__art">${elem.scu}</div>
            <div class="card__floor">Этаж ${elem.floor} из ${
    elem.floors_total
  }</div>
        </div>
    </a>
    <!-- // card -->
</article>`;

  listingContainer.insertAdjacentHTML("beforeend", markup);
}

// очищаем контейнер с карточками квартир
export function clearListingContainer() {
  const listingContainer = document.querySelector("#listingContainer");
  listingContainer.innerHTML = "";
}

export function toggleFavouriteItem(elemIcon, isFaved) {
  if (isFaved) {
    elemIcon.classList.add("card__like--active");
  } else {
    elemIcon.classList.remove("card__like--active");
  }
}
