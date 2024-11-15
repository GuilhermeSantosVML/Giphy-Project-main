// import { SELECTORS } from './utils/constants.js';
// import { smoothScroll } from './utils/smoothScroll.js';
// import RandomGif from './components/randomGif.js';
// import SearchGifs from './components/searchGifs.js';
// import TrendingGifs from './components/trendingGifs.js';

// class App {
//   constructor() {
//     this.initializeComponents();
//     this.setupNavigation();
//   }

//   initializeComponents() {
//     this.randomGif = new RandomGif();
//     this.searchGifs = new SearchGifs();
//     this.trendingGifs = new TrendingGifs();
//   }

//   setupNavigation() {
//     document.querySelectorAll(SELECTORS.nav.links).forEach(link => {
//       link.addEventListener('click', (e) => {
//         e.preventDefault();
//         const targetId = e.currentTarget.getAttribute('href');
//         smoothScroll(targetId);
//       });
//     });
//   }

//   async init() {
//     await this.randomGif.loadNewGif();
//     await this.trendingGifs.loadTrending();
//   }
// }

// // Initialize the application
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new App();
//   app.init();
// });

import { SELECTORS } from './utils/constants.js';
import { smoothScroll } from './utils/smoothScroll.js';
import RandomGif from './components/randomGif.js';
import SearchGifs from './components/searchGifs.js';
import TrendingGifs from './components/trendingGifs.js';

class App {
  constructor() {
    this.initializeComponents();
    this.setupNavigation();
    this.setupHeaderToggle();
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

  setupHeaderToggle() {
    const header = document.querySelector('.header');
    let isBrown = false;

    header.addEventListener('click', () => {
      isBrown = !isBrown;
      header.style.backgroundColor = isBrown ? 'rgb(84, 45, 29)' : 'rgb(255, 111, 0)';
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