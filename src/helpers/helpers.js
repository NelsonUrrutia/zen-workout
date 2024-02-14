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

export const convertMinuteBasedToSeconds = (minutes, seconds) => {
  return minutes * 60 + seconds;
};
