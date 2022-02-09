function findAuthorById(authors, id) {
  const matchingAuthor = authors.find((author) => author.id === id);
  return matchingAuthor;
}

function findBookById(books, id) {
  const matchingBook = books.find((book) => book.id == id);
  return matchingBook;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.reduce((partitionedBooks, book) => {
    const borrows = book.borrows;
    if (!partitionedBooks[0]) {
      partitionedBooks[0] = [];
    }
    if (!partitionedBooks[1]) {
      partitionedBooks[1] = [];
    }

    if (borrows[0].returned === false) {
      partitionedBooks[0].push(book);
    } else {
      partitionedBooks[1].push(book);
    }
    return partitionedBooks;
  }, []);
  return borrowedBooks;
}

function getBorrowersForBook(book, accounts) {
  const accountInfo = accounts.filter((account) => {
    let accountId = account.id;
    let bookBorrows = book.borrows;
    return bookBorrows.some((account) => account.id === accountId);
  });

  const updatedAccount = accountInfo.map((info) => {
    let bookBorrows = book.borrows;
    let newInfo = { ...info };
    const returnValue = bookBorrows.forEach((returnValue) => {
      newInfo.returned = returnValue.returned;
    });
    return newInfo;
  });
  return updatedAccount;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
