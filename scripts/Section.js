class Section {
    constructor({items, renderer}, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this.containerEl = document.querySelector(containerSelector);
    }

    renderAll() {
        this.items.forEach(item => {
            this.renderer(item);
        })
    }

    addItem() {
        this.containerEl.prepend(item);
    }
}