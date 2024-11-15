export default class Loading {
    constructor(spinnerSelector) {
      this.spinner = document.querySelector(spinnerSelector);
      if (!this.spinner) {
        console.warn(`Spinner not found with selector: ${spinnerSelector}`);
      }
    }
  
    show() {
      if (this.spinner) {
        console.log('Showing spinner'); 
        this.spinner.style.display = 'block';
      }
    }
  
    hide() {
      if (this.spinner) {
        console.log('Hiding spinner'); 
        this.spinner.style.display = 'none';
      }
    }
  }

export class Error {
  constructor(container) {
    this.container = container;
  }

  show(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.innerHTML = `
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>${message}</p>
      `;

    this.hide();
    this.container.appendChild(errorElement);
  }

  hide() {
    const existingError = this.container.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  }
}
