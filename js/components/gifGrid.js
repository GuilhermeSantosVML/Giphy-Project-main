export default class GifGrid {
    constructor(container) {
      this.container = container;
    }
  
    createGifElement(gif) {
      return new Promise((resolve) => {
        const container = document.createElement('div');
        container.className = 'gif-item';
  
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
  
        img.onload = () => resolve(container);
        img.onerror = () => resolve(container);
  
        container.appendChild(img);
      });
    }
  
    async render(gifs) {
      const gifGrid = document.createElement('div');
      gifGrid.className = 'gif-grid';
  
      await Promise.all(gifs.map(gif => this.createGifElement(gif)))
        .then(elements => {
          elements.forEach(element => gifGrid.appendChild(element));
          this.container.innerHTML = '';
          this.container.appendChild(gifGrid);
        });
    }
  }