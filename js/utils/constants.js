export const API_KEY = '4scrAai5OCMrQ1aJttZu3HtJg7Hz6DKp';
export const BASE_URL = 'https://api.giphy.com/v1/gifs';
export const ITEMS_PER_PAGE = 12;
export const GIFS_PER_PAGE = 5;
export const MAX_PAGES = 5;

export const SELECTORS = {
    random: {
      section: '.section__random',
      container: '.img__container',
      nextButton: '.section__random-button--next',
      spinner: '.loading-spinner'
    },
    finder: {
      section: '.section__finder',
      form: '.section-finder__form',
      input: '.section__finder-input',
      searchButton: '.section__finder button'
    },
    trending: {
      section: '.section__trending'
    },
    nav: {
      links: '.nav__link'
    }
  };