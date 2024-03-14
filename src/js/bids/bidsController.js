import renderBids from "./bidsView.js";
import Bids from "./bidsModel.js";

export default async function (state) {
  // запускаем процесс получения заявок с сервера
  //(создаем модели для работы с заявками)
  if (!state.bids) state.bids = new Bids();
  await state.bids.getBids();

  // рендерим полученные заявки на странице
  renderBids(state.bids.bids);
}
