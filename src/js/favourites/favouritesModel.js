export default class Favourites {
  constructor() {
    this.favs = [];
    // Работа с LocalStorage
    this.getData();
  }

  addFav(id) {
    this.favs.push(id);
    // сохранение нового массива в LS
    this.saveData();
  }

  removeFav(id) {
    const index = this.favs.indexOf(id);
    this.favs.splice(index, 1);
    // сохранение нового массива в LS
    this.saveData();
  }

  isFav(id) {
    return this.favs.indexOf(id) !== -1 ? true : false;
  }

  toggleFav(id) {
    this.isFav(id) ? this.removeFav(id) : this.addFav(id);
  }

  // сохраняем данные в LS
  saveData() {
    localStorage.setItem("favs", JSON.stringify(this.favs));
  }

  // получаем данные из LS
  getData() {
    const result = JSON.parse(localStorage.getItem("favs"));
    result ? (this.favs = result) : (this.favs = []);
  }
}
