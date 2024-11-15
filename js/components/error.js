export default class Error {
    constructor(container) {
      this.container = container;
    }
  
    show(message) {
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.innerHTML = `
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>${message}</p>
      `;
      
      // Remove any existing error messages
      this.hide();
      
      this.container.appendChild(errorElement);
    }
  
    hide() {
      const existingError = this.container.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
    }
  }