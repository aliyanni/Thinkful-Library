function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const currentlyBorrowed = books.filter((book) => {
    const allBooksBorrowedInfo = book.borrows;
    const returnedFalse = allBooksBorrowedInfo.filter(
      (book) => book.returned === false
    );
    return returnedFalse.length;
  });
  return currentlyBorrowed.length;
}

function getMostCommonGenres(books) {
  const results = [];
  books.forEach((book) => {
    const currentGenre = book.genre;
    const foundGenre = results.find((result) => {
      return result.name === currentGenre;
    });
    if (!foundGenre) {
      results.push({ name: currentGenre, count: 1 });
    }
    if (foundGenre) {
      foundGenre.count++;
    }
  });
  return results.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularBooks(books) {
  const results = [];
  books.forEach((book) => {
    const currentTitle = book.title;
    const amountOfBorrows = book.borrows.length;
    const foundTitle = results.find((result) => {
      return result.name === currentTitle;
    });
    if (!foundTitle) {
      results.push({ name: currentTitle, count: amountOfBorrows });
    }
  });
  return results.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const results = [];
  books.forEach((book) => {
    const currentAuthorId = book.authorId;
    const amountOfBorrows = book.borrows.length;
    const author = authors.find((author) => {
      return author.id === currentAuthorId;
    });
    const authorFullname = `${author.name.first} ${author.name.last}`;
    const foundBooksByAuthor = results.find((result) => {
      return result.name === authorFullname;
    });
    if (!foundBooksByAuthor) {
      results.push({ name: authorFullname, count: amountOfBorrows });
    }
    if (foundBooksByAuthor) {
      foundBooksByAuthor.count += amountOfBorrows;
    }
  });
  return results.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
