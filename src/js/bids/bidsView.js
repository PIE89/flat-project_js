// рендерим контейнер заявки
function renderContainer() {
  const markup = `
    <div class="container p-0 mb-5">
        <div class="heading-1">Заявки</div>
    </div>
    <div class="panels-wrapper">
        <div class="container p-0" id="container">
        <!-- Bids will be here -->
        </div>
    </div>
  `;

  document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
}

// рендерим сами заявки
function renderBid(bid) {
  const markup = `
    <div class="panel panel--no-hover">
        <div class="panel__bidid">${bid.id}</div>
        <div class="panel__bidname">${bid.name}</div>
        <div class="panel__bidphone">${bid.phone}</div>
    </div>`;

  document.querySelector("#container").insertAdjacentHTML("beforeend", markup);
}

// проходимся по массиву и рендерим все заявки в контейнере
export default function renderBids(bids) {
  renderContainer();

  bids.forEach((elem) => renderBid(elem));
}
