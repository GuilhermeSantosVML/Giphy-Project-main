
import { SELECTORS } from '../utils/constants.js';
import GiphyAPI from '../api/giphy.js';
import Loading from './loading.js';
import Error from './error.js';

export default class RandomGif {
  constructor() {
    this.container = document.querySelector(SELECTORS.random.container);
    this.nextButton = document.querySelector(SELECTORS.random.nextButton);
    this.loading = new Loading(SELECTORS.random.spinner);
    this.error = new Error(document.querySelector(SELECTORS.random.section));

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.nextButton.addEventListener('click', () => this.loadNewGif());
  }

  async loadNewGif() {
    try {
      this.loading.show(); 
      this.error.hide();
      const response = await GiphyAPI.getRandomGif();

      if (!response.data) {
        throw new Error('No GIF data received');
      }

      this.container.innerHTML = ''; 

      const img = document.createElement('img');
      img.src = response.data.images.original.url;
      img.alt = response.data.title;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';

      img.onload = () => {
        this.container.appendChild(img);
        this.loading.hide(); 
      };

      img.onerror = () => {
        this.error.show('Failed to load image. Please try again.');
        this.loading.hide(); 
      };

    } catch (error) {
      console.error('Error loading random gif:', error);
      this.error.show('Failed to load random GIF. Please try again.');
      this.loading.hide(); 
    }
  }
}