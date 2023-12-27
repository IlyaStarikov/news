const jwt = require('jsonwebtoken');
const { News } = require('../models');
const newsController = require('../controllers/newsController');
const { news, card } = require('../mocks');

const statusMockFn = jest.fn();
const sendMockFn = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('News controller tests', () => {
  test('should find, return news and status 200', async () => {
    jest.spyOn(News, 'findAll').mockResolvedValue(news);

    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ send: sendMockFn }),
    };

    await newsController.getAllNews({}, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(200);
    expect(sendMockFn).toHaveBeenCalledWith(news);
  });

  test('should create news with gived data', async () => {
    jest.spyOn(News, 'create').mockResolvedValue(card);
    jest.spyOn(jwt, 'verify').mockResolvedValue({ id: 1 });

    const mockedRequest = {
      body: card,
      headers: {
        authorization: 'JWT',
      },
      files: {
        picture: undefined,
      },
    };
    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ send: sendMockFn }),
    };

    await newsController.createNews(mockedRequest, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(201);
    expect(sendMockFn).toHaveBeenCalledWith(card);
  });
});
