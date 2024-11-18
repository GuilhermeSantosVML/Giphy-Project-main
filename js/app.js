import { SELECTORS } from './utils/constants.js';
import { smoothScroll } from './utils/smoothScroll.js';
import RandomGif from './components/randomGif.js';
import SearchGifs from './components/searchGifs.js';
import TrendingGifs from './components/trendingGifs.js';

class App {
  constructor() {
    this.initializeComponents();
    this.setupNavigation();
  }

  initializeComponents() {
    this.randomGif = new RandomGif();
    this.searchGifs = new SearchGifs();
    this.trendingGifs = new TrendingGifs();
  }

  setupNavigation() {
    document.querySelectorAll(SELECTORS.nav.links).forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        smoothScroll(targetId);
      });
    });
  }

  async init() {
    try {
      await this.randomGif.loadNewGif();
      await this.trendingGifs.loadTrending();
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});