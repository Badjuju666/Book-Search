export const getFavsBookIds = () => {
  const favsBookIds = localStorage.getItem('favs_books')
    ? JSON.parse(localStorage.getItem('fav_books'))
    : [];

  return favsBookIds;
};

export const favBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('favs_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('favs_books');
  }
};

export const dumpBookId = (bookId) => {
  const favsBookIds = localStorage.getItem('favs_books')
    ? JSON.parse(localStorage.getItem('favs_books'))
    : null;

  if (!favsBookIds) {
    return false;
  }

  const updatedFavsBookIds = favsBookIds?.filter((favsBookId) => favsBookId !== bookId);
  localStorage.setItem('favs_books', JSON.stringify(updatedFavsBookIds));

  return true;
};
