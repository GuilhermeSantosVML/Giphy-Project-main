export const timeoutHandler = async (promise, timeLimit = 5000) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error('Request timed out');
      error.name = 'TimeoutError';
      reject(error);
    }, timeLimit);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    return result;
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error('The request took too long to respond. Please try again.');
    }
    throw error;
  }
};