const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authController = require('../controllers/authController');
const { user } = require('../mocks');

const statusMockFn = jest.fn();
const sendMockFn = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('AuthController tests', () => {
  test('should return status 201 if user successfully registered', async () => {
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

  test('should return status 400 and error message if user is already exists', async () => {
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
