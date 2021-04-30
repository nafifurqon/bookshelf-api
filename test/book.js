const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const {
  afterEach,
  beforeEach,
  describe,
  it,
  // eslint-disable-next-line no-multi-assign
} = exports.lab = Lab.script();

const { init } = require('../lib/server');

const books = require('../db/books');

const booksExample = {
  id: 'Mj0e3-ztsxzCoeCC',
  name: 'Buku A',
  publisher: 'Dicoding Indonesia',
};

describe('GET /books', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  const injectOptions = {
    method: 'get',
    url: '/books',
  };

  it('should responds with 200 if books not empty', async () => {
    books.push(booksExample);

    const res = await server.inject(injectOptions);
    expect(res.statusCode).to.equal(200);
  });

  it('should responds fill books array if books not empty', async () => {
    const res = await server.inject(injectOptions);
    const payload = JSON.parse(res.payload);
    console.log(payload.data);
    console.log(books);
    expect(payload.data).to.include({ books });
  });
});
