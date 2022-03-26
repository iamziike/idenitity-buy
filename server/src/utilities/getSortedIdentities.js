const {
  ASC,
  DESC,
  ID,
  NAME,
  GENDER,
  NATIONALITY,
  COUNTRY_SHRT,
} = require('../constants/constants');

const getSortedIdentities = (identities, sort) => {
  const { sortType, orderBy } = sort;

  const firstReturnValue = orderBy === ASC ? -1 : 1;
  const lastReturnValue = orderBy === DESC ? -1 : 1;

  const shuffle = (first, second) => {
    if (first < second) return firstReturnValue;
    else if (first > second) return lastReturnValue;
    else return 0;
  };

  return identities.sort((first, second) => {
    if (sortType === ID) return shuffle(first.id, second.id);
    if (sortType === NAME) return shuffle(first.name, second.name);
    if (sortType === GENDER) return shuffle(first.gender, second.gender);
    if (sortType === NATIONALITY)
      return shuffle(
        first[NATIONALITY][COUNTRY_SHRT],
        second[NATIONALITY][COUNTRY_SHRT],
      );
  });
};

module.exports.getSortedIdentities = getSortedIdentities;
