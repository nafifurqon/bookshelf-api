const { nanoid } = require('nanoid');
const books = require('../db/books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = +pageCount === +readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { reading, finished } = request.query;
  let searchName = request.query.name;

  const bookList = [];

  if (+reading === 1) {
    const readBooks = books.filter((book) => book.reading === true);
    readBooks.forEach((book) => {
      const { id, name, publisher } = book;

      bookList.push({ id, name, publisher });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: bookList,
      },
    });
    response.code(200);
    return response;
  }

  if (+reading === 0) {
    const unreadBooks = books.filter((book) => book.reading === false);
    unreadBooks.forEach((book) => {
      const { id, name, publisher } = book;

      bookList.push({ id, name, publisher });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: bookList,
      },
    });
    response.code(200);
    return response;
  }

  if (+finished === 1) {
    const readBooks = books.filter((book) => book.finished === true);
    readBooks.forEach((book) => {
      const { id, name, publisher } = book;

      bookList.push({ id, name, publisher });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: bookList,
      },
    });
    response.code(200);
    return response;
  }

  if (+finished === 0) {
    const unreadBooks = books.filter((book) => book.finished === false);
    unreadBooks.forEach((book) => {
      const { id, name, publisher } = book;

      bookList.push({ id, name, publisher });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: bookList,
      },
    });
    response.code(200);
    return response;
  }

  if (searchName) {
    searchName = searchName.toLowerCase();
    const searchBooks = books.filter((book) => book.name.toLowerCase().search(searchName) !== -1);
    searchBooks.forEach((book) => {
      const { id, name, publisher } = book;

      bookList.push({ id, name, publisher });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: bookList,
      },
    });
    response.code(200);
    return response;
  }

  if (!reading && !finished && !searchName) {
    books.forEach((book) => {
      const { id, name, publisher } = book;

      bookList.push({ id, name, publisher });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: bookList,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data not found.',
  });
  response.code(404);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((item) => item.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
