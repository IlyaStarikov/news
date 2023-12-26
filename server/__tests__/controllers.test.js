const jwt = require('jsonwebtoken');
const { News, User } = require('../models');
const newsController = require('../controllers/newsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { news, card, user } = require('../mocks');

const statusMockFn = jest.fn();
const sendMockFn = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('Controllers tests suits ', () => {
  test('News controller should return news and status 200', async () => {
    jest.spyOn(News, 'findAll').mockResolvedValue(news);

    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ send: sendMockFn }),
    };

    await newsController.getAllNews({}, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(200);
    expect(sendMockFn).toHaveBeenCalledWith(news);
  });

  test('News controller should create news with gived data', async () => {
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

  test('User controller should return user', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(user);

    const mockedRequest = { params: { id: 1 } };
    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ send: sendMockFn }),
    };

    await userController.getOneUser(mockedRequest, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(200);
    expect(sendMockFn).toHaveBeenCalledWith(user);
  });

  test('User controller should return status 500 if user not found', async () => {
    jest.spyOn(User, 'findOne').mockRejectedValue('User not found');

    const mockedRequest = { params: { id: 1 } };
    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ send: sendMockFn }),
    };

    await userController.getOneUser(mockedRequest, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(500);
    expect(sendMockFn).toHaveBeenCalledWith('User not found');
  });

  test('authController should return status 201 if user successfully registered', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(User, 'create').mockResolvedValue(user);
    jest.spyOn(jwt, 'sign').mockReturnValue('bearer token');

    const mockedRequest = {
      body: {
        email: 'email@test.com',
        password: '1234',
        login: 'User',
        name: 'User name',
      },
    };
    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ json: sendMockFn }),
    };

    await authController.registration(mockedRequest, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(201);
    expect(sendMockFn.mock.calls[0][0].token).toBe('bearer token');
  });

  test('authController should return status 400 and error message if user is already exists', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(user);

    const mockedRequest = {
      body: {
        email: 'email@test.com',
        password: '1234',
        login: 'User',
        name: 'User name',
      },
    };
    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ json: sendMockFn }),
    };

    await authController.registration(mockedRequest, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(400);
    expect(sendMockFn.mock.calls[0][0].message).toBe('User is already exists');
  });
});
