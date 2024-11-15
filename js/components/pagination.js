import { GIFS_PER_PAGE } from '../utils/constants.js';

export default class Pagination {
  constructor(container, onPageChange) {
    this.container = container;
    this.currentPage = 1;
    this.totalPages = 1;
    this.onPageChange = onPageChange;
  }

  render(totalItems) {
    this.totalPages = Math.ceil(totalItems / GIFS_PER_PAGE);
    
    // Remove existing pagination if any
    const existingPagination = this.container.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
    
    const paginationEl = document.createElement('div');
    paginationEl.className = 'pagination';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&larr; Previous';
    prevButton.className = 'pagination__button';
    prevButton.disabled = this.currentPage === 1;
    prevButton.addEventListener('click', () => this.goToPage(this.currentPage - 1));
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next &rarr;';
    nextButton.className = 'pagination__button';
    nextButton.disabled = this.currentPage === this.totalPages;
    nextButton.addEventListener('click', () => this.goToPage(this.currentPage + 1));
    
    // Page indicator
    const pageIndicator = document.createElement('span');
    pageIndicator.className = 'pagination__indicator';
    pageIndicator.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
    
    paginationEl.appendChild(prevButton);
    paginationEl.appendChild(pageIndicator);
    paginationEl.appendChild(nextButton);
    
    this.container.appendChild(paginationEl);
  }

  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.onPageChange(page);
    }
  }

  reset() {
    this.currentPage = 1;
    const existingPagination = this.container.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
  }
}