export class Section {
    constructor({items, renderer}, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this.containerEl = document.querySelector(containerSelector);
    }

    renderAll() {
        this.items.forEach(item => {
           this.containerEl.append(this.renderer(item));
        });
    }

    addItem(item) {
        this.containerEl.prepend(item);
    }
}