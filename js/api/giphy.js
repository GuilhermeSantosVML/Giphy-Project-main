import { API_KEY, BASE_URL, ITEMS_PER_PAGE } from '../utils/constants.js';

export default class GiphyAPI {
  static async getRandomGif() {
    try {
      const response = await fetch(
        `${BASE_URL}/random?api_key=${API_KEY}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching random gif:', error);
      throw error;
    }
  }

  static async searchGifs(query, offset = 0, limit = ITEMS_PER_PAGE) {
    try {
      const response = await fetch(
        `${BASE_URL}/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error searching gifs:', error);
      throw error;
    }
  }

  static async getTrending(offset = 0, limit = ITEMS_PER_PAGE) {
    try {
      const response = await fetch(
        `${BASE_URL}/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching trending gifs:', error);
      throw error;
    }
  }
}