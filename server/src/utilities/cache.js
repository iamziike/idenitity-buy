const cache = {};

const addToCache = (key, data) => {
  cache[key] = data;
  setTimeout(() => {
    delete [key];
  }, 40000);
};

const getFromCache = (key) => {
  return { ...cache[key] };
};

module.exports = { getFromCache, addToCache };
