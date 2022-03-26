const { ID, GENDER, NAME, NATIONALITY } = require('../constants/constants');

const getFilteredIdentites = (identities, filters) => {
  const filterKeys = Object.keys(filters).filter(
    (keys) => filters[keys].length,
  );

  // filters are built to be AND + OR
  return identities.filter((identity) => {
    return filterKeys.every((key) => {
      if (key === ID) return filters[key].includes(identity.id);
      if (key === GENDER) return filters[key].includes(identity.gender);
      if (key === NAME) {
        const name = `${identity.name.first.toLowerCase()} ${identity.name.last.toLowerCase()}`;

        return filters[key].some((searchQuery) =>
          name.includes(searchQuery.toLowerCase()),
        );
      }
      if (key === NATIONALITY) return filters[key].includes(identity.nat);
    });
  });
};

module.exports.getFilteredIdentites = getFilteredIdentites;
