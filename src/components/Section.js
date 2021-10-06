export class Section {
    constructor({items, renderer}, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this.containerEl = document.querySelector(containerSelector);
    }

    renderAll(extraItems) {
        this.items.concat(extraItems).forEach(item => {
           this.containerEl.append(this.renderer(item));
        });
    }

    addItem(item) {
        this.containerEl.prepend(item);
    }
}