

import { SELECTORS, GIFS_PER_PAGE } from "../utils/constants.js";
import GiphyAPI from "../api/giphy.js";
import Loading from "./loading.js";
import Error from "./error.js"; 
import GifGrid from "./gifGrid.js";
import Pagination from "./pagination.js";

export default class TrendingGifs {
  constructor() {
    this.section = document.querySelector(SELECTORS.trending.section);
    // Create a container for results and pagination if it doesn't exist
    this.resultsContainer =
      this.section.querySelector(SELECTORS.trending.resultsContainer) ||
      this.createResultsContainer();

    this.loading = new Loading(
      `${SELECTORS.trending.section} .loading-spinner`
    );
    this.error = new Error(this.section); // Add error instance
    this.gifGrid = new GifGrid(this.resultsContainer);
    this.pagination = new Pagination(this.resultsContainer, (page) =>
      this.loadTrending(page)
    );
  }

  createResultsContainer() {
    // Create container for results while preserving the title
    const container = document.createElement("div");
    container.className = "trending-results-container";

    const resultsDiv = document.createElement("div");
    resultsDiv.className = "trending-results";

    container.appendChild(resultsDiv);

    // Insert the container after the title
    const title = this.section.querySelector(".section__title");
    title.after(container);

    return resultsDiv;
  }

  async loadTrending(page = 1) {
    try {
      this.error.hide();
      this.loading.show();
      const offset = (page - 1) * GIFS_PER_PAGE;
      const response = await GiphyAPI.getTrending(offset, GIFS_PER_PAGE);

      if (!response || !response.data) {
        throw new Error("Invalid response from API");
      }

      if (response.data.length === 0) {
        this.error.show("No trending GIFs available at the moment.");
        return;
      }

      await this.gifGrid.render(response.data);

      // Use total_count from pagination info instead of data.length
      const totalCount = response.pagination.total_count;
      if (totalCount > 0) {
        this.pagination.render(totalCount);
      }
    } catch (error) {
      console.error("Error loading trending gifs:", error);
      this.error.show("Failed to load trending GIFs. Please try again.");
    } finally {
      this.loading.hide();
    }
  }
}
