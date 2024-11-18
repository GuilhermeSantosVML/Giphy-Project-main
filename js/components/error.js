export default class Error { constructor(container) { this.container = container; }

show(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.innerHTML = `
    <i class="fa-solid fa-circle-exclamation"></i>
    <p>${message}</p>
  `;
  
  this.hide();
  
  if (this.container.classList.contains('section__finder')) {
    const form = this.container.querySelector('.section-finder__form');
    if (form) {
      form.insertAdjacentElement('afterend', errorElement);
    } else {
      this.container.appendChild(errorElement);
    }
  } else if (this.container.classList.contains('section__trending')) {
    const title = this.container.querySelector('.section__title');
    if (title) {
      title.insertAdjacentElement('afterend', errorElement);
    } else {
      this.container.appendChild(errorElement);
    }
  } else {
    this.container.appendChild(errorElement);
  }
}

hide() {
  const existingError = this.container.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}
}

