export default class Section {
  constructor ({items, renderer}, selectorContainer) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  };

  renderItems() {
    this.items.forEach((item) =>
     this._renderer(item)
    );
  };

  addItem(cardAdd) {
    this._container.prepend(cardAdd);
  };
}
