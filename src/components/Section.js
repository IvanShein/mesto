export default class Section {
  constructor ({items, renderer}, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItems() {
    this._items.forEach((item) =>
     this._renderer(item)
    );
  };

  addItem(cardAdd) {
    this._container.prepend(cardAdd);
  };
};
