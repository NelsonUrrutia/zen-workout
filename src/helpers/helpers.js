/**
 * Parses a JSON string into an object
 * @param {string} string The JSON string to be parsed
 * @returns {Object} The parsed JavaScript object
 */
export const parseJSON = (string) => {
  return JSON.parse(string);
};

/**
 * Converts an object to a JSON string
 * @param {Object} object The object to be converted to a JSON string
 * @returns {String} The JSON string representation of the object
 */
export const stringifyJSON = (object) => {
  return JSON.stringify(object);
};

/**
 * Gets the current date
 * @returns {String} The current date string
 */
export const getCurrentDate = () => {
  const date = new Date();
  return date.toDateString();
};

/**
 * Get the current timestamp
 * @returns {number} The current timestamp
 */
export const getDateNow = () => {
  return Date.now();
};

/**
 * Converts time from minute-based format to seconds.
 *
 * @param {number} minutes - The number of minutes.
 * @param {number} seconds - The number of seconds.
 * @returns {number} - Total time in seconds.
 */
export const convertMinuteBasedToSeconds = (minutes, seconds) => {
  return minutes * 60 + seconds;
};

/**
 * Converts time from second-based format to minutes
 *
 * @param {Int} second - The number of seconds
 * @returns {Object} - The minutes and seconds
 */
export const convertSecondBasedToMinutes = (second) => {
  const minutes = Math.floor(second / 60);
  const seconds = second % 60;
  return { minutes, seconds };
};
