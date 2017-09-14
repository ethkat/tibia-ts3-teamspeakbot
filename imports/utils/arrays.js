import _ from 'lodash';

export const filterLists = (arr1, arr2, fieldArr1, fieldArr2) => (
  _.filter(arr1, arr1Item => (
    _.find((arr2), arr2Item => arr2Item[fieldArr2] === arr1Item[fieldArr1])
  ),
  )
);
