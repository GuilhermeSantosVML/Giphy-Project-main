export const smoothScroll = (targetId) => {
    const element = document.querySelector(targetId);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  