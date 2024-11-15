// import { SELECTORS, GIFS_PER_PAGE } from '../utils/constants.js';
// import GiphyAPI from '../api/giphy.js';
// import Loading from './loading.js';
// import GifGrid from './gifGrid.js';
// import Pagination from './pagination.js';

// export default class SearchGifs {
//   constructor() {
//     this.form = document.querySelector(SELECTORS.finder.form);
//     this.input = document.querySelector(SELECTORS.finder.input);
//     this.resultsContainer = document.createElement('div');
//     this.resultsContainer.className = 'search-results';
//     this.form.appendChild(this.resultsContainer);
    
//     this.gifGrid = new GifGrid(this.resultsContainer);
//     this.loading = new Loading(`${SELECTORS.finder.section} .loading-spinner`);
//     this.pagination = new Pagination(this.resultsContainer, (page) => this.handlePageChange(page));
    
//     this.currentQuery = '';
//     this.setupEventListeners();
//   }

//   setupEventListeners() {
//     this.form.addEventListener('submit', (e) => this.handleSearch(e));
//   }

//   async handleSearch(e) {
//     e.preventDefault();
//     const searchTerm = this.input.value.trim();
//     if (!searchTerm) return;

//     this.currentQuery = searchTerm;
//     this.pagination.reset();
//     await this.fetchResults(searchTerm, 1);
//   }

//   async handlePageChange(page) {
//     await this.fetchResults(this.currentQuery, page);
//   }

//   async fetchResults(query, page) {
//     try {
//       this.loading.show();
//       const offset = (page - 1) * GIFS_PER_PAGE;
//       const response = await GiphyAPI.searchGifs(query, offset, GIFS_PER_PAGE);
      
//       await this.gifGrid.render(response.data);
//       this.pagination.render(response.pagination.total_count);
//     } catch (error) {
//       console.error('Error searching gifs:', error);
//     } finally {
//       this.loading.hide();
//     }
//   }
// }

import { SELECTORS, GIFS_PER_PAGE } from '../utils/constants.js';
import GiphyAPI from '../api/giphy.js';
import Loading from './loading.js';
import Error from './error.js';
import GifGrid from './gifGrid.js';
import Pagination from './pagination.js';

export default class SearchGifs {
  constructor() {
    this.form = document.querySelector(SELECTORS.finder.form);
    this.input = document.querySelector(SELECTORS.finder.input);
    this.resultsContainer = document.createElement('div');
    this.resultsContainer.className = 'search-results';
    this.form.appendChild(this.resultsContainer);
    
    this.gifGrid = new GifGrid(this.resultsContainer);
    this.loading = new Loading(`${SELECTORS.finder.section} .loading-spinner`);
    this.pagination = new Pagination(this.resultsContainer, (page) => this.handlePageChange(page));
    // Add error instance
    this.error = new Error(document.querySelector(SELECTORS.finder.section));
    
    this.currentQuery = '';
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSearch(e));
  }

  async handleSearch(e) {
    e.preventDefault();
    const searchTerm = this.input.value.trim();
    if (!searchTerm) {
      this.error.show('Please enter a search term');
      return;
    }

    try {
      this.currentQuery = searchTerm;
      this.pagination.reset();
      this.error.hide(); // Hide any previous errors
      await this.fetchResults(searchTerm, 1);
    } catch (err) {
      this.error.show('Failed to perform search. Please try again.');
      console.error('Search error:', err);
    }
  }

  async handlePageChange(page) {
    try {
      this.error.hide();
      await this.fetchResults(this.currentQuery, page);
    } catch (err) {
      this.error.show('Failed to load page. Please try again.');
      console.error('Pagination error:', err);
    }
  }

  async fetchResults(query, page) {
    try {
      this.error.hide(); // Hide any existing errors
      this.loading.show();
      const offset = (page - 1) * GIFS_PER_PAGE;
      const response = await GiphyAPI.searchGifs(query, offset, GIFS_PER_PAGE);
      
      // Check if we have valid data
      if (!response || !response.data) {
        throw new Error('Invalid response from API');
      }

      // Check if we found any results
      if (response.data.length === 0) {
        this.error.show('No GIFs found for your search. Try different keywords.');
        return;
      }

      await this.gifGrid.render(response.data);
      
      // Only try to render pagination if we have data
      const totalCount = response.data.length;
      if (totalCount > 0) {
        this.pagination.render(totalCount);
      }

    } catch (error) {
      console.error('Error searching gifs:', error);
      this.error.show('Failed to load search results. Please try again.');
    } finally {
      this.loading.hide();
    }
  }
}