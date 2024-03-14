export default class FavoritesCards {
  constructor(favsList) {
    this.favsList = favsList;
  }

  async getFavs() {
    try {
      const ids = this.favsList.toString();
      if (ids) {
        const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`;
        const result = await fetch(queryString);
        const data = await result.json();
        this.cards = await data;
      } else {
        this.cards = [];
      }
    } catch (error) {
      alert("ERROR!!!!");
      console.log(error);
    }
  }
}
