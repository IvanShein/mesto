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

  appendItem(cardAdd) {
    this._container.append(cardAdd);
  };

  prependItem(cardAdd) {
    this._container.prepend(cardAdd);
  };
}
