function findAccountById(accounts, id) {
  const idFound = accounts.find((account) => account.id === id);
  return idFound;
}

function sortAccountsByLastName(accounts) {
  const sortedLastNames = accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last.toLowerCase();
    const lastNameB = accountB.name.last.toLowerCase();
    return lastNameA < lastNameB ? -1 : 1;
  });
  return sortedLastNames;
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  const accountTotalBorrowed = books.filter((book) => {
    const listOfAllBooksBorrowed = book.borrows;
    const bookBorrowersId = listOfAllBooksBorrowed.filter(
      (userWhoHaveBorrowed) => userWhoHaveBorrowed.id === accountId
    );
    return bookBorrowersId.length;
  });
  return accountTotalBorrowed.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const currentBorrowedBooks = books.filter((book) => {
    const listOfAllBooksBorrowed = book.borrows;
    const bookBorrowersId = listOfAllBooksBorrowed.filter(
      (userWhoHaveBorrowed) => {
        const idsMatch = userWhoHaveBorrowed.id === accountId;
        return idsMatch && !userWhoHaveBorrowed.returned;
      }
    );
    return bookBorrowersId.length;
  });

  const authorId = currentBorrowedBooks.map((book) => {
    const booksAuthorId = book.authorId;
    const authorIdInfo = authors.find((author) => author.id === booksAuthorId);
    return { ...book, author: authorIdInfo };
  });
  return authorId;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
